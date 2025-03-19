"use client"

import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { authService, type LoginRequest } from "@/services"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
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
        setError(null)

        try {
            // Use the auth service to login
            const response = await authService.login(data)

            if (!response.success) {
                throw new Error(response.message || "Login failed")
            }

            // Extract token and expiration from response
            const { token, expiration } = response.result

            // Update auth context with token data
            login({ token, expiration })

            // Redirect to the page the user was trying to access, or dashboard
            const from = location.state?.from?.pathname || "/customer/dashboard"
            console.log("Redirecting to:", from) // Add this for debugging
            navigate(from, { replace: true })
        } catch (error) {
            console.error("Login failed:", error)
            setError(error instanceof Error ? error.message : "Invalid username or password. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-gray-500">Enter your credentials to access your account</p>
            </div>

            {error && <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="text">Email</Label>
                    <Input
                        id="text"
                        type="text"
                        placeholder="your@email.com"
                        {...register("userName", { required: "Email is required" })}
                        aria-invalid={errors.userName ? "true" : "false"}
                    />
                    {errors && (
                        <p className="text-red-500 text-sm" role="alert">
                            {errors.password?.message}
                        </p>
                    )}
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/auth/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...register("password", { required: "Password is required" })}
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm" role="alert">
                            {errors.password?.message}
                        </p>
                    )}
                </div>

                <Button type="submit" className="w-full bg-primary" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Log in"}
                </Button>
            </form>

            <div className="text-center">
                <p className="text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/auth/register" className="text-primary hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}

