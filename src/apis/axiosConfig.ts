import axios, { type AxiosInstance, type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios"

const apiUrl = `https://vietsac.id.vn/api`
console.log("API URL:", apiUrl);

// Create Axios instance
const api: AxiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
})

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from localStorage
        const authToken = localStorage.getItem("auth_token")
        if (authToken) {
            try {
                const { token } = JSON.parse(authToken)
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
            } catch (error) {
                console.error("Error parsing auth token:", error)
            }
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    },
)

// Response interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        // Process response data
        return response
    },
    (error: AxiosError) => {
        // Handle response errors
        if (error.response) {
            console.error("Response error:", error.response.data)
            console.error("Status:", error.response.status)
            console.error("Headers:", error.response.headers)


            return Promise.reject(error.response.data)
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request error:", error.request)
        } else {
            console.error("Error:", error.message)
        }
        return Promise.reject(error)
    },
)

export default api

