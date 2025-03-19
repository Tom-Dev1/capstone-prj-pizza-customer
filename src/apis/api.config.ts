/**
 * API Configuration
 * Contains all API-related configuration settings
 */

// API Endpoints
export const API_ENDPOINTS = {
    // Auth endpoints
    AUTH: {
        LOGIN: "/auth/customer/login",
        REGISTER: "/auth/customer/register",
    },

    // Customer endpoints
    CUSTOMER: {
        PROFILE: "/customer/profile",
        UPDATE_PROFILE: "/customer/profile",
        CHANGE_PASSWORD: "/customer/change-password",
    },

    // Order endpoints
    ORDER: {
        LIST: "/orders",
        DETAILS: (id: string) => `/orders/${id}`,
        CREATE: "/orders",
        UPDATE: (id: string) => `/orders/${id}`,
        CANCEL: (id: string) => `/orders/${id}/cancel`,
    },

    // Product endpoints
    PRODUCT: {
        LIST: "/products",
        DETAILS: (id: string) => `/products/${id}`,
        FEATURED: "/products/featured",
        CATEGORIES: "/product-categories",
    },

    // Workshop endpoints
    WORKSHOP: {
        LIST: "/workshops",
        DETAILS: (id: string) => `/workshops/${id}`,
        BOOK: "/workshop-bookings",
        MY_BOOKINGS: "/workshop-bookings/my",
    },

    // Categories endpoints
    CATEGORIES: {
        LIST: "/categories",
    },
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

