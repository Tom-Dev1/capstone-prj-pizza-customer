"use client"

import { Outlet } from "react-router-dom"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Header from "@/components/header"
import pizza12 from "@/assets/Pizza600x600.png"
const AuthLayout = () => {
    const [isMobile, setIsMobile] = useState(false)

    // Kiểm tra nếu thiết bị là điện thoại di động
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Kiểm tra ban đầu
        checkIfMobile()

        // Thêm event listener cho việc thay đổi kích thước cửa sổ
        window.addEventListener("resize", checkIfMobile)

        // Dọn dẹp
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header cho điện thoại - Chỉ hiển thị trên điện thoại */}
            <Header />
            {isMobile && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-primary text-white text-center"
                >
                    <h1 className="text-2xl font-bold">PizzaCapstone</h1>
                </motion.div>
            )}

            <div className="flex flex-col md:flex-row flex-grow">
                {/* Bên trái - Thương hiệu Pizza - Ẩn trên điện thoại, hiển thị trên máy tính */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden md:flex bg-primary w-full md:w-1/2 p-8 flex-col justify-center items-center text-white"
                >
                    <div className="max-w-md mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">PizzaCapstone</h1>
                        <p className="text-xl mb-8">
                            Tham gia cộng đồng yêu thích pizza của chúng tôi và nhận quyền truy cập độc quyền vào các ưu đãi đặc biệt, các món mới trong thực đơn và đặt chỗ cho các khóa học.
                        </p>
                        <div className="relative w-64 h-64 mx-auto my-8">
                            <img
                                src={pizza12}
                                alt="Pizza Ngon"
                                className="rounded-full w-full h-full object-cover shadow-lg"
                            />
                            <div className="absolute -top-4 -right-4 bg-white text-primary rounded-full p-4 shadow-lg">
                                <div className="text-center w-10 h-10">
                                    <span className="block text-xl font-bold">20%</span>
                                    <span className="text-xs">GIẢM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bên phải - Biểu mẫu xác thực */}
                <div className="w-full md:w-1/2  bg-white p-4 md:p-8 flex items-center justify-center">
                    <div className="w-full max-w-md">
                        {/* Thương hiệu trên điện thoại - Chỉ hiển thị trên điện thoại */}
                        {isMobile && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-8 mt-5 text-center"
                            >
                                <div className="relative w-32 h-32 mx-auto mb-4">
                                    <img
                                        src="https://placehold.co/400x400"
                                        alt="Pizza Ngon"
                                        className="rounded-full w-full h-full object-cover shadow-md"
                                    />
                                    <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-2 shadow-md h-[56px] w-[56px]">
                                        <div className="text-center">
                                            <span className="block text-sm font-bold">20%</span>
                                            <span className="text-xs">GIẢM</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-600 mb-4">
                                    Tham gia cộng đồng yêu thích pizza của chúng tôi để nhận các ưu đãi độc quyền và nhiều hơn nữa!
                                </p>
                            </motion.div>
                        )}

                        {/* Nội dung biểu mẫu xác thực */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-lg shadow-sm p-6 border border-gray-100"
                        >
                            <Outlet />
                        </motion.div>

                        {/* Chân trang - Cả điện thoại và máy tính */}
                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>© {new Date().getFullYear()} PizzaCapstone. Đã đăng ký bản quyền.</p>
                            <div className="mt-2 space-x-4">
                                <a href="#" className="text-primary hover:underline">
                                    Điều khoản
                                </a>
                                <a href="#" className="text-primary hover:underline">
                                    Quyền riêng tư
                                </a>
                                <a href="#" className="text-primary hover:underline">
                                    Trợ giúp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
