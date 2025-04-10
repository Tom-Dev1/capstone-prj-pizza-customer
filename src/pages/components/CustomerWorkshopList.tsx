import { X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Workshop } from "@/services/workshop-service"

interface CustomerWorkshopListProps {
    isOpen: boolean
    onClose: () => void
    currentWorkshop?: Workshop // Workshop hiện tại đang đăng ký
    onConfirmRegistration?: () => void // Callback khi xác nhận đăng ký tiếp
}

export default function CustomerWorkshopList({

    isOpen,
    onClose,
    currentWorkshop,
    onConfirmRegistration,
}: CustomerWorkshopListProps) {

    if (!isOpen) return null

    // Format date for display
    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString("vi-VN", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        } catch (error) {
            console.log(error);

            console.error("Ngày không hợp lệ:", dateString)
            return "Ngày không hợp lệ"
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold">Thông Tin Đăng Ký Khóa Học</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="p-4">
                    {/* Phần xác nhận đăng ký tiếp */}
                    {currentWorkshop && (
                        <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-start">
                                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-blue-800">Xác nhận đăng ký khóa học</h4>
                                    <p className="text-sm text-blue-700 mt-1">
                                        Bạn đã xem lại các khóa học đã đăng ký trước đó. Bạn có muốn tiếp tục đăng ký khóa học{" "}
                                        <strong>{currentWorkshop.name}</strong> vào ngày{" "}
                                        <strong>{formatDate(currentWorkshop.workshopDate)}</strong> không?
                                    </p>

                                    <div className="mt-4 flex gap-3">
                                        <Button onClick={onConfirmRegistration} className="bg-blue-600 hover:bg-blue-700 text-white">
                                            Xác nhận đăng ký
                                        </Button>
                                        <Button variant="outline" onClick={onClose}>
                                            Để sau
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

