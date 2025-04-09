"use client"

import { useState, useTransition } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { authService, type LoginRequest, type ApiErrorResponse } from "@/services"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<ApiErrorResponse | null>(null)
    const [isPending, startTransition] = useTransition()

    const navigate = useNavigate()
    const location = useLocation()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginRequest>()

    const onSubmit = async (data: LoginRequest) => {
        setIsLoading(true)
        setErrorMessage(null)

        try {
            // Use the auth service to login
            const response = await authService.login(data)

            if (!response.success) {
                throw setErrorMessage(response.result.axiosError as ApiErrorResponse)
            }

            const { token, expiration } = response.result

            login({ token, expiration })

            const from = location.state?.from?.pathname || "/customer/dashboard"
            console.log("Redirecting to:", from)

            // Sử dụng startTransition cho navigation
            startTransition(() => {
                navigate(from, { replace: true })
            })
        } catch (error) {
            console.error("Login failed:", error)
            throw error
            // Check if the error matches the ApiErrorResponse structure
        } finally {
            setIsLoading(false)
        }
    }

    const handleRegisterClick = () => {
        // Sử dụng startTransition cho navigation
        startTransition(() => {
            navigate("/auth/register")
        })
    }

    const handleForgotPasswordClick = () => {
        // Sử dụng startTransition cho navigation
        startTransition(() => {
            navigate("/auth/forgot-password")
        })
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Chào Mừng Trở Lại</h2>
                <p className="text-gray-600 mt-2">Nhập thông tin đăng nhập của bạn</p>
            </div>

            {/* Display the error according to the ApiErrorResponse structure */}
            {errorMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6"
                >
                    <p>{errorMessage.error.message}</p>
                </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <Label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                        Tên đăng nhập*
                    </Label>
                    <input
                        id="userName"
                        type="text"
                        placeholder="Nhập tên đăng nhập của bạn"
                        {...register("userName", { required: "Tên đăng nhập là bắt buộc" })}
                        className="w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0  border-gray-300 focus:border-green-300 focus:ring-green-200"
                    />
                    {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>}
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu*
                        </Label>
                        <button type="button" onClick={handleForgotPasswordClick} className="text-sm text-primary hover:underline">
                            Quên mật khẩu?
                        </button>
                    </div>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password", {
                                required: "Mật khẩu là bắt buộc",
                            })}
                            className="w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0  border-gray-300 focus:border-green-300 focus:ring-green-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                </div>

                <Button
                    type="submit"
                    disabled={isLoading || isPending}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 mt-6"
                >
                    {isLoading || isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Chưa có tài khoản?{" "}
                        <button
                            type="button"
                            onClick={handleRegisterClick}
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Đăng ký
                        </button>
                    </p>
                </div>
            </form>
        </div>
    )
}
