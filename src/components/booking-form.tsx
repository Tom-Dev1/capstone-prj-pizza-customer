"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Phone, User, Check, Loader2, AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { type BookingFormData, reservationService } from "@/services/reservations-service"
import { authService } from "@/services/auth-service"

type FormErrors = {
    customerName?: string
    phoneNumber?: string
    phoneOtp?: string
    bookingTime?: string
    numberOfPeople?: string
}

// Enum for phone verification steps
enum PhoneVerificationStep {
    PHONE_INPUT = 0,
    OTP_VERIFICATION = 1,
    VERIFIED = 2,
}

export default function BookingForm() {
    const [formData, setFormData] = useState<BookingFormData>({
        customerName: "",
        phoneNumber: "",
        phoneOtp: "",
        bookingTime: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDThh:mm
        numberOfPeople: 2,
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

    // Phone verification states
    const [phoneVerificationStep, setPhoneVerificationStep] = useState<PhoneVerificationStep>(
        PhoneVerificationStep.PHONE_INPUT,
    )
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [otpError, setOtpError] = useState<string | null>(null)

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        if (!formData.customerName.trim()) {
            newErrors.customerName = "Vui lòng nhập tên của bạn"
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Vui lòng nhập số điện thoại"
        } else if (!/^[0-9]{10,11}$/.test(formData.phoneNumber.trim())) {
            newErrors.phoneNumber = "Số điện thoại không hợp lệ"
        }

        // Kiểm tra OTP nếu chưa xác thực
        if (phoneVerificationStep !== PhoneVerificationStep.VERIFIED) {
            newErrors.phoneNumber = "Vui lòng xác thực số điện thoại"
        }

        if (!formData.bookingTime) {
            newErrors.bookingTime = "Vui lòng chọn thời gian đặt bàn"
        } else {
            const selectedTime = new Date(formData.bookingTime)
            const now = new Date()
            if (selectedTime < now) {
                newErrors.bookingTime = "Thời gian đặt bàn phải là thời gian trong tương lai"
            }
        }

        if (formData.numberOfPeople < 1) {
            newErrors.numberOfPeople = "Số người phải ít nhất là 1"
        } else if (formData.numberOfPeople > 20) {
            newErrors.numberOfPeople = "Vui lòng liên hệ trực tiếp cho nhóm lớn hơn 20 người"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? Number.parseInt(value) || 0 : value,
        }))

        // Reset error for this field
        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }))
        }
    }

    // Handle phone number input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits
        const value = e.target.value.replace(/\D/g, "")
        setFormData((prev) => ({
            ...prev,
            phoneNumber: value,
        }))

        // Reset phone verification if phone number changes
        if (phoneVerificationStep === PhoneVerificationStep.VERIFIED) {
            setPhoneVerificationStep(PhoneVerificationStep.PHONE_INPUT)
        }

        // Reset error
        if (errors.phoneNumber) {
            setErrors((prev) => ({
                ...prev,
                phoneNumber: undefined,
            }))
        }
        setOtpError(null)
    }

    // Handle OTP input
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits
        const value = e.target.value.replace(/\D/g, "")
        setFormData((prev) => ({
            ...prev,
            phoneOtp: value,
        }))
        setOtpError(null)
    }

    // Send OTP to phone number
    const handleSendOtp = async () => {
        if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
            setErrors((prev) => ({
                ...prev,
                phoneNumber: "Vui lòng nhập số điện thoại hợp lệ",
            }))
            return
        }

        setIsSendingOtp(true)
        setOtpError(null)

        try {
            // Sử dụng hàm sendOtp từ authService
            const response = await authService.sendOtp(formData.phoneNumber)

            if (response.success) {
                // Move to OTP verification step
                setPhoneVerificationStep(PhoneVerificationStep.OTP_VERIFICATION)
            } else {
                setOtpError(response.message || "Không thể gửi mã OTP. Vui lòng thử lại.")
            }
        } catch (err) {
            console.error("Lỗi khi gửi OTP:", err)
            setOtpError("Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại.")
        } finally {
            setIsSendingOtp(false)
        }
    }

    // Verify OTP
    const handleVerifyOtp = async () => {
        if (!formData.phoneOtp || formData.phoneOtp.length < 4) {
            setOtpError("Vui lòng nhập mã OTP hợp lệ")
            return
        }

        setIsVerifyingOtp(true)
        setOtpError(null)

        try {
            // Sử dụng hàm verifyOtp từ authService
            const response = await authService.verifyOtp(formData.phoneNumber, formData.phoneOtp)

            if (response.success) {
                // Store verified phone and OTP in localStorage
                localStorage.setItem("verified_phone", formData.phoneNumber)
                localStorage.setItem("verified_otp", formData.phoneOtp)

                // Update state
                setPhoneVerificationStep(PhoneVerificationStep.VERIFIED)

                // Clear any phone number errors
                if (errors.phoneNumber) {
                    setErrors((prev) => ({
                        ...prev,
                        phoneNumber: undefined,
                    }))
                }
            } else {
                setOtpError(response.message || "Mã OTP không hợp lệ. Vui lòng thử lại.")
            }
        } catch (err) {
            console.error("Lỗi khi xác thực OTP:", err)
            setOtpError("Đã xảy ra lỗi khi xác thực mã OTP. Vui lòng thử lại.")
        } finally {
            setIsVerifyingOtp(false)
        }
    }

    // Reset phone verification
    const handleResetPhoneVerification = () => {
        setPhoneVerificationStep(PhoneVerificationStep.PHONE_INPUT)
        setFormData((prev) => ({
            ...prev,
            phoneOtp: "",
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setApiError(null)

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)

        try {
            // Call the booking service to create a reservation
            const response = await reservationService.CreateBooking(formData)

            if (response.success) {
                console.log("Booking successful:", response.result)
                setIsSubmitted(true)
            } else {
                // Handle validation errors from API
                if (response.statusCode) {
                    const apiErrors: FormErrors = {}

                    Object.entries(response.message).forEach(([key, messages]) => {
                        if (key in formData && messages.length > 0) {
                            apiErrors[key as keyof FormErrors] = messages[0]
                        }
                    })

                    setErrors(apiErrors)
                } else {
                    // Set general error message
                    setApiError(response.message || "Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại sau.")
                }
            }
        } catch (error) {
            console.error("Error submitting booking:", error)
            setApiError("Có lỗi xảy ra khi đặt bàn. Vui lòng thử lại sau.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const resetForm = () => {
        setFormData({
            customerName: "",
            phoneNumber: "",
            phoneOtp: "",
            bookingTime: new Date().toISOString().slice(0, 16),
            numberOfPeople: 2,
        })
        setIsSubmitted(false)
        setErrors({})
        setApiError(null)
        setPhoneVerificationStep(PhoneVerificationStep.PHONE_INPUT)
    }

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto text-center w-full flex flex-col justify-center h-[615px]"
            >
                <div className=" w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="  w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Đặt Bàn Thành Công!</h2>
                <p className="text-gray-600 mb-6">
                    Cảm ơn bạn đã đặt bàn tại PizzaCapstone. Chúng tôi đã nhận được thông tin đặt bàn của bạn và sẽ liên hệ xác
                    nhận trong thời gian sớm nhất.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex items-center mb-2">
                        <User className="w-5 h-5 text-primary mr-2" />
                        <span className="font-medium">{formData.customerName}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <Phone className="w-5 h-5 text-primary mr-2" />
                        <span>{formData.phoneNumber}</span>
                    </div>
                    <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-primary mr-2" />
                        <span>
                            {new Date(formData.bookingTime).toLocaleDateString("vi-VN", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </span>
                    </div>
                    <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-primary mr-2" />
                        <span>
                            {new Date(formData.bookingTime).toLocaleTimeString("vi-VN", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>
                    </div>
                    <div className="flex items-center">
                        <Users className="w-5 h-5 text-primary mr-2" />
                        <span>{formData.numberOfPeople} người</span>
                    </div>
                </div>
                <Button onClick={resetForm} className="bg-primary hover:bg-primary/90 w-full">
                    Đặt Bàn Mới
                </Button>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6 md:p-8 max-w-md mx-auto w-full h-[615px]"
        >
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đặt Bàn</h2>

            {apiError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 text-sm">{apiError}</div>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
                <div className="space-y-2">
                    <Label htmlFor="customerName" className="text-gray-700">
                        Họ và tên <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <User className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleChange}
                            className={cn("pl-10", errors.customerName ? "border-red-500 focus-visible:ring-red-500" : "")}
                            placeholder="Nguyễn Văn A"
                        />
                    </div>
                    {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
                </div>

                <div className="">
                    <Label htmlFor="phoneNumber" className="text-gray-700">
                        Số điện thoại <span className="text-red-500">*</span>
                    </Label>
                    <div className="flex space-x-2">
                        <div className="relative flex-grow">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Phone className="w-5 h-5 text-gray-400" />
                            </div>
                            <Input
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handlePhoneChange}
                                className={cn(
                                    "pl-10",
                                    errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : "",
                                    phoneVerificationStep === PhoneVerificationStep.VERIFIED ? "bg-gray-50" : "",
                                )}
                                placeholder="0912345678"
                                readOnly={phoneVerificationStep === PhoneVerificationStep.VERIFIED}
                            />
                            {phoneVerificationStep === PhoneVerificationStep.VERIFIED && (
                                <div className="absolute inset-y-0 right-3 flex items-center">
                                    <Check className="w-4 h-4 text-green-500" />
                                </div>
                            )}
                        </div>

                        {phoneVerificationStep === PhoneVerificationStep.PHONE_INPUT && (
                            <Button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isSendingOtp || formData.phoneNumber.length < 10}
                                className="whitespace-nowrap h-9"

                            >
                                {isSendingOtp ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                        Đang gửi
                                    </>
                                ) : (
                                    "Gửi OTP"
                                )}
                            </Button>
                        )}

                        {phoneVerificationStep === PhoneVerificationStep.VERIFIED && (
                            <Button
                                type="button"
                                onClick={handleResetPhoneVerification}
                                variant="outline"
                                className="whitespace-nowrap h-9"

                            >
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Đổi SĐT
                            </Button>
                        )}
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}

                    {/* OTP Verification Section */}
                    {phoneVerificationStep === PhoneVerificationStep.OTP_VERIFICATION && (
                        <div className="mt-3 bg-blue-50 p-3 rounded-md border border-blue-100">
                            <div className="text-sm text-blue-700 font-medium mb-1">
                                Mã OTP đã được gửi đến  {formData.phoneNumber}
                            </div>

                            <div className="flex space-x-2">
                                <div className="relative flex-grow">
                                    <Input
                                        id="phoneOtp"
                                        name="phoneOtp"
                                        value={formData.phoneOtp}
                                        onChange={handleOtpChange}
                                        className="text-center"
                                        placeholder="Nhập mã OTP"
                                        maxLength={6}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleVerifyOtp}
                                    disabled={isVerifyingOtp || !formData.phoneOtp}
                                    className="whitespace-nowrap h-9 "

                                >
                                    {isVerifyingOtp ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                                            Đang xác thực
                                        </>
                                    ) : (
                                        "Xác thực"
                                    )}
                                </Button>
                            </div>

                            {otpError && (
                                <div className="flex items-center mt-2 text-red-600 text-xs">
                                    <AlertCircle className="w-3 h-3 mr-1" />
                                    {otpError}
                                </div>
                            )}

                            <div className="flex justify-between items-center mt-2">
                                <button
                                    type="button"
                                    onClick={handleResetPhoneVerification}
                                    className="text-blue-600 text-xs hover:underline"
                                >
                                    Đổi số điện thoại
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isSendingOtp}
                                    className="text-blue-600 text-xs hover:underline mr-3"
                                >
                                    {isSendingOtp ? "Đang gửi lại..." : "Gửi lại OTP"}
                                </button>
                            </div>
                        </div>
                    )}

                    {phoneVerificationStep === PhoneVerificationStep.VERIFIED && (
                        <div className="flex items-center mt-1 text-green-600 text-xs">
                            <Check className="w-3 h-3 mr-1" />
                            Số điện thoại đã được xác thực
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="bookingTime" className="text-gray-700">
                        Thời gian đặt bàn <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Calendar className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="bookingTime"
                            name="bookingTime"
                            type="datetime-local"
                            value={formData.bookingTime}
                            onChange={handleChange}
                            className={cn("pl-10", errors.bookingTime ? "border-red-500 focus-visible:ring-red-500" : "")}
                        />
                    </div>
                    {errors.bookingTime && <p className="text-red-500 text-sm mt-1">{errors.bookingTime}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="numberOfPeople" className="text-gray-700">
                        Số người <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Users className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="numberOfPeople"
                            name="numberOfPeople"
                            type="number"
                            min="1"
                            max="20"
                            value={formData.numberOfPeople}
                            onChange={handleChange}
                            className={cn("pl-10", errors.numberOfPeople ? "border-red-500 focus-visible:ring-red-500" : "")}
                        />
                    </div>
                    {errors.numberOfPeople && <p className="text-red-500 text-sm mt-1">{errors.numberOfPeople}</p>}
                </div>

                <div className="pt-2">
                    <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                        disabled={isSubmitting || phoneVerificationStep !== PhoneVerificationStep.VERIFIED}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                Đang xử lý...
                            </>
                        ) : (
                            "Xác Nhận Đặt Bàn"
                        )}
                    </Button>
                </div>
            </form>
        </motion.div>
    )
}

