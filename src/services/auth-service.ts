import { API_ENDPOINTS } from "@/apis/api.config"
import ApiResponse, { post } from "@/apis/apiUtils"


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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type LoginResult = any

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RegisterResult = any

export type SendCodeRequest = {
    customerId: string
}

export type VerifyEmail = {
    customerId: string,
    code: string
}
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

            return await post<RegisterResult>(API_ENDPOINTS.AUTH.REGISTER, userData)
        } catch (error) {
            console.error("Error during registration:", error)
            // If we couldn't extract a specific message, throw the original error
            throw error
        }
    }
    async sendVerifyCode(customerData: SendCodeRequest): Promise<ApiResponse<void>> {

        try {
            return await post<void>(API_ENDPOINTS.AUTH.SENDCODE, customerData)
        } catch (error) {
            console.log("Send verify code error");
            throw error
        }

    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async verifyEmail(customerData: VerifyEmail): Promise<ApiResponse<any>> {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return await post<any>(API_ENDPOINTS.AUTH.VERIFYMAIL, customerData)
        } catch (error) {
            console.log("Verify email code is error ");

            throw error
        }
    }
}


// Create and export a singleton instance
export const authService = new AuthService()

