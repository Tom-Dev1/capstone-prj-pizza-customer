"use client"

import { useState } from "react"
import { X, Calendar, Users, Clock, Wallet, Pizza, ChevronDown, ChevronUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { CustomerWorkshop, CustomerWorkshopResponse, Workshop } from "@/services/workshop-service"
import ApiResponse from "@/apis/apiUtils"

interface CustomerWorkshopListProps {
    workshops: ApiResponse<CustomerWorkshopResponse> | null
    isOpen: boolean
    onClose: () => void
    currentWorkshop?: Workshop // Workshop hiện tại đang đăng ký
    onConfirmRegistration?: () => void // Callback khi xác nhận đăng ký tiếp
}

export default function CustomerWorkshopList({
    workshops,
    isOpen,
    onClose,
    currentWorkshop,
    onConfirmRegistration,
}: CustomerWorkshopListProps) {
    const [expandedWorkshops, setExpandedWorkshops] = useState<Set<string>>(new Set())

    if (!isOpen) return null

    // Xử lý dữ liệu workshops để lấy ra danh sách các workshop
    const getWorkshopList = (): CustomerWorkshop[] => {
        if (!workshops || !workshops.success || !workshops.result) return []

        return workshops.result.items || []
    }

    const workshopList = getWorkshopList()

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedWorkshops)
        if (newExpanded.has(id)) {
            newExpanded.delete(id)
        } else {
            newExpanded.add(id)
        }
        setExpandedWorkshops(newExpanded)
    }

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

                    <h4 className="font-medium text-lg mb-3">Lịch sử đăng ký khóa học</h4>

                    {workshopList.length === 0 ? (
                        <div className="text-center py-8">
                            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                            <p className="text-lg font-medium text-gray-700">Bạn chưa đăng ký khóa học nào</p>
                            <p className="text-gray-500 mt-1">Hãy khám phá các khóa học của chúng tôi và đăng ký ngay!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 mb-2">
                                Bạn đã đăng ký <strong>{workshopList.length}</strong> khóa học. Dưới đây là thông tin chi tiết:
                            </p>

                            {workshopList.map((workshop) => (
                                <div key={workshop.id} className="border rounded-lg overflow-hidden">
                                    <div className="bg-primary/5 p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium text-lg">{workshop.customerName}</h4>

                                            </div>
                                            <Badge
                                                className={`${workshop.workshopRegisterStatus === "Confirmed"
                                                    ? "bg-green-500"
                                                    : workshop.workshopRegisterStatus === "Registered"
                                                        ? "bg-yellow-500"
                                                        : workshop.workshopRegisterStatus === "Cancelled"
                                                            ? "bg-red-500"
                                                            : "bg-gray-500"
                                                    } text-white`}
                                            >
                                                {workshop.workshopRegisterStatus === "Confirmed"
                                                    ? "Đã xác nhận"
                                                    : workshop.workshopRegisterStatus === "Registered"
                                                        ? "Đã đăng ký"
                                                        : workshop.workshopRegisterStatus === "Cancelled"
                                                            ? "Đã hủy"
                                                            : workshop.workshopRegisterStatus}
                                            </Badge>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2 mt-3">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 text-primary mr-2" />
                                                <span className="text-sm">{formatDate(workshop.registeredAt)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-4 w-4 text-primary mr-2" />
                                                <span className="text-sm">{workshop.totalParticipant} người tham gia</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 text-primary mr-2" />
                                                <span className="text-sm">Đăng ký: {formatDate(workshop.registeredAt)}</span>
                                            </div>

                                        </div>

                                        <div className="flex justify-between items-center mt-3 pt-2 border-t border-dashed border-primary/20">
                                            <div className="flex items-center">
                                                <Wallet className="h-4 w-4 text-primary mr-1" />
                                                <span className="font-medium">{workshop.totalFee.toLocaleString()} VND</span>
                                            </div>
                                            {workshop.workshopPizzaRegisters && workshop.workshopPizzaRegisters.length > 0 && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-xs flex items-center"
                                                    onClick={() => toggleExpand(workshop.id)}
                                                >
                                                    {expandedWorkshops.has(workshop.id) ? (
                                                        <>
                                                            <ChevronUp className="h-3 w-3 mr-1" />
                                                            Ẩn chi tiết
                                                        </>
                                                    ) : (
                                                        <>
                                                            <ChevronDown className="h-3 w-3 mr-1" />
                                                            Xem chi tiết
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {expandedWorkshops.has(workshop.id) &&
                                        workshop.workshopPizzaRegisters &&
                                        workshop.workshopPizzaRegisters.length > 0 && (
                                            <div className="p-4 bg-gray-50">
                                                <h5 className="text-sm font-medium flex items-center mb-2">
                                                    <Pizza className="h-4 w-4 mr-1" />
                                                    Sản phẩm đã chọn
                                                </h5>
                                                {workshop.workshopPizzaRegisters.length === 0 ? (
                                                    <p className="text-sm text-gray-500">Không có sản phẩm nào được chọn</p>
                                                ) : (
                                                    <div className="space-y-2">
                                                        {workshop.workshopPizzaRegisters.map((product, index) => (
                                                            <div key={index} className="bg-white p-2 rounded border text-sm">
                                                                <div className="font-medium">{product.productName || "Sản phẩm"}</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-6 flex justify-end">
                        <Button onClick={onClose}>Đóng</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

