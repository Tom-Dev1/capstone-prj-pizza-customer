"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { Loader2 } from "lucide-react"
import { customerService } from "@/services/customer-service"

/**
 * Component kiểm tra trạng thái xác thực của người dùng sau khi đăng nhập
 * Nếu người dùng đã xác thực (isVerifiedEmail = true) -> chuyển đến trang dashboard
 * Nếu chưa xác thực (isVerifiedEmail = false) -> chuyển đến trang xác thực
 */
export default function AuthVerificationCheck({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user, isLoading: isLoadingAuth } = useAuth()
    const [isVerified, setIsVerified] = useState<boolean | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const location = useLocation()

    useEffect(() => {
        const checkVerification = async () => {
            if (isLoadingAuth || !isAuthenticated || !user?.CustomerId) {
                setIsLoading(false)
                return
            }

            try {
                console.log("Checking verification for CustomerId:", user.CustomerId)

                // Lấy thông tin profile của customer từ API
                const response = await customerService.getCustomerId(user.CustomerId)

                if (response.success && response.result) {
                    console.log("Customer profile:", response.result)

                    // Lưu trạng thái xác thực email
                    setIsVerified(response.result.isVerifiedEmail)
                } else {
                    console.error("Failed to fetch customer profile:", response.message)
                    setError(response.message || "Failed to verify account status")
                    setIsVerified(false)
                }
            } catch (err) {
                console.error("Error checking verification:", err)
                setError("An error occurred while checking your account status")
                setIsVerified(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkVerification()
    }, [isAuthenticated, isLoadingAuth, user])

    // Nếu đang kiểm tra, hiển thị loading
    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-lg">Đang kiểm tra thông tin tài khoản...</p>
            </div>
        )
    }

    // Nếu có lỗi, hiển thị thông báo lỗi
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-md">
                    <h3 className="text-lg font-semibold mb-2">Lỗi xác thực</h3>
                    <p>{error}</p>
                    <button
                        onClick={() => (window.location.href = "/auth/login")}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                        Quay lại đăng nhập
                    </button>
                </div>
            </div>
        )
    }

    // Nếu chưa đăng nhập, chuyển đến trang đăng nhập
    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />
    }

    // Nếu đã kiểm tra xong và chưa xác thực email, chuyển đến trang xác thực
    if (isVerified === false) {
        return <Navigate to="/auth/verify" state={{ from: location }} replace />
    }

    // Nếu đã xác thực email, hiển thị nội dung
    return <>{children}</>
}

