// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: "/auth/customer/login",
        REGISTER: "/auth/customer/register",
        SENDCODE: "/auth/customer/send-verify-code",
        VERIFYMAIL: "/auth/customer/verify-email"

    },

    // Customer endpoints
    CUSTOMER: {
        PROFILE: (id: string) => `/customers/${id}`,
        // UPDATE_PROFILE: "/customer/profile",
        // CHANGE_PASSWORD: "/customer/change-password",
    },

    // Order endpoints
    // ORDER: {
    //     LIST: "/orders",
    //     DETAILS: (id: string) => `/orders/${id}`,
    //     CREATE: "/orders",
    //     UPDATE: (id: string) => `/orders/${id}`,
    //     CANCEL: (id: string) => `/orders/${id}/cancel`,
    // },

    // Product endpoints
    PRODUCT: {
        P_LIST: "/products?IncludeProperties=Options.OptionItems",
        P_DETAILS: (id: string) => `/products/${id}?includeProperties=Options.OptionItems`,
        FEATURED: "/products/featured",
        CATEGORIES: "/product-categories",
    },

    // Workshop endpoints
    WORKSHOP: {
        GET_WORKSHOP: "/workshops?IncludeProperties=WorkshopFoodDetails",
        DETAILS: (id: string) => `/workshops/${id}?includeProperties=WorkshopFoodDetails`,
        WORKSHOP_REGISTER: "/workshop-register",
        MY_BOOKINGS: "/workshop-bookings",
    },

    // // Categories endpoints
    // CATEGORIES: {
    //     LIST: "/categories",
    // },
}

// HTTP Status Codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
}

