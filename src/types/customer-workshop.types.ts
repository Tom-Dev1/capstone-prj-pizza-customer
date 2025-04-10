
export enum WorkshopRegisterStatus {
    Registered = "Registered",
    Attended = "Attended",
    Cancel = "Cancel",
}

export interface WorkshopPizzaRegisterDetail {
    id: string
    name: string
    additionalPrice: number
    optionItemId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    optionItem: null | any
}

export interface WorkshopPizzaRegister {
    id: string
    name: string
    productId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    product: null | any
    price: number
    totalPrice: number
    workshopPizzaRegisterDetails: WorkshopPizzaRegisterDetail[]
}

export interface CustomerWorkshop {
    id: string
    customerPhone: string
    customerName: string
    workshopId: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    workshop: null | any
    workshopRegisterStatus: WorkshopRegisterStatus | string
    registeredAt: string
    totalParticipant: number
    orderId: null | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    order: null | any
    workshopPizzaRegisters: WorkshopPizzaRegister[]
    totalFee: number
    code: string
    tableId: null | string
    tableCode: null | string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: null | any
}

export interface CustomerWorkshopResponse {
    items: CustomerWorkshop[]
    totalCount: number
}
