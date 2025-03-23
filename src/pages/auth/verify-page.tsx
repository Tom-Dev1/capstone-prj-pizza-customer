"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useProfile } from "@/contexts/ProfileContext"
import { type ApiErrorResponse, authService, type SendCodeRequest, type VerifyEmail } from "@/services/auth-service"
import { Button } from "@/components/ui/button"
import { Loader2, AlertCircle } from "lucide-react"
import { toast, ToastContainer } from "react-toastify"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"

export default function VerifyPage() {
    const { user } = useAuth()
    const { profile } = useProfile()
    const navigate = useNavigate()
    const [verificationCode, setVerificationCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<ApiErrorResponse | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [countdown, setCountdown] = useState(60)
    const [isResending, setIsResending] = useState(false)
    const [isCodeSent, setIsCodeSent] = useState(false)

    // Ref to track initial code sending
    const initialSendRef = useRef(false)
    // Ref to store success message timeout
    const successTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    // Ref to store error message timeout
    const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null)

    // Clear success message after 3 seconds
    useEffect(() => {
        if (success) {
            // Clear any existing timeout
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current)
            }

            // Set new timeout to clear success message after 3 seconds
            successTimeoutRef.current = setTimeout(() => {
                setSuccess(null)
            }, 3000)
        }

        // Cleanup on unmount
        return () => {
            if (successTimeoutRef.current) {
                clearTimeout(successTimeoutRef.current)
            }
        }
    }, [success])

    // Clear error message after 3 seconds
    useEffect(() => {
        if (error) {
            // Clear any existing timeout
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current)
            }

            // Set new timeout to clear error message after 3 seconds
            errorTimeoutRef.current = setTimeout(() => {
                setError(null)
            }, 3000)
        }

        // Cleanup on unmount
        return () => {
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current)
            }
        }
    }, [error])

    // Clear API error message after 3 seconds
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage(null)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [errorMessage])

    // Send verification code on initial load - only once
    useEffect(() => {
        // Check if code hasn't been sent and CustomerId exists
        if (!initialSendRef.current && user?.CustomerId) {
            console.log("Sending initial verification code")
            handleSendVerificationCode()
            initialSendRef.current = true // Mark as sent
        }
    }, [user?.CustomerId]) // Only depend on CustomerId

    // Countdown for resend button
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    // Handle verification code submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!verificationCode.trim() || verificationCode.length < 6) {
            setError("Please enter the complete verification code")
            return
        }

        if (!user?.CustomerId) {
            setError("User information not found")
            return
        }

        try {
            setIsSubmitting(true)
            setError(null)
            setErrorMessage(null)

            const verifyData: VerifyEmail = {
                customerId: user.CustomerId,
                code: verificationCode,
            }

            const response = await authService.verifyEmail(verifyData)

            if (response.success) {
                toast.success("Email verification successful!", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })

                // Redirect after short delay
                setTimeout(() => {
                    navigate("/customer/dashboard")
                }, 1500)
            } else {
                setErrorMessage(response.result.axiosError as ApiErrorResponse)
            }
        } catch (err) {
            console.error("Verification error:", err)
            setError("An error occurred during verification. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // Handle send verification code
    const handleSendVerificationCode = async () => {
        if (!user?.CustomerId) {
            setError("User information not found")
            return
        }

        try {
            setIsResending(true)
            setError(null)
            setErrorMessage(null)

            console.log("Sending verification code for CustomerId:", user.CustomerId)

            const sendCodeData: SendCodeRequest = {
                customerId: user.CustomerId,
            }

            const response = await authService.sendVerifyCode(sendCodeData)

            if (response.success) {
                setIsCodeSent(true) // Mark that code has been sent
                toast.success("Verification code sent. Please check your email.", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                })
                setCountdown(60) // Reset countdown
                // Clear the verification code input when resending
                setVerificationCode("")
            } else {
                setError(response.message || "Could not send verification code")
            }
        } catch (err) {
            console.error("Send code error:", err)
            setError("An error occurred while sending the code. Please try again.")
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <ToastContainer />
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Account Verification</h2>
                <p className="text-gray-600 mt-2">
                    Please enter the verification code sent to {profile?.email || user?.name || "your email"}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="">
                <div>
                    <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700 mb-3">
                        Verification Code
                    </label>
                    <div className="flex justify-center mb-2">
                        <InputOTP
                            maxLength={6}
                            value={verificationCode}
                            onChange={setVerificationCode}
                            disabled={isSubmitting || !isCodeSent}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />

                                <InputOTPSlot index={1} />

                                <InputOTPSlot index={2} />
                                <InputOTPSeparator />
                                <InputOTPSlot index={3} />

                                <InputOTPSlot index={4} />

                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                    </div>
                    <div className="h-5">
                        {errorMessage && (
                            <div className=" text-red-700 flex items-center justify-center mt-2 text-center text-sm gap-1">
                                <p>{errorMessage.error.message}</p>
                                <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                            </div>
                        )}
                        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                        {!isCodeSent && !error && (
                            <p className="relative top-0 text-amber-500 text-sm mt-2 text-center">Wait for send verification code !</p>
                        )}
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full py-5 bg-primary hover:bg-primary/90 mt-5"
                    disabled={isSubmitting || !isCodeSent || verificationCode.length < 6}
                >
                    {isSubmitting ? (
                        <>
                            Verifying...
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        </>
                    ) : (
                        "Verify"
                    )}
                </Button>

                <div className="text-center">
                    <p className="text-sm text-gray-600 my-3">
                        {isCodeSent ? "Didn't receive the code?" : "Send verification code to continue"}
                    </p>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleSendVerificationCode}
                        disabled={countdown > 0 || isResending}
                        className="text-primary border-primary hover:bg-primary/10"
                    >
                        {isResending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Resending...
                            </>
                        ) : countdown > 0 ? (
                            `Resend code (${countdown}s)`
                        ) : isCodeSent ? (
                            "Resend code"
                        ) : (
                            "Send code"
                        )}
                    </Button>
                </div>
            </form>

            <div className="mt-8 text-center">
                <p className="text-sm text-gray-600">
                    If you're having trouble with verification, please contact us at{" "}
                    <a href="mailto:support@PizzaCapstone.com" className="text-primary hover:underline">
                        support@PizzaCapstone.com
                    </a>
                </p>
            </div>
        </div>
    )
}

