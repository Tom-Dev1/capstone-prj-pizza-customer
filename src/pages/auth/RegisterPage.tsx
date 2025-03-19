"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { authService, type RegisterRequest } from "@/services"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterRequest>({
    })

    const onSubmit = async (data: RegisterRequest) => {
        setIsLoading(true)
        setError(null)

        try {
            // Format the date to ISO string as required by the API
            const formattedData = {
                ...data,
                dateOfBirth: new Date(data.dateOfBirth).toISOString(),
                gender: data.gender === true ? true : false
            }

            console.log("Submitting registration data:", formattedData)

            // Use the auth service to register with the /auth/customer/register endpoint
            const response = await authService.register(formattedData)
            console.log("Registration response:", response)

            if (!response.success) {
                throw new Error(response.message || "Registration failed")
            }

            alert("Registration successful! Please login.")
            navigate("/auth/login")
        } catch (error) {
            console.error("Registration failed:", error)
            setError(error instanceof Error ? error.message : "Registration failed. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold">Create an Account</h2>
                <p className="text-gray-600 mt-2">Join our pizza-loving community</p>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">Số điện thoại hoặc tên đăng nhập đã tồn tại</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                        Username*
                    </label>
                    <input
                        id="userName"
                        type="text"
                        {...register("userName", { required: "Username is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.userName && <p className="mt-1 text-sm text-red-600">{errors.userName.message}</p>}
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password*
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                        </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name*
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        {...register("fullName", { required: "Full name is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>}
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email*
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Invalid email address",
                            },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number*
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10,}$/,
                                message: "Please enter a valid phone number",
                            },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
                </div>

                <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                    </label>
                    <textarea
                        id="address"
                        {...register("address", { required: "Address is required" })}
                        rows={2}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
                </div>

                <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth*
                    </label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        {...register("dateOfBirth", { required: "Date of birth is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                    <div className="flex space-x-4">
                        <div className="flex items-center">
                            <input
                                id="male"
                                type="radio"
                                value="true"
                                {...register("gender")}
                                defaultChecked
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label htmlFor="male" className="ml-2 block text-sm text-gray-700">
                                Male
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="female"
                                type="radio"
                                value="false"
                                {...register("gender")}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <label htmlFor="female" className="ml-2 block text-sm text-gray-700">
                                Female
                            </label>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 mt-6"
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="font-medium text-primary hover:text-primary/80">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

