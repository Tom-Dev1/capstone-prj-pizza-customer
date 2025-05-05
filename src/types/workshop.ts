

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
    totalRegisteredParticipant: number
    workshopStatus: WorkshopStatus // Add other possible statuses if needed
    zoneName: string
    workshopFoodDetails: WorkshopFoodDetail[]
}
// Types for Workshop Food Details
export type WorkshopFoodDetail = {
    id: string
    name: string
    price: number
    productId: string
    //   product: null | any // Replace with proper type if available
}
export enum WorkshopStatus {
    Opening = "Opening",
    OpeningToRegister = "OpeningToRegister",
    Scheduled = "Scheduled",
    ClosedRegister = "ClosedRegister",
    Closed = "Closed",
    Cancelled = "Cancelled",
}

export type WorkshopResponse = {
    items: Workshop
    totalCount: number
}

export interface ProductSelection {
    productId: string
    optionItemIds: string[]
    childProductId: string // Add this field
}

export interface WorkshopRegistration {
    customerName: string
    phoneNumber: string
    phoneOtp: string
    email: string
    workshopId: string
    totalParticipant: number
    products: ProductSelection[]
}
