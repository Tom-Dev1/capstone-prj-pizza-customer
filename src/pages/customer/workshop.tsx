"use client"

import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { workshopService } from "@/services/workshop-service"
import { Loader2, Calendar, MapPin, Users, Clock, DollarSign, Pizza, Search, Filter, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { customerService } from "@/services/customer-service"
import {
    WorkshopRegisterStatus,
    type CustomerWorkshop,
    type WorkshopPizzaRegister,
    type WorkshopPizzaRegisterDetail,
} from "@/types/customer-workshop.types"
import { useNavigate } from "react-router-dom"

// Status color mapping
const statusColorMap: Record<string, string> = {
    [WorkshopRegisterStatus.Registered]: "bg-yellow-500",
    [WorkshopRegisterStatus.Attended]: "bg-green-500",
    [WorkshopRegisterStatus.Cancel]: "bg-red-500",
}

// Status display names
const statusDisplayNames: Record<string, string> = {
    [WorkshopRegisterStatus.Registered]: "Đã đăng ký",
    [WorkshopRegisterStatus.Attended]: "Đã tham dự",
    [WorkshopRegisterStatus.Cancel]: "Đã hủy",
}

export default function CustomerWorkshops() {
    const { user } = useAuth()
    const [workshops, setWorkshops] = useState<CustomerWorkshop[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [phoneNumber, setPhoneNumber] = useState<string>("")
    const navigation = useNavigate()
    // Fetch customer profile to get phone number
    useEffect(() => {
        const fetchCustomerProfile = async () => {
            if (!user?.CustomerId) return

            try {
                const response = await customerService.getCustomerId(user.CustomerId)
                if (response.success && response.result) {
                    setPhoneNumber(response.result.phone)
                }
            } catch (err) {
                console.error("Lỗi khi tải thông tin khách hàng:", err)
            }
        }

        fetchCustomerProfile()
    }, [user?.CustomerId])

    // Fetch workshops when phone number is available
    useEffect(() => {
        const fetchWorkshops = async () => {
            if (!phoneNumber) return

            setIsLoading(true)
            setError(null)

            try {
                const response = await workshopService.getWorkshopByPhoneCustomer(phoneNumber)
                if (response.success && response.result) {
                    setWorkshops(response.result.items || [])
                } else {
                    setError(response.message || "Không thể tải danh sách khóa học đã đăng ký")
                }
            } catch (err) {
                console.error("Lỗi khi tải danh sách khóa học:", err)
                setError("Đã xảy ra lỗi khi tải danh sách khóa học")
            } finally {
                setIsLoading(false)
            }
        }

        if (phoneNumber) {
            fetchWorkshops()
        }
    }, [phoneNumber])

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

    // Filter workshops based on search term and status
    const filteredWorkshops = workshops.filter((workshop) => {
        const matchesSearch =
            searchTerm === "" ||
            workshop.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            workshop.code.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "all" || workshop.workshopRegisterStatus === statusFilter

        return matchesSearch && matchesStatus
    })

    // Group workshops by status
    const registeredWorkshops = workshops.filter((w) => w.workshopRegisterStatus === WorkshopRegisterStatus.Registered)
    const attendedWorkshops = workshops.filter((w) => w.workshopRegisterStatus === WorkshopRegisterStatus.Attended)
    const cancelledWorkshops = workshops.filter((w) => w.workshopRegisterStatus === WorkshopRegisterStatus.Cancel)

    const handleClick = (() => {
        navigation('/workshop')
    })

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold mb-2">Khóa Học Đã Đăng Ký</h1>
                    <p className="text-gray-600">Quản lý và theo dõi các khóa học làm bánh pizza bạn đã đăng ký</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <Button onClick={() => handleClick()} variant="outline" className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        Đăng ký khóa học mới
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                    <span className="text-lg">Đang tải danh sách khóa học...</span>
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start">
                    <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Không thể tải danh sách khóa học</p>
                        <p>{error}</p>
                    </div>
                </div>
            ) : workshops.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-200">
                    <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Bạn chưa đăng ký khóa học nào</h3>
                    <p className="text-gray-600 max-w-md mx-auto mb-6">
                        Khám phá các khóa học làm bánh pizza của chúng tôi và đăng ký ngay để học cách làm những chiếc bánh pizza
                        thơm ngon.
                    </p>
                    <Button>Khám Phá Khóa Học</Button>
                </div>
            ) : (
                <>
                    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                    placeholder="Tìm kiếm theo tên hoặc mã đăng ký..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="text-gray-400 h-4 w-4" />
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Lọc theo trạng thái" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Tất cả trạng thái</SelectItem>
                                        <SelectItem value={WorkshopRegisterStatus.Registered}>Đã đăng ký</SelectItem>
                                        <SelectItem value={WorkshopRegisterStatus.Attended}>Đã tham dự</SelectItem>
                                        <SelectItem value={WorkshopRegisterStatus.Cancel}>Đã hủy</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-500">Tổng số khóa học</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{workshops.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-500">Đã đăng ký</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-600">{registeredWorkshops.length}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-500">Đã tham dự</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-600">{attendedWorkshops.length}</div>
                            </CardContent>
                        </Card>
                        <Card className="">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm text-gray-500">Đã hủy</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-red-600">{cancelledWorkshops.length}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="grid w-full grid-cols-4 mb-6">
                            <TabsTrigger value="all">Tất cả ({workshops.length})</TabsTrigger>
                            <TabsTrigger value="registered">Đã đăng ký ({registeredWorkshops.length})</TabsTrigger>
                            <TabsTrigger value="attended">Đã tham dự ({attendedWorkshops.length})</TabsTrigger>
                            <TabsTrigger value="cancelled">Đã hủy ({cancelledWorkshops.length})</TabsTrigger>
                        </TabsList>

                        <TabsContent value="all">
                            <WorkshopList workshops={filteredWorkshops} formatDate={formatDate} />
                        </TabsContent>

                        <TabsContent value="registered">
                            <WorkshopList
                                workshops={registeredWorkshops.filter((w) => {
                                    return (
                                        searchTerm === "" ||
                                        w.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        w.code.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                })}
                                formatDate={formatDate}
                            />
                        </TabsContent>

                        <TabsContent value="attended">
                            <WorkshopList
                                workshops={attendedWorkshops.filter((w) => {
                                    return (
                                        searchTerm === "" ||
                                        w.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        w.code.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                })}
                                formatDate={formatDate}
                            />
                        </TabsContent>

                        <TabsContent value="cancelled">
                            <WorkshopList
                                workshops={cancelledWorkshops.filter((w) => {
                                    return (
                                        searchTerm === "" ||
                                        w.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                        w.code.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                })}
                                formatDate={formatDate}
                            />
                        </TabsContent>
                    </Tabs>
                </>
            )}
        </div>
    )
}

// Workshop List Component
interface WorkshopListProps {
    workshops: CustomerWorkshop[]
    formatDate: (date: string) => string
}

function WorkshopList({ workshops, formatDate }: WorkshopListProps) {
    const [expandedWorkshops, setExpandedWorkshops] = useState<Set<string>>(new Set())

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedWorkshops)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedWorkshops(newExpanded)
    }

    if (workshops.length === 0) {
        return (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Không có khóa học nào trong danh mục này</p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {workshops.map((workshop) => (
                <Card key={workshop.id} className="overflow-hidden">
                    <div className="border-l-4 border-primary">
                        <CardContent className="p-0">
                            <div className="p-4 bg-primary/5">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <h3 className="font-medium text-lg">{workshop.customerName}</h3>
                                            <Badge
                                                className={`ml-2 ${statusColorMap[workshop.workshopRegisterStatus] || "bg-gray-500"
                                                    } text-white`}
                                            >
                                                {statusDisplayNames[workshop.workshopRegisterStatus] || workshop.workshopRegisterStatus}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">
                                            Mã đăng ký: <span className="font-mono">{workshop.code}</span>
                                        </p>
                                    </div>
                                    <div className="mt-2 md:mt-0">
                                        <Button variant="outline" size="sm" onClick={() => toggleExpand(workshop.id)} className="text-xs">
                                            {expandedWorkshops.has(workshop.id) ? "Thu gọn" : "Xem chi tiết"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                    <div className="flex items-center">
                                        <Calendar className="h-4 w-4 text-primary mr-2" />
                                        <div>
                                            <p className="text-xs text-gray-500">Ngày đăng ký</p>
                                            <p className="text-sm">{formatDate(workshop.registeredAt)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Users className="h-4 w-4 text-primary mr-2" />
                                        <div>
                                            <p className="text-xs text-gray-500">Số người tham gia</p>
                                            <p className="text-sm">{workshop.totalParticipant} người</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <DollarSign className="h-4 w-4 text-primary mr-2" />
                                        <div>
                                            <p className="text-xs text-gray-500">Tổng phí</p>
                                            <p className="text-sm font-medium">{workshop.totalFee.toLocaleString()} VND</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {expandedWorkshops.has(workshop.id) && (
                                <div className="p-4 border-t">
                                    <h4 className="font-medium mb-3 flex items-center">
                                        <Clock className="h-4 w-4 mr-2 text-primary" />
                                        Chi tiết đăng ký
                                    </h4>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <p className="text-xs text-gray-500">Mã workshop</p>
                                            <p className="text-sm font-mono">{workshop.workshopId}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Thời gian đăng ký</p>
                                            <p className="text-sm">
                                                {new Date(workshop.registeredAt).toLocaleString("vi-VN", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {workshop.workshopPizzaRegisters && workshop.workshopPizzaRegisters.length > 0 ? (
                                        <div>
                                            <h5 className="text-sm font-medium flex items-center mb-2">
                                                <Pizza className="h-4 w-4 mr-1 text-primary" />
                                                Sản phẩm đã chọn
                                            </h5>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                {workshop.workshopPizzaRegisters.map((product: WorkshopPizzaRegister, index) => (
                                                    <div key={index} className="bg-gray-50 p-2 rounded border text-sm">
                                                        <div className="font-medium">{product.name || "Sản phẩm"}</div>
                                                        {product.workshopPizzaRegisterDetails &&
                                                            product.workshopPizzaRegisterDetails.length > 0 && (
                                                                <div className="mt-1 text-xs text-gray-600">
                                                                    <p>Tùy chọn:</p>
                                                                    <ul className="list-disc list-inside">
                                                                        {product.workshopPizzaRegisterDetails.map(
                                                                            (detail: WorkshopPizzaRegisterDetail, idx) => (
                                                                                <li key={idx}>{detail.name}</li>
                                                                            ),
                                                                        )}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-gray-500">Không có sản phẩm nào được chọn</div>
                                    )}

                                    <div className="mt-4 flex justify-end">
                                        {workshop.workshopRegisterStatus === WorkshopRegisterStatus.Registered && (
                                            <Button variant="destructive" size="sm" className="mr-2">
                                                Hủy đăng ký
                                            </Button>
                                        )}
                                        <Button variant="outline" size="sm">
                                            <MapPin className="h-4 w-4 mr-2" />
                                            Xem chi tiết workshop
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    )
}
