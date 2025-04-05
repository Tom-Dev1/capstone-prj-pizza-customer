import { API_ENDPOINTS } from "@/apis/api.config";
import { post } from "@/apis/apiUtils";
import type ApiResponse from "@/apis/apiUtils"



export interface BookingFormData {
    customerName: string
    phoneNumber: string
    phoneOtp: string
    bookingTime: string
    numberOfPeople: number
}

class ReservationService {


    async CreateBooking(data: BookingFormData): Promise<ApiResponse<unknown>> {
        try {
            return await post<unknown>(API_ENDPOINTS.RESERVATION.CREATE, data)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

}
export const reservationService = new ReservationService()