"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Phone, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { BookingFormData, reservationService } from "@/services/reservations-service"

type FormErrors = {
    customerName?: string
    phoneNumber?: string
    bookingTime?: string
    numberOfPeople?: string
}

export default function BookingForm() {
    const [formData, setFormData] = useState<BookingFormData>({
        customerName: "",
        phoneNumber: "",
        bookingTime: new Date().toISOString().slice(0, 16), // Format: YYYY-MM-DDThh:mm
        numberOfPeople: 2,
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)

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
            bookingTime: new Date().toISOString().slice(0, 16),
            numberOfPeople: 2,
        })
        setIsSubmitted(false)
        setErrors({})
        setApiError(null)
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

            <form onSubmit={handleSubmit} className="space-y-6">
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

                <div className="space-y-2">
                    <Label htmlFor="phoneNumber" className="text-gray-700">
                        Số điện thoại <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className={cn("pl-10", errors.phoneNumber ? "border-red-500 focus-visible:ring-red-500" : "")}
                            placeholder="0912345678"
                        />
                    </div>
                    {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
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
                        disabled={isSubmitting}
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

