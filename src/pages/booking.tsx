import BookingForm from "@/components/booking-form";

export default function Booking() {
    return (
        <div className="h-screen flex flex-col bg-gray-50">
            <div className="container mx-auto px-4 flex flex-col  py-10">
                <div className="max-w-4xl mx-auto w-full flex flex-col">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl md:text-4xl font-bold mb-3">Đặt Bàn Tại PizzaCapstone</h1>
                        <div className="w-20 h-1 bg-primary mx-auto mb-4"></div>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Đặt bàn trước để đảm bảo có chỗ ngồi tốt nhất và trải nghiệm dịch vụ đặc biệt. Chúng tôi sẽ liên hệ xác
                            nhận đặt bàn của bạn trong thời gian sớm nhất.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 items-start">
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden h-[615px]">
                            <div className="h-36 md:h-44 overflow-hidden">
                                <img
                                    src="/placeholder.svg?height=600&width=800"
                                    alt="Không gian nhà hàng"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6 flex flex-col mt-2">
                                <h2 className="text-lg font-semibold mb-2">Thông Tin Nhà Hàng</h2>
                                <div className="space-y-2 mb-2">
                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-1.5 rounded-full mr-2 flex-shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                                                <circle cx="12" cy="10" r="3"></circle>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-base">Địa Chỉ</h3>
                                            <p className="text-gray-600 text-sm">123 Đường Pizza, Quận 1, TP.HCM</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-1.5 rounded-full mr-2 flex-shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-base">Điện Thoại</h3>
                                            <p className="text-gray-600 text-sm">(028) 3456-7890</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-primary/10 p-1.5 rounded-full mr-2 flex-shrink-0">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="text-primary"
                                            >
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-base">Giờ Mở Cửa</h3>
                                            <p className="text-gray-600 text-sm">Thứ Hai - Chủ Nhật: 11:00 - 22:00</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-gray-200 mt-4">
                                    <h3 className="font-semibold text-sm mb-1">Lưu ý khi đặt bàn</h3>
                                    <ul className="list-disc pl-4 text-xs text-gray-600 space-y-0.5 italic">
                                        <li>Vui lòng đặt bàn trước ít nhất 2 giờ</li>
                                        <li>Đối với nhóm trên 10 người, vui lòng đặt trước 1 ngày</li>
                                        <li>Chúng tôi sẽ giữ bàn trong vòng 15 phút kể từ giờ đặt</li>
                                        <li>Vui lòng thông báo nếu có yêu cầu đặc biệt</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <BookingForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

