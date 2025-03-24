import { API_ENDPOINTS } from "@/apis/api.config"
import ApiResponse, { get } from "@/apis/apiUtils"
export type CustomerProfile = {
    id: string
    fullName: string
    phone: string
    address: string
    verifiedCodeEmail: string
    isVerifiedEmail: boolean
    gender: boolean
    dateOfBirth: string
    email: string
}

class CustomerService {
    async getCustomerId(id: string): Promise<ApiResponse<CustomerProfile>> {
        try {
            return await get<CustomerProfile>(API_ENDPOINTS.CUSTOMER.PROFILE(id))
        } catch (error) {
            console.error("Error fetching customer profile:", error)
            throw error
        }
    }

}

export const customerService = new CustomerService()