"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
    X,
    Loader2,
    AlertCircle,
    Check,
    Phone,
    ArrowRight,
    Users,
    Calendar,
    DollarSign,
    Pizza,
    RefreshCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { Workshop, WorkshopRegistration, ProductSelection } from "@/types/workshop"
import type { Product, Option } from "@/types/product"
import { authService } from "@/services/auth-service"
import CustomerWorkshopList from "./CustomerWorkshopList"
import { productService, workshopService } from "@/services"

interface WorkshopRegistrationFormProps {
    workshop: Workshop
    isOpen: boolean
    onClose: () => void
}

// Enum for form steps
enum FormStep {
    PHONE_INPUT = 0,
    OTP_VERIFICATION = 1,
    REGISTRATION_FORM = 2,
}

export default function WorkshopRegistrationForm({ workshop, isOpen, onClose }: WorkshopRegistrationFormProps) {
    // Form step state
    const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.PHONE_INPUT)

    // Phone verification states
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [, setIsPhoneVerified] = useState(false)
    const [isSendingOtp, setIsSendingOtp] = useState(false)
    const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
    const [otpError, setOtpError] = useState<string | null>(null)

    // Main form states
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [totalParticipants, setTotalParticipants] = useState(1)
    const [selectedProducts, setSelectedProducts] = useState<Map<string, Set<string>>>(new Map())
    const [productDetails, setProductDetails] = useState<Map<string, Product>>(new Map())
    const [guestInfo, setGuestInfo] = useState({
        name: "",
        email: "",
        phone: "",
    })

    // Customer workshop history states
    const [showWorkshopHistory, setShowWorkshopHistory] = useState(false)
    const [, setRegistrationConfirmed] = useState(false)
    const [registrationData, setRegistrationData] = useState<WorkshopRegistration | null>(null)

    // Add a new state to track selected childProducts
    const [selectedChildProducts, setSelectedChildProducts] = useState<Map<string, string>>(new Map())


    // Reset form when workshop changes
    useEffect(() => {
        if (isOpen && workshop) {
            // Reset form state when a new workshop is selected
            setCurrentStep(FormStep.PHONE_INPUT)
            setPhoneNumber("")
            setOtp("")
            setOtpError(null)
            setError(null)
            setSuccess(null)
            setSelectedProducts(new Map())
            setSelectedChildProducts(new Map())
            setGuestInfo({
                name: "",
                email: "",
                phone: "",
            })
        }
    }, [workshop, isOpen])

    // Fetch product details for all workshop food options
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!workshop || !workshop.workshopFoodDetails.length || currentStep !== FormStep.REGISTRATION_FORM) return

            setIsLoading(true)
            setError(null)

            try {
                const productMap = new Map<string, Product>()

                // Fetch details for each product
                for (const food of workshop.workshopFoodDetails) {
                    try {
                        const response = await productService.getProductById(food.productId)
                        if (response.success && response.result) {
                            productMap.set(food.productId, response.result)
                        }
                    } catch (err) {
                        console.error(`Lỗi khi tải sản phẩm ${food.productId}:`, err)
                    }
                }
                setSelectedProducts(new Map<string, Set<string>>())
                setProductDetails(productMap)
            } catch (err) {
                console.error("Lỗi khi tải thông tin sản phẩm:", err)
                setError("Không thể tải thông tin sản phẩm")
            } finally {
                setIsLoading(false)
            }
        }

        if (isOpen && currentStep === FormStep.REGISTRATION_FORM) {
            fetchProductDetails()
        }
    }, [workshop, isOpen, currentStep])

    // Add this useEffect after the existing product fetching useEffect

    // Add this useEffect after the existing product fetching useEffect

    // Handle phone number input
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits
        const value = e.target.value.replace(/\D/g, "")
        setPhoneNumber(value)
        setOtpError(null)
    }

    // Handle OTP input
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Only allow digits
        const value = e.target.value.replace(/\D/g, "")
        setOtp(value)
        setOtpError(null)
    }

    // Send OTP to phone number
    const handleSendOtp = async () => {
        if (!phoneNumber || phoneNumber.length < 10) {
            setOtpError("Vui lòng nhập số điện thoại hợp lệ")
            return
        }

        setIsSendingOtp(true)
        setOtpError(null)

        try {
            // Call the API to send OTP
            const response = await authService.sendOtp(phoneNumber)

            if (response.success) {
                // Move to OTP verification step
                setCurrentStep(FormStep.OTP_VERIFICATION)
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
        if (!otp || otp.length < 4) {
            setOtpError("Vui lòng nhập mã OTP hợp lệ")
            return
        }

        setIsVerifyingOtp(true)
        setOtpError(null)

        try {
            // Call the API to verify OTP
            const response = await authService.verifyOtp(phoneNumber, otp)

            if (response.success) {
                // Store verified phone and OTP in localStorage

                // Update state
                setIsPhoneVerified(true)

                // Update guest info with the phone number
                setGuestInfo((prev) => ({
                    ...prev,
                    phone: phoneNumber,
                }))

                // Move to registration form step
                setCurrentStep(FormStep.REGISTRATION_FORM)
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setGuestInfo((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Toggle product selection
    const toggleProductSelection = (productId: string) => {
        const updatedSelections = new Map(selectedProducts)

        if (updatedSelections.has(productId)) {
            // If already selected, remove it
            updatedSelections.delete(productId)

            // Also remove any child product selection for this product
            const updatedChildSelections = new Map(selectedChildProducts)
            updatedChildSelections.delete(productId)
            setSelectedChildProducts(updatedChildSelections)
        } else {
            // If not selected, add it with empty options
            updatedSelections.set(productId, new Set<string>())
        }

        setSelectedProducts(updatedSelections)
    }

    // Toggle option item selection
    const toggleOptionItem = (productId: string, optionItemId: string) => {
        const updatedSelections = new Map(selectedProducts)
        const productOptions = updatedSelections.get(productId) || new Set<string>()

        if (productOptions.has(optionItemId)) {
            productOptions.delete(optionItemId)
        } else {
            productOptions.add(optionItemId)
        }

        updatedSelections.set(productId, productOptions)
        setSelectedProducts(updatedSelections)
    }

    // Add this function after the toggleOptionItem function
    // Handle child product selection (radio button style - only one can be selected per product)
    const selectChildProduct = (productId: string, childProductId: string) => {
        const updatedSelections = new Map(selectedChildProducts)
        updatedSelections.set(productId, childProductId)
        setSelectedChildProducts(updatedSelections)
    }

    // Check if a product is selected
    const isProductSelected = (productId: string): boolean => {
        return selectedProducts.has(productId)
    }

    // Add this function after isOptionItemSelected
    // Check if a child product is selected
    const getSelectedChildProduct = (productId: string): string | undefined => {
        return selectedChildProducts.get(productId)
    }

    // Check if an option item is selected
    const isOptionItemSelected = (productId: string, optionItemId: string): boolean => {
        const productOptions = selectedProducts.get(productId)
        return productOptions ? productOptions.has(optionItemId) : false
    }

    // Fetch customer workshop history

    // Xử lý khi người dùng xác nhận đăng ký tiếp
    const handleConfirmRegistration = async () => {
        if (!registrationData) return

        setIsSubmitting(true)
        setError(null)

        try {
            // Gửi dữ liệu đăng ký
            const response = await workshopService.workShopRegistration(registrationData)

            if (response.success) {
                setSuccess("Đăng ký khóa học thành công!")
                setRegistrationConfirmed(true)

                // Đóng popup sau một khoảng thời gian
                setTimeout(() => {
                    setShowWorkshopHistory(false)
                    onClose()
                }, 2000)
            } else {
                setError(response.message || "Đăng ký thất bại")
            }
        } catch (err) {
            console.error("Lỗi đăng ký:", err)
            setError("Đã xảy ra lỗi trong quá trình đăng ký")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            // Add this validation inside the try block of handleSubmit, before creating the products array
            const invalidSelections = Array.from(selectedProducts.keys()).filter((productId) => {
                const product = productDetails.get(productId)
                return (
                    product &&
                    product.productRole === "Master" &&
                    product.childProducts &&
                    product.childProducts.length > 0 &&
                    !selectedChildProducts.has(productId)
                )
            })

            if (invalidSelections.length > 0) {
                const invalidProductNames = invalidSelections
                    .map((id) => {
                        const product = productDetails.get(id)
                        return product ? product.name : id
                    })
                    .join(", ")

                setError(`Vui lòng chọn loại sản phẩm cho: ${invalidProductNames}`)
                setIsSubmitting(false)
                return
            }
            // Modify the handleSubmit function to include childProducts in the submission
            // Update inside the try block of handleSubmit, before creating the data object
            const products: ProductSelection[] = []

            selectedProducts.forEach((optionItems, productId) => {
                const product = productDetails.get(productId)

                if (!product) return

                // For Master products, we need a selected child product
                if (product.productRole === "Master") {
                    const selectedChildProductId = selectedChildProducts.get(productId)

                    if (selectedChildProductId) {
                        products.push({
                            productId,
                            optionItemIds: Array.from(optionItems),
                            childProductId: selectedChildProductId,
                        })
                    }
                }
                // For non-Master products, just add them with their options
                else {
                    products.push({
                        productId,
                        optionItemIds: Array.from(optionItems),
                        childProductId: "", // Empty string for non-Master products
                    })
                }
            })

            // Add validation before setting registrationData
            if (products.length === 0) {
                setError("Vui lòng chọn ít nhất một sản phẩm và tùy chọn kèm theo")
                setIsSubmitting(false)
                return
            }

            // Cập nhật cấu trúc dữ liệu đăng ký theo yêu cầu mới
            const data: WorkshopRegistration = {
                phoneNumber: phoneNumber,
                phoneOtp: otp,
                workshopId: workshop.id,
                totalParticipant: totalParticipants,
                email: guestInfo.email,
                customerName: guestInfo.name,
                products,
            }

            // Lưu dữ liệu đăng ký để sử dụng sau khi xác nhận
            setRegistrationData(data)

            console.log("Đang chuẩn bị dữ liệu đăng ký:", data)

            // Show workshop history popup với xác nhận đăng ký
            setShowWorkshopHistory(true)
        } catch (err) {
            console.error("Lỗi chuẩn bị đăng ký:", err)
            setError("Đã xảy ra lỗi trong quá trình chuẩn bị đăng ký")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Thêm hàm xử lý radio button (chỉ chọn một option)
    const handleRadioOptionChange = (productId: string, optionId: string, selectedItemId: string) => {
        const updatedSelections = new Map(selectedProducts)
        const productOptions = updatedSelections.get(productId) || new Set<string>()

        // Xóa tất cả các optionItems khác thuộc cùng một option
        const product = productDetails.get(productId)
        if (product && product.productOptions) {
            // Find the product option with the matching option id
            const productOption = product.productOptions.find((po) => po.option && po.option.id === optionId)
            if (productOption && productOption.option && productOption.option.optionItems) {
                // Xóa tất cả các optionItems của option này
                productOption.option.optionItems.forEach((item) => {
                    productOptions.delete(item.id)
                })
            }
        }

        // Thêm optionItem mới được chọn
        productOptions.add(selectedItemId)

        updatedSelections.set(productId, productOptions)
        setSelectedProducts(updatedSelections)
    }

    // Hàm xử lý đổi số điện thoại
    const handleChangePhoneNumber = () => {
        // Xóa thông tin xác thực số điện thoại

        // Reset các state liên quan
        setIsPhoneVerified(false)
        setOtp("")

        // Quay lại bước nhập số điện thoại
        setCurrentStep(FormStep.PHONE_INPUT)
    }

    // Reset form when closing
    const handleClose = () => {
        // Only reset if not in the middle of registration form
        if (currentStep !== FormStep.REGISTRATION_FORM) {
            setCurrentStep(FormStep.PHONE_INPUT)
            setPhoneNumber("")
            setOtp("")
            setOtpError(null)
        }
        onClose()
    }

    if (!isOpen) return null

    // Render different content based on current step
    const renderStepContent = () => {
        switch (currentStep) {
            case FormStep.PHONE_INPUT:
                return (
                    <div className="p-4">
                        <div className="mb-6 text-center">
                            <Phone className="h-12 w-12 text-primary mx-auto mb-2" />
                            <h3 className="text-lg font-medium">Xác thực số điện thoại</h3>
                            <p className="text-sm text-gray-500 mb-2">Vui lòng nhập số điện thoại của bạn để nhận mã xác thực</p>
                            <div className="bg-blue-50 border border-blue-200 text-blue-700 p-3 rounded-md text-sm">
                                <p>
                                    <strong>Lưu ý:</strong> Vui lòng nhập đúng số điện thoại của bạn. Chúng tôi sẽ gửi mã xác thực qua SMS
                                    để đảm bảo thông tin đăng ký chính xác.
                                </p>
                            </div>
                        </div>

                        {otpError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-start mb-4">
                                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{otpError}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="phoneNumber">Số điện thoại</Label>
                                <Input
                                    id="phoneNumber"
                                    type="tel"
                                    placeholder="0912345678"
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">Nhập số điện thoại bắt đầu bằng số 0 (VD: 0912345678)</p>
                            </div>

                            <Button onClick={handleSendOtp} disabled={isSendingOtp || phoneNumber.length < 10} className="w-full">
                                {isSendingOtp ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        Gửi mã OTP
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )

            case FormStep.OTP_VERIFICATION:
                return (
                    <div className="p-4">
                        <div className="mb-6 text-center">
                            <div className="bg-primary/10 rounded-full p-3 w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                                <Phone className="h-8 w-8 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium">Nhập mã xác thực</h3>
                            <p className="text-sm text-gray-500 mb-2">
                                Chúng tôi đã gửi mã OTP đến số điện thoại <strong>{phoneNumber}</strong>
                            </p>
                            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-3 rounded-md text-sm">
                                <p>
                                    Vui lòng kiểm tra tin nhắn SMS trên điện thoại của bạn và nhập mã OTP vào ô bên dưới. Mã có hiệu lực
                                    trong vòng 5 phút.
                                </p>
                            </div>
                        </div>

                        {otpError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-md flex items-start mb-4">
                                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                <p className="text-sm">{otpError}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="otp">Mã OTP</Label>
                                <Input
                                    id="otp"
                                    type="text"
                                    placeholder="Nhập mã OTP"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    className="mt-1 text-center text-lg tracking-widest"
                                    maxLength={6}
                                />
                            </div>

                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setCurrentStep(FormStep.PHONE_INPUT)
                                        setOtp("")
                                        setOtpError(null)
                                    }}
                                >
                                    Quay lại
                                </Button>

                                <Button onClick={handleVerifyOtp} disabled={isVerifyingOtp || otp.length < 4}>
                                    {isVerifyingOtp ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Đang xác thực...
                                        </>
                                    ) : (
                                        "Xác thực"
                                    )}
                                </Button>
                            </div>

                            <div className="text-center mt-4">
                                <p className="text-sm text-gray-500 mb-2">Không nhận được mã?</p>
                                <button
                                    type="button"
                                    onClick={handleSendOtp}
                                    disabled={isSendingOtp}
                                    className="text-primary text-sm hover:underline"
                                >
                                    {isSendingOtp ? (
                                        <>
                                            <Loader2 className="inline mr-1 h-3 w-3 animate-spin" />
                                            Đang gửi lại...
                                        </>
                                    ) : (
                                        "Gửi lại mã OTP"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )

            case FormStep.REGISTRATION_FORM:
                return (
                    <form onSubmit={handleSubmit} className="p-4">
                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                                <span>Đang tải tùy chọn sản phẩm...</span>
                            </div>
                        ) : error ? (
                            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start">
                                <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                <p>{error}</p>
                            </div>
                        ) : (
                            <>
                                {success && (
                                    <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-start mb-4">
                                        <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                        <p>{success}</p>
                                    </div>
                                )}

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Cột bên trái: Thông tin người đăng ký */}
                                    <div className="space-y-4">
                                        <div className="bg-primary/5 p-3 rounded-md border border-primary/20">
                                            <h5 className="font-medium flex items-center text-primary">
                                                <Users className="h-4 w-4 mr-2" />
                                                Thông tin người đăng ký
                                            </h5>

                                            <div className="mt-3 space-y-3">
                                                <div>
                                                    <Label htmlFor="name">Họ và tên</Label>
                                                    <Input
                                                        id="name"
                                                        name="name"
                                                        value={guestInfo.name}
                                                        onChange={handleInputChange}
                                                        placeholder="Nguyễn Văn A"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="email">Email</Label>
                                                    <Input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        value={guestInfo.email}
                                                        onChange={handleInputChange}
                                                        placeholder="example@gmail.com"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="phone">Số điện thoại</Label>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="relative flex-grow">
                                                            <Input
                                                                id="phone"
                                                                name="phone"
                                                                type="tel"
                                                                value={guestInfo.phone}
                                                                readOnly
                                                                className="bg-gray-50 pr-8"
                                                            />
                                                            <Check className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={handleChangePhoneNumber}
                                                            className="whitespace-nowrap h-9"
                                                        >
                                                            <RefreshCw className="h-3 w-3 mr-1" />
                                                            Đổi SĐT
                                                        </Button>
                                                    </div>
                                                    <p className="text-xs text-green-600 flex items-center mt-1">
                                                        <Check className="h-3 w-3 mr-1" />
                                                        Số điện thoại đã được xác thực
                                                    </p>
                                                </div>

                                                <div>
                                                    <Label htmlFor="totalParticipants">Số lượng người tham gia</Label>
                                                    <Input
                                                        id="totalParticipants"
                                                        type="number"
                                                        min={1}
                                                        max={workshop.maxParticipantPerRegister}
                                                        value={totalParticipants}
                                                        onChange={(e) => setTotalParticipants(Number.parseInt(e.target.value) || 1)}
                                                    />
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Tối đa {workshop.maxParticipantPerRegister} người mỗi đăng ký
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Thông tin tổng quan về khóa học */}
                                        <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                                            <h5 className="font-medium flex items-center text-blue-700">
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Thông tin khóa học
                                            </h5>
                                            <div className="mt-3 space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tên khóa học:</span>
                                                    <span className="font-medium">{workshop.name}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Ngày diễn ra:</span>
                                                    <span>{new Date(workshop.workshopDate).toLocaleDateString("vi-VN")}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Địa điểm:</span>
                                                    <span>{workshop.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tổng chi phí */}
                                        <div className="bg-gray-50 p-3 rounded-md border">
                                            <h5 className="font-medium flex items-center">
                                                <DollarSign className="h-4 w-4 mr-2" />
                                                Chi phí
                                            </h5>
                                            <div className="mt-3 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Phí tham gia:</span>
                                                    <span>{workshop.totalFee.toLocaleString()} VND / người</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Số lượng người:</span>
                                                    <span>{totalParticipants} người</span>
                                                </div>
                                                <div className="border-t pt-2 mt-2">
                                                    <div className="flex justify-between font-bold">
                                                        <span>Tổng cộng:</span>
                                                        <span className="text-primary">
                                                            {(totalParticipants * workshop.totalFee).toLocaleString()} VND
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cột bên phải: Chọn sản phẩm */}
                                    <div>
                                        <div className="bg-primary/5 p-3 rounded-md border border-primary/20 h-full">
                                            <h5 className="font-medium flex items-center text-primary">
                                                <Pizza className="h-4 w-4 mr-2" />
                                                Chọn sản phẩm
                                            </h5>
                                            <p className="text-xs text-gray-600 mt-1 mb-3">
                                                Chọn các sản phẩm bạn muốn làm trong khóa học và tùy chọn đi kèm
                                            </p>

                                            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                                                {workshop.workshopFoodDetails.map((food) => {
                                                    const product = productDetails.get(food.productId)
                                                    if (!product) return null

                                                    return (
                                                        <div key={food.id} className="border bg-white p-3 rounded-md">
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <div className="font-medium">{food.name}</div>
                                                                    <div className="text-sm text-gray-600">{food.price.toLocaleString()} VND</div>
                                                                </div>
                                                                <Checkbox
                                                                    id={`product-${food.id}`}
                                                                    checked={isProductSelected(food.productId)}
                                                                    onCheckedChange={() => toggleProductSelection(food.productId)}
                                                                />
                                                            </div>

                                                            {/* Update the product selection UI in the registration form */}
                                                            {isProductSelected(food.productId) && product.productRole === "Master" && (
                                                                <div className="mt-2 border-t pt-2">
                                                                    <p className="text-xs font-medium mb-1 text-red-500">* Bắt buộc chọn một loại:</p>
                                                                    <div className="grid grid-cols-1 gap-1 mt-1">
                                                                        {product.childProducts && product.childProducts.length > 0 ? (
                                                                            product.childProducts.map((childProduct) => (
                                                                                <div
                                                                                    key={childProduct.id}
                                                                                    className="flex items-center justify-between bg-gray-50 p-2 rounded"
                                                                                >
                                                                                    <div className="flex items-center">
                                                                                        <input
                                                                                            type="radio"
                                                                                            id={`child-${childProduct.id}-${food.productId}`}
                                                                                            name={`child-product-${food.productId}`}
                                                                                            checked={getSelectedChildProduct(food.productId) === childProduct.id}
                                                                                            onChange={() => selectChildProduct(food.productId, childProduct.id)}
                                                                                            className="h-3 w-3 text-primary"
                                                                                            required
                                                                                        />
                                                                                        <Label
                                                                                            htmlFor={`child-${childProduct.id}-${food.productId}`}
                                                                                            className="ml-2 text-xs"
                                                                                        >
                                                                                            {childProduct.name}
                                                                                        </Label>
                                                                                    </div>
                                                                                    <span className="text-xs text-primary">
                                                                                        {childProduct.price.toLocaleString()} VND
                                                                                    </span>
                                                                                </div>
                                                                            ))
                                                                        ) : (
                                                                            <div className="text-xs text-gray-500 italic p-2">Không có loại sản phẩm nào</div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {isProductSelected(food.productId) &&
                                                                product.productOptions &&
                                                                product.productOptions.length > 0 && (
                                                                    <div className="mt-2 border-t pt-2">
                                                                        <p className="text-xs font-medium mb-1 text-primary">Tùy chọn thêm:</p>
                                                                        {product.productOptions.map((productOption) => {
                                                                            // Get the option from the productOption
                                                                            const option = productOption.option || ({} as Option)
                                                                            return (
                                                                                <div key={productOption.id} className="mb-2">
                                                                                    <p className="text-xs font-medium">{option.name || "Option"}</p>
                                                                                    <div className="grid grid-cols-2 gap-1 mt-1">
                                                                                        {(option.optionItems || []).map((item) => (
                                                                                            <div
                                                                                                key={item.id}
                                                                                                className="flex items-center justify-between bg-gray-50 p-1 rounded"
                                                                                            >
                                                                                                <div className="flex items-center">
                                                                                                    {option.selectMany ? (
                                                                                                        // Checkbox cho phép chọn nhiều
                                                                                                        <Checkbox
                                                                                                            id={`option-${item.id}`}
                                                                                                            checked={isOptionItemSelected(food.productId, item.id)}
                                                                                                            onCheckedChange={() => toggleOptionItem(food.productId, item.id)}
                                                                                                            className=""
                                                                                                        />
                                                                                                    ) : (
                                                                                                        // Radio button chỉ cho phép chọn một
                                                                                                        <input
                                                                                                            type="radio"
                                                                                                            id={`option-${item.id}`}
                                                                                                            name={`option-${option.id}-${food.productId}`}
                                                                                                            checked={isOptionItemSelected(food.productId, item.id)}
                                                                                                            onChange={() =>
                                                                                                                handleRadioOptionChange(food.productId, option.id, item.id)
                                                                                                            }
                                                                                                            className="h-3 w-3 text-primary"
                                                                                                        />
                                                                                                    )}
                                                                                                    <Label htmlFor={`option-${item.id}`} className="ml-1 text-xs">
                                                                                                        {item.name}
                                                                                                    </Label>
                                                                                                </div>
                                                                                                {item.additionalPrice > 0 && (
                                                                                                    <span className="text-xs text-primary">
                                                                                                        +{item.additionalPrice.toLocaleString()}
                                                                                                    </span>
                                                                                                )}
                                                                                            </div>
                                                                                        ))}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        })}
                                                                    </div>
                                                                )}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="border-t pt-4 mt-6">
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
                                    Hủy
                                </Button>
                                <Button type="submit" disabled={isLoading || isSubmitting} className="bg-primary hover:bg-primary/90">
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        "Hoàn Tất Đăng Ký"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </form>
                )
        }
    }

    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
                        <h3 className="text-lg font-semibold">
                            {currentStep === FormStep.REGISTRATION_FORM ? "Đăng Ký Khóa Học" : "Xác Thực Số Điện Thoại"}
                        </h3>
                        <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {renderStepContent()}
                </div>
            </div>

            {/* Popup hiển thị lịch sử đăng ký workshop */}
            <CustomerWorkshopList
                isOpen={showWorkshopHistory}
                onClose={() => {
                    setShowWorkshopHistory(false)
                    onClose()
                }}
                currentWorkshop={workshop}
                onConfirmRegistration={handleConfirmRegistration}
            />
        </>
    )
}
