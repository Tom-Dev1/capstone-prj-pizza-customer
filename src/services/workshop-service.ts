import { API_ENDPOINTS } from "@/apis/api.config"
import type ApiResponse from "@/apis/apiUtils"
import { get, post } from "@/apis/apiUtils"
import { CustomerWorkshopResponse } from "@/types/customer-workshop.types"

// Types for Workshop Food Details
export type WorkshopFoodDetail = {
    id: string
    name: string
    price: number
    productId: string
    //   product: null | any // Replace with proper type if available
}

// Main Workshop Type
export type Workshop = {
    id: string
    name: string
    header: string
    description: string
    location: string
    organizer: string
    hotLineContact: string
    workshopDate: string
    startRegisterDate: string
    endRegisterDate: string
    totalFee: number
    maxRegister: number
    maxPizzaPerRegister: number
    maxParticipantPerRegister: number
    workshopStatus: WorkshopStatus // Add other possible statuses if needed
    zoneId: string
    //   zone: null | any // Replace with proper type if available
    zoneName: string
    workshopFoodDetails: WorkshopFoodDetail[]
}
export enum WorkshopStatus {
    Scheduled = 'Scheduled',
    Opening = 'Opening',
    Closed = 'Closed',
    Approved = 'Approved',
    Cancelled = 'Cancelled'
}
export type WorkshopResponse = {
    items: Workshop
    totalCount: number,
}
export interface ProductSelection {
    productId: string
    optionItemIds: string[]
}

export interface WorkshopRegistration {
    customerName: string,
    phoneNumber: string,
    phoneOtp: string,
    email: string,
    workshopId: string
    totalParticipant: number
    products: ProductSelection[]
}

/**
 * Workshop Service
 * Handles workshop-related API calls
 */
class WorkshopService {
    /**
     * Get all workshops
     */
    async getAllWorkshops(): Promise<ApiResponse<WorkshopResponse>> {
        try {
            return await get<WorkshopResponse>(API_ENDPOINTS.WORKSHOP.GET_WORKSHOP)
        } catch (error) {
            console.error("Error fetching workshops:", error)
            throw error
        }
    }

    /**
     * Get workshop by ID
     */
    async getWorkshopById(id: string): Promise<ApiResponse<Workshop>> {
        try {
            return await get<Workshop>(API_ENDPOINTS.WORKSHOP.DETAILS(id))
        } catch (error) {
            console.error(`Error fetching workshop with ID ${id}:`, error)
            throw error
        }
    }


    async workShopRegistration(data: WorkshopRegistration): Promise<ApiResponse<unknown>> {
        try {
            // Get the auth token from localStorage
            const authToken = localStorage.getItem("auth_token")
            let token = null

            if (authToken) {
                try {
                    const { token: authTokenValue } = JSON.parse(authToken)
                    token = authTokenValue
                } catch (error) {
                    console.error("Error parsing auth token:", error)
                }
            }

            // Create headers with Authorization
            const headers = {
                "Content-Type": "application/json",
                Authorization: token ? `Bearer ${token}` : "",
            }
            console.log(headers);

            return await post<unknown>(API_ENDPOINTS.WORKSHOP.WORKSHOP_REGISTER, data, { headers })
        } catch (error) {
            console.error(`Error register workshop `)
            throw error
        }
    }
    async getWorkshopByPhoneCustomer(phoneNumber: string): Promise<ApiResponse<CustomerWorkshopResponse>> {
        try {
            return await get<CustomerWorkshopResponse>(API_ENDPOINTS.WORKSHOP.CUSTOMER_WORKSHOPS(phoneNumber))
        } catch (error) {
            console.error(`Lỗi khi tải danh sách khóa học đã đăng ký với số điện thoại ${phoneNumber}:`, error)
            throw error
        }
    }
}

// Create and export a singleton instance
export const workshopService = new WorkshopService()

