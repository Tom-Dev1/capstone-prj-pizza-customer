"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ShoppingBag, Heart, Calendar, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function CustomerDashboard() {
    const { user } = useAuth()

    const dashboardCards = [
        {
            title: "Đơn Hàng Của Tôi",
            description: "Xem và theo dõi các đơn đặt pizza của bạn",
            icon: ShoppingBag,
            link: "/customer/orders",
            color: "bg-blue-50 text-blue-600",
        },
        {
            title: "Pizza Yêu Thích",
            description: "Các loại pizza yêu thích đã lưu của bạn",
            icon: Heart,
            link: "/customer/favorites",
            color: "bg-red-50 text-red-600",
        },
        {
            title: "Đăng ký Workshop",
            description: "Quản lý các workshop pizza bạn đã đăng ký",
            icon: Calendar,
            link: "/customer/workshops",
            color: "bg-amber-50 text-amber-600",
        },
        {
            title: "Cài Đặt Tài Khoản",
            description: "Quản lý thông tin cá nhân và bảo mật",
            icon: Settings,
            link: "/customer/settings",
            color: "bg-purple-50 text-purple-600",
        },
    ]

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Xin chào, {user?.name || "Khách hàng"}!</h1>
                <p className="text-gray-600">
                    Chào mừng bạn đến với trang quản lý tài khoản. Từ đây, bạn có thể quản lý đơn hàng, xem pizza yêu thích và
                    đăng ký các workshop làm bánh pizza.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card) => (
                    <Card key={card.title} className="hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2 h-48">
                            <div className={`w-12 h-12 rounded-full ${card.color} flex items-center justify-center mb-2`}>
                                <card.icon className="h-6 w-6" />
                            </div>
                            <CardTitle className="text-lg">{card.title}</CardTitle>
                            <CardDescription>{card.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link to={card.link}>
                                <Button className="w-full">Xem Chi Tiết</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-10 bg-primary/5 rounded-lg p-6 border border-primary/20">
                <h2 className="text-xl font-semibold mb-4">Hoạt Động Gần Đây</h2>
                <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-lg font-medium">Không có hoạt động nào gần đây</p>
                    <p className="mt-1">Các hoạt động của bạn sẽ xuất hiện ở đây</p>
                </div>
            </div>
        </div>
    )
}
