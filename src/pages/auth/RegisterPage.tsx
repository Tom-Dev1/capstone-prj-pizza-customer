"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm, Controller } from "react-hook-form"
import { Eye, EyeOff, Check, X, Info } from "lucide-react"
import { type ApiErrorResponse, authService, type RegisterRequest } from "@/services"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion } from "framer-motion"

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<ApiErrorResponse | null>(null)
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        hasMinLength: false,
        hasUppercase: false,
        hasLowercase: false,
        hasNumber: false,
        hasSpecialChar: false,
    })
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, dirtyFields, isSubmitting, },
    } = useForm<RegisterRequest>({
        defaultValues: {
            gender: false, // Default to female
        },
        mode: "onChange", // Validate on change for better UX
    })

    // Watch password for strength meter
    const watchPassword = watch("password", "")

    // Update password strength
    useEffect(() => {
        if (watchPassword) {
            const hasMinLength = watchPassword.length >= 8
            const hasUppercase = /[A-Z]/.test(watchPassword)
            const hasLowercase = /[a-z]/.test(watchPassword)
            const hasNumber = /[0-9]/.test(watchPassword)
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(watchPassword)

            // Calculate score (0-4)
            let score = 0
            if (hasMinLength) score++
            if (hasUppercase && hasLowercase) score++
            if (hasNumber) score++
            if (hasSpecialChar) score++

            setPasswordStrength({
                score,
                hasMinLength,
                hasUppercase,
                hasLowercase,
                hasNumber,
                hasSpecialChar,
            })
        } else {
            setPasswordStrength({
                score: 0,
                hasMinLength: false,
                hasUppercase: false,
                hasLowercase: false,
                hasNumber: false,
                hasSpecialChar: false,
            })
        }
    }, [watchPassword])

    const getPasswordStrengthColor = () => {
        if (passwordStrength.score === 0) return "bg-gray-200"
        if (passwordStrength.score === 1) return "bg-red-500"
        if (passwordStrength.score === 2) return "bg-orange-500"
        if (passwordStrength.score === 3) return "bg-yellow-500"
        return "bg-green-500"
    }

    const getPasswordStrengthText = () => {
        if (!watchPassword) return ""
        if (passwordStrength.score === 1) return "Weak"
        if (passwordStrength.score === 2) return "Fair"
        if (passwordStrength.score === 3) return "Good"
        if (passwordStrength.score === 4) return "Strong"
        return ""
    }

    const onSubmit = async (data: RegisterRequest) => {
        setIsLoading(true)
        setErrorMessage(null)
        try {
            const formattedData = {
                ...data,
                dateOfBirth: new Date(data.dateOfBirth).toISOString(),
            }
            console.log("Submitting registration data:", formattedData)
            const response = await authService.register(formattedData)
            if (!response.success) {
                console.log("dang ky khong thanh cong")
                throw setErrorMessage(response.result.axiosError as ApiErrorResponse)
            }
            alert("Registration successful! Please login.")
            navigate("/auth/login")
        } catch (error) {


            console.log("ERROR Catch", error)

            alert('Register errror')

            throw error

        } finally {
            setIsLoading(false)
        }
    }

    // Animation variants for form elements
    const formItemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
            },
        }),
    }

    return (
        <TooltipProvider>
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Create an Account</h2>
                <p className="text-gray-600 mt-1">Fill in your details to get started</p>
            </div>

            {/* Display the error message */}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Username */}
                    <motion.div custom={0} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                            Username*
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 inline-block ml-1 text-gray-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Username must be unique and will be used for login</p>
                                </TooltipContent>
                            </Tooltip>
                        </label>
                        <input
                            id="userName"
                            type="text"
                            {...register("userName", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9_]+$/,
                                    message: "Username can only contain letters, numbers and underscore",
                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.userName
                                ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                                : dirtyFields.userName
                                    ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                    : "border-gray-300 focus:border-primary focus:ring-primary/20"
                                }`}
                        />
                        {dirtyFields.userName && !errors.userName && (
                            <Check className="absolute right-3 top-8 h-4 w-4 mt-1 text-green-500" />
                        )}
                        {errors.userName && (
                            <div className="mt-1 text-xs text-red-600 flex items-start">
                                <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{errors.userName.message}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Password */}
                    <motion.div custom={1} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
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
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                    validate: {
                                        hasUppercase: (value) =>
                                            /[A-Z]/.test(value) || "Password must contain at least one uppercase letter",
                                        hasLowercase: (value) =>
                                            /[a-z]/.test(value) || "Password must contain at least one lowercase letter",
                                        hasNumber: (value) => /[0-9]/.test(value) || "Password must contain at least one number",
                                        hasSpecialChar: (value) =>
                                            /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Password must contain at least one special character",
                                    },
                                })}
                                className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 pr-10 ${errors.password
                                    ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                                    : passwordStrength.score >= 3
                                        ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                        : "border-gray-300 focus:border-primary focus:ring-primary/20"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>

                        {/* Password strength meter */}
                        {watchPassword && (
                            <div className="mt-2">
                                <div className="flex justify-between items-center mb-1">
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4].map((index) => (
                                            <div
                                                key={index}
                                                className={`h-1.5 w-6 rounded-sm transition-colors ${passwordStrength.score >= index ? getPasswordStrengthColor() : "bg-gray-200"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span
                                        className={`text-xs font-medium ${passwordStrength.score <= 1
                                            ? "text-red-500"
                                            : passwordStrength.score === 2
                                                ? "text-orange-500"
                                                : passwordStrength.score === 3
                                                    ? "text-yellow-600"
                                                    : "text-green-500"
                                            }`}
                                    >
                                        {getPasswordStrengthText()}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2">
                                    <div
                                        className={`text-xs flex items-center ${passwordStrength.hasMinLength ? "text-green-600" : "text-gray-500"
                                            }`}
                                    >
                                        {passwordStrength.hasMinLength ? (
                                            <Check className="h-3 w-3 mr-1 mt-1" />
                                        ) : (
                                            <X className="h-3 w-3 mr-1" />
                                        )}
                                        At least 8 characters
                                    </div>
                                    <div
                                        className={`text-xs flex items-center ${passwordStrength.hasUppercase && passwordStrength.hasLowercase
                                            ? "text-green-600"
                                            : "text-gray-500"
                                            }`}
                                    >
                                        {passwordStrength.hasUppercase && passwordStrength.hasLowercase ? (
                                            <Check className="h-3 w-3 mr-1 mt-1" />
                                        ) : (
                                            <X className="h-3 w-3 mr-1" />
                                        )}
                                        Upper & lowercase
                                    </div>
                                    <div
                                        className={`text-xs flex items-center ${passwordStrength.hasNumber ? "text-green-600" : "text-gray-500"
                                            }`}
                                    >
                                        {passwordStrength.hasNumber ? <Check className="h-3 w-3 mr-1 mt-1" /> : <X className="h-3 w-3 mr-1" />}
                                        At least 1 number
                                    </div>
                                    <div
                                        className={`text-xs flex items-center ${passwordStrength.hasSpecialChar ? "text-green-600" : "text-gray-500"
                                            }`}
                                    >
                                        {passwordStrength.hasSpecialChar ? (
                                            <Check className="h-3 w-3 mr-1 mt-1" />
                                        ) : (
                                            <X className="h-3 w-3 mr-1" />
                                        )}
                                        Special character
                                    </div>
                                </div>
                            </div>
                        )}

                        {errors.password && !watchPassword && (
                            <div className="mt-1 text-xs text-red-600 flex items-start">
                                <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{errors.password.message}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Full Name */}
                    <motion.div custom={2} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name*
                        </label>
                        <input
                            id="fullName"
                            type="text"
                            {...register("fullName", {
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Full name must be at least 2 characters",
                                },
                                pattern: {
                                    value: /^[a-zA-ZÀ-ỹ\s]+$/,
                                    message: "Full name can only contain letters and spaces",
                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.fullName
                                ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                                : dirtyFields.fullName
                                    ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                    : "border-gray-300 focus:border-primary focus:ring-primary/20"
                                }`}
                        />
                        {dirtyFields.fullName && !errors.fullName && (
                            <Check className="absolute right-3 top-8 h-4 w-4 text-green-500 mt-1" />
                        )}
                        {errors.fullName && (
                            <div className="mt-1 text-xs text-red-600 flex items-start">
                                <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{errors.fullName.message}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Email */}
                    <motion.div custom={3} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
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
                            className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.email
                                ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                                : dirtyFields.email
                                    ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                    : "border-gray-300 focus:border-primary focus:ring-primary/20"
                                }`}
                        />
                        {dirtyFields.email && !errors.email && <Check className="absolute right-3 top-8 h-4 w-4 text-green-500 mt-1" />}
                        {errors.email && (
                            <div className="mt-1 text-xs text-red-600 flex items-start">
                                <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{errors.email.message}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Phone */}
                    <motion.div custom={4} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number*
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Info className="h-3.5 w-3.5 inline-block ml-1 text-gray-400 cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p className="text-xs">Enter a 10-digit phone number without spaces or dashes</p>
                                </TooltipContent>
                            </Tooltip>
                        </label>
                        <input
                            id="phone"
                            type="tel"
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^0[0-9]{9}$/,
                                    message: "Please enter a valid 10-digit phone number",
                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.phone
                                ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                                : dirtyFields.phone
                                    ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                    : "border-gray-300 focus:border-primary focus:ring-primary/20"
                                }`}
                        />
                        {dirtyFields.phone && !errors.phone && <Check className="absolute right-3 top-8 h-4 w-4 text-green-500 mt-1" />}
                        {errors.phone && (
                            <div className="mt-1 text-xs text-red-600 flex items-start">
                                <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{errors.phone.message}</span>
                            </div>
                        )}
                    </motion.div>

                    {/* Date of Birth */}
                    <motion.div custom={5} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
                        <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                            Date of Birth*
                        </label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            max={new Date().toISOString().split("T")[0]}
                            {...register("dateOfBirth", {
                                required: "Date of birth is required",
                                validate: {
                                    notFuture: (value) => {
                                        const date = new Date(value)
                                        const today = new Date()
                                        return date <= today || "Date of birth cannot be in the future"
                                    },

                                },
                            })}
                            className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.dateOfBirth
                                ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                                : dirtyFields.dateOfBirth
                                    ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                    : "border-gray-300 focus:border-primary focus:ring-primary/20"
                                }`}
                        />

                        {errors.dateOfBirth && (
                            <div className="mt-1 text-xs text-red-600 flex items-start">
                                <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                                <span>{errors.dateOfBirth.message}</span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Address - Full width */}
                <motion.div custom={6} initial="hidden" animate="visible" variants={formItemVariants} className="relative">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                    </label>
                    <textarea
                        id="address"
                        {...register("address", {
                            required: "Address is required",
                            minLength: {
                                value: 5,
                                message: "Address must be at least 5 characters",
                            },
                        })}
                        rows={2}
                        className={`w-full px-3 py-2 border rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errors.address
                            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
                            : dirtyFields.address
                                ? "border-green-300 focus:border-green-300 focus:ring-green-200"
                                : "border-gray-300 focus:border-primary focus:ring-primary/20"
                            }`}
                    />
                    {dirtyFields.address && !errors.address && (
                        <Check className="absolute right-3 top-8 h-4 w-4 text-green-500 mt-1" />
                    )}
                    {errors.address && (
                        <div className="mt-1 text-xs text-red-600 flex items-start">
                            <X className="h-3.5 w-3.5 mr-1 mt-0.5 flex-shrink-0" />
                            <span>{errors.address.message}</span>
                        </div>
                    )}
                </motion.div>

                {/* Gender */}
                <motion.div custom={7} initial="hidden" animate="visible" variants={formItemVariants}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender*</label>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                onValueChange={(value) => field.onChange(value === "true")}
                                defaultValue={String(field.value)}
                                className="flex space-x-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="true" id="male" />
                                    <Label htmlFor="male" className="text-sm">
                                        Male
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="false" id="female" />
                                    <Label htmlFor="female" className="text-sm">
                                        Female
                                    </Label>
                                </div>
                            </RadioGroup>
                        )}
                    />
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={isLoading || isSubmitting}
                    className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 mt-4 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {(isLoading || isSubmitting) && (
                        <span className="absolute inset-0 flex items-center justify-center">
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </span>
                    )}
                    <span className={isLoading || isSubmitting ? "opacity-0" : ""}>Create Account</span>
                </motion.button>

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link to="/auth/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </form>
        </TooltipProvider>
    )
}

