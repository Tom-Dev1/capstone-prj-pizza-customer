

import { useState, useEffect } from "react"
import { Calendar, Loader2, Clock, AlertCircle, Flame } from "lucide-react"

import { useAuth } from "../contexts/AuthContext"
import { workshopService, type Workshop, WorkshopStatus } from "../services/workshop-service"
import WorkshopComponent from "./components/WorkshopComponent"
import WorkshopRegistrationForm from "./components/WorkshopRegistrationForm"
import { ToastContainer } from "react-toastify"

export default function PublicWorkshops() {
    const { isAuthenticated } = useAuth()
    const [workshops, setWorkshops] = useState<Workshop[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
    const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false)
    const [upcomingWorkshops, setUpcomingWorkshops] = useState<Workshop[]>([])
    const [regularWorkshops, setRegularWorkshops] = useState<Workshop[]>([])

    // Fetch workshops on component mount
    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                setIsLoading(true)
                const response = await workshopService.getAllWorkshops()
                if (response.success && response.result) {
                    // Store the total count
                    setTotalCount(response.result.totalCount)

                    // Check if items exists and is an array
                    if (Array.isArray(response.result.items)) {
                        // Only show workshops with "Scheduled" status or "Opening" status
                        const scheduledWorkshops = response.result.items.filter(
                            (workshop) =>
                                workshop.workshopStatus === WorkshopStatus.Scheduled ||
                                workshop.workshopStatus === WorkshopStatus.Opening,
                        )

                        // Xác định các workshop sắp diễn ra (trong vòng 7 ngày tới)
                        const now = new Date()
                        const oneWeekFromNow = new Date()
                        oneWeekFromNow.setDate(now.getDate() + 7)

                        // Sắp xếp workshop theo thời gian diễn ra từ gần nhất đến xa nhất
                        const sortedWorkshops = scheduledWorkshops.sort((a, b) => {
                            return new Date(a.workshopDate).getTime() - new Date(b.workshopDate).getTime()
                        })

                        // Phân loại workshops thành "sắp diễn ra" và "thông thường"
                        const upcoming = sortedWorkshops
                            .filter((workshop) => {
                                const workshopDate = new Date(workshop.workshopDate)
                                return workshopDate >= now && workshopDate <= oneWeekFromNow
                            })
                            .slice(0, 3) // Chỉ lấy tối đa 3 workshop sắp diễn ra

                        // Lấy tất cả các workshop còn lại (không nằm trong danh sách upcoming)
                        const upcomingIds = new Set(upcoming.map((w) => w.id))
                        const regular = sortedWorkshops.filter((workshop) => !upcomingIds.has(workshop.id))

                        setUpcomingWorkshops(upcoming)
                        setRegularWorkshops(regular)
                        setWorkshops(sortedWorkshops)
                    } else {
                        // If items is not an array, set empty array and log error
                        console.error("Định dạng phản hồi không mong đợi:", response.result)
                        setWorkshops([])
                        setError("Nhận được định dạng dữ liệu không hợp lệ từ máy chủ")
                    }
                } else {
                    setError(response.message || "Không thể tải danh sách hội thảo")
                }
            } catch (err) {
                setError("Đã xảy ra lỗi khi tải danh sách hội thảo")
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchWorkshops()
    }, [])

    // Handle workshop registration - Removed authentication check
    const handleRegisterClick = (workshop: Workshop) => {
        // Open registration form directly without auth check
        setSelectedWorkshop(workshop)
        setIsRegistrationFormOpen(true)
    }

    // Tính số ngày còn lại đến workshop
    const getDaysRemaining = (dateString: string): number => {
        const workshopDate = new Date(dateString)
        const now = new Date()

        // Reset time part for accurate day calculation
        workshopDate.setHours(0, 0, 0, 0)
        now.setHours(0, 0, 0, 0)

        const diffTime = workshopDate.getTime() - now.getTime()
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays
    }

    return (
        <>
            <div className="container mx-auto px-4 py-12">
                <ToastContainer />
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Các Khóa Học Làm Bánh Pizza Sắp Tới</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Khám phá các khóa học làm bánh pizza đã lên lịch và lên kế hoạch cho cuộc phiêu lưu ẩm thực của bạn. Học các
                        kỹ thuật chính thống từ các đầu bếp hàng đầu của chúng tôi trong một môi trường vui vẻ và tương tác.
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Đang tải khóa học...</span>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        <p className="font-bold">Lỗi</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && workshops.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Không có khóa học nào được lên lịch</h3>
                        <p className="text-gray-500 mb-6">
                            Chúng tôi hiện không có khóa học nào được lên lịch. Vui lòng quay lại sau để xem các sự kiện sắp tới.
                        </p>
                    </div>
                )}

                {/* Workshops List */}
                {!isLoading && !error && workshops.length > 0 && (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Hiển thị {workshops.length} khóa học đã lên lịch (Tổng số khóa học: {totalCount})
                            </p>
                            <p className="text-sm text-gray-500">
                                {upcomingWorkshops.length} khóa học sắp diễn ra • {regularWorkshops.length} khóa học khác
                            </p>
                        </div>

                        {/* Upcoming Workshops Section */}
                        {upcomingWorkshops.length > 0 && (
                            <div className="mb-12">
                                <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-t-lg flex items-center">
                                    <Flame className="h-6 w-6 mr-2 animate-pulse" />
                                    <h2 className="text-xl font-bold">Khóa Học Sắp Diễn Ra</h2>
                                    <span className="ml-2 bg-white text-orange-600 text-xs font-bold px-2 py-1 rounded-full">
                                        {upcomingWorkshops.length} khóa học
                                    </span>
                                </div>

                                <div className="bg-gradient-to-b from-amber-50 to-white p-6 rounded-b-lg border border-amber-200 border-t-0 shadow-md">
                                    <div className="mb-4 flex items-start">
                                        <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-2 flex-shrink-0" />
                                        <p className="text-amber-800">
                                            Các khóa học dưới đây sẽ diễn ra trong vòng 7 ngày tới. Đăng ký ngay để đảm bảo có chỗ!
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        {upcomingWorkshops.map((workshop) => (
                                            <div key={workshop.id} className="relative">
                                                <div className="absolute -left-2 top-4 bg-amber-500 text-white text-xs font-bold px-2 py-2 rounded-r-full shadow-md flex items-center z-10">
                                                    <Clock className="h-3 w-3 mr-1" />
                                                    {getDaysRemaining(workshop.workshopDate) === 0
                                                        ? "Hôm nay!"
                                                        : `Còn ${getDaysRemaining(workshop.workshopDate)} ngày`}
                                                </div>
                                                <WorkshopComponent
                                                    workshop={workshop}
                                                    onRegister={handleRegisterClick}
                                                    isAuthenticated={isAuthenticated}
                                                    isUpcoming={true}
                                                    daysRemaining={getDaysRemaining(workshop.workshopDate)}
                                                    highlightStyle="amber"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Regular Workshops Section */}
                        {regularWorkshops.length > 0 && (
                            <div className="mt-10">
                                <h2 className="text-xl font-bold mb-4 flex items-center">
                                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                                    Các Khóa Học Khác ({regularWorkshops.length})
                                </h2>
                                <div className="space-y-6">
                                    {regularWorkshops.map((workshop) => (
                                        <WorkshopComponent
                                            key={workshop.id}
                                            workshop={workshop}
                                            onRegister={handleRegisterClick}
                                            isAuthenticated={isAuthenticated}
                                            daysRemaining={getDaysRemaining(workshop.workshopDate)}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Registration Form Dialog */}
            {selectedWorkshop && (
                <WorkshopRegistrationForm
                    workshop={selectedWorkshop}
                    isOpen={isRegistrationFormOpen}
                    onClose={() => {
                        setIsRegistrationFormOpen(false)
                        setSelectedWorkshop(null)
                    }}
                />
            )}
        </>
    )
}

