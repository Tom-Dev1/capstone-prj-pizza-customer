"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, MapPin, Users, Phone, Clock, Wallet, Pizza, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Workshop } from "@/types/workshop"
import ProductDetails from "./ProductDetail"
import { getWorkshopStatusVi } from "@/constants/workshop"

// Status color mapping
const statusColorMap: Record<string, string> = {
    Scheduled: "bg-blue-500",
    Opening: "bg-green-500",
    OpeningToRegister: " bg-green-500",
    Closed: "bg-gray-500",
    ClosedRegister: "bg-purple-500",
    Cancelled: "bg-red-500",
}

interface WorkshopProps {
    workshop: Workshop
    onRegister?: (workshop: Workshop) => void
    isAuthenticated?: boolean
    isUpcoming?: boolean
    daysRemaining?: number
    highlightStyle?: "amber" | "blue" | "none"
}

export default function WorkshopComponent({
    workshop,
    onRegister,

    isUpcoming = false,
    daysRemaining = 0,
    highlightStyle = "none",
}: WorkshopProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Format dates for display
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "PPP")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Ngày không hợp lệ:", dateString)
            return "Ngày không hợp lệ"
        }
    }

    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "PPP p")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Ngày không hợp lệ:", dateString)
            return "Ngày không hợp lệ"
        }
    }

    // Handle register button click
    const handleRegisterClick = () => {
        if (onRegister) {
            onRegister(workshop)
        }
    }

    // Xác định các class dựa trên highlightStyle
    const getCardClass = () => {
        const baseClass = "w-full overflow-hidden transition-all duration-300 hover:shadow-lg"

        switch (highlightStyle) {
            case "amber":
                return `${baseClass} border-amber-300 shadow-md`
            case "blue":
                return `${baseClass} border-blue-300 shadow-md`
            default:
                return baseClass
        }
    }

    const getHeaderClass = () => {
        switch (highlightStyle) {
            case "amber":
                return "bg-gradient-to-r from-amber-50 to-white"
            case "blue":
                return "bg-gradient-to-r from-blue-50 to-white"
            default:
                return ""
        }
    }

    const getButtonClass = () => {
        switch (highlightStyle) {
            case "amber":
                return "bg-amber-500 hover:bg-amber-600"
            case "blue":
                return "bg-blue-500 hover:bg-blue-600"
            default:
                return daysRemaining > 0 && daysRemaining <= 14
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-primary hover:bg-primary/90"
        }
    }

    return (
        <Card className={getCardClass()}>
            <CardHeader className={`pb-2 ${getHeaderClass()}`}>
                <div className="flex flex-col items-start p-7">
                    <CardTitle className="text-xl font-bold pr-24">{workshop.name}</CardTitle>
                    <div className="mt-2">{workshop.header}</div>
                </div>
                <div className="flex items-center space-x-2">
                    {daysRemaining > 0 && daysRemaining <= 14 && !isUpcoming && (
                        <Badge className="bg-blue-500 text-white whitespace-nowrap">
                            {daysRemaining <= 7 ? `Còn ${daysRemaining} ngày` : "Sắp diễn ra"}
                        </Badge>
                    )}
                    <Badge
                        className={`${statusColorMap[workshop.workshopStatus] || "bg-gray-500"} text-white p-2 px-3 whitespace-nowrap absolute right-5`}
                        style={{ top: "1.5rem" }}
                    >
                        {getWorkshopStatusVi(workshop.workshopStatus)}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-3 mx-4">
                <div className="mt-3">
                    {daysRemaining > 0 && daysRemaining <= 14 && !isUpcoming && (
                        <div className=" bg-blue-50 p-2 rounded-md flex items-center text-sm text-blue-800">
                            <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>
                                {daysRemaining <= 7
                                    ? `Khóa học sẽ diễn ra trong ${daysRemaining} ngày nữa!`
                                    : "Khóa học sẽ diễn ra trong vòng 2 tuần tới!"}
                            </span>
                        </div>
                    )}
                    {isUpcoming && (
                        <div className=" bg-amber-100 p-2 rounded-md flex items-center text-sm text-amber-800">
                            <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>
                                {daysRemaining === 0
                                    ? "Khóa học diễn ra hôm nay!"
                                    : `Khóa học sẽ diễn ra trong ${daysRemaining} ngày nữa!`}
                            </span>
                        </div>
                    )}
                </div>

                <div className="space-y-3 mt-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-start">
                            <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Ngày Diễn Ra</p>
                                <p className="text-sm text-gray-600">{formatDateTime(workshop.workshopDate)}</p>
                                <div></div>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Địa Điểm</p>
                                <p className="text-sm text-gray-600">{workshop.location}</p>
                                <p className="text-sm text-gray-600">Khu vực: {workshop.zoneName}</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Users className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Sức Chứa</p>
                                <p className="text-sm text-gray-600">
                                    Tối đa {workshop.maxParticipantPerRegister} người mỗi đăng ký (Tổng: {workshop.maxRegister})
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Wallet className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Phí Tham Gia</p>
                                <p className="text-sm text-gray-600">{workshop.totalFee.toLocaleString()} VND</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <Clock className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Thời Gian Đăng Ký</p>
                                <p className="text-sm text-gray-600">
                                    Từ {formatDate(workshop.startRegisterDate)} đến {formatDate(workshop.endRegisterDate)}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <Phone className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                                <p className="font-medium">Liên Hệ</p>
                                <p className="text-sm text-gray-600">
                                    {workshop.organizer} - {workshop.hotLineContact}
                                </p>
                            </div>
                        </div>
                    </div>

                    {isExpanded && (
                        <div className="mt-3 px-3">
                            <div>
                                <p className="font-medium mb-1">Mô Tả</p>
                                <p className="text-sm text-gray-600">{workshop.description}</p>
                            </div>

                            {workshop.workshopFoodDetails && workshop.workshopFoodDetails.length > 0 ? (
                                <div className="mt-3">
                                    <p className="font-medium mb-1 flex items-center">
                                        <Pizza className="h-4 w-4 mr-1" /> Các Món Ăn Có Sẵn ({workshop.workshopFoodDetails.length})
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-1 mt-2">
                                        {workshop.workshopFoodDetails.map((food) => (
                                            <li key={food.id}>
                                                <div className="mb-1 text-xs text-primary font-medium">{food.name}</div>
                                                <ProductDetails productId={food.productId} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="mt-3">
                                    <p className="font-medium mb-1 flex items-center">
                                        <Pizza className="h-4 w-4 mr-1" /> Các Món Ăn Có Sẵn
                                    </p>
                                    <p className="text-sm text-gray-500 italic">Không có thông tin về món ăn</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2 px-3 mx-4">
                <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Thu Gọn" : "Xem Thêm"}
                </Button>

                <Button className={getButtonClass()} onClick={handleRegisterClick}>
                    Đăng Ký Ngay
                </Button>
            </CardFooter>
        </Card>
    )
}
