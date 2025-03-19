import { API_ENDPOINTS } from "@/apis/api.config"
import ApiResponse, { post } from "@/apis/apiUtils"
import axios from "axios"

// Types
export type LoginRequest = {
    userName: string
    password: string
}

export type RegisterRequest = {
    userName: string
    password: string
    fullName: string
    phone: string
    address: string
    gender: boolean
    dateOfBirth: string
    email: string
}

export type LoginResult = {
    token: string
    expiration: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RegisterResult = any

export type ApiErrorResponse = {
    error: {
        code: number
        title: string
        message: string
        statusCode: number
        timestamp: string
    }
}
/**
 * Authentication Service
 * Handles authentication-related API calls
 */
class AuthService {
    /**
     * Login user
     */
    async login(credentials: LoginRequest): Promise<ApiResponse<LoginResult>> {
        try {
            return await post<LoginResult>(API_ENDPOINTS.AUTH.LOGIN, credentials)
        } catch (error) {
            console.error("Error during login:", error)
            throw error
        }
    }

    /**
     * Register new user
     */
    async register(userData: RegisterRequest): Promise<ApiResponse<RegisterResult>> {
        try {
            console.log("Registering user with endpoint:", API_ENDPOINTS.AUTH.REGISTER)
            console.log("Registration data:", userData)

            return await post<RegisterResult>(API_ENDPOINTS.AUTH.REGISTER, userData)

        } catch (error) {
            console.error("Error during registration:", error)
            // Check if the error has the expected format
            if (axios.isAxiosError(error) && error.response?.data?.error) {
                // Extract the error message from the API response
                const apiError = error.response.data as ApiErrorResponse
                console.log("API error:", apiError)

                // Create a new error with the API error message
                const enhancedError = new Error(apiError.error.message)
                // Attach the original error data for reference
                Object.assign(enhancedError, { error: apiError.error })
                throw enhancedError
            }
            throw error
        }
    }


}

// Create and export a singleton instance
export const authService = new AuthService()

