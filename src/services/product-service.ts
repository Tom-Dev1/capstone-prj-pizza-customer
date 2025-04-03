import { API_ENDPOINTS } from "@/apis/api.config"
import type ApiResponse from "@/apis/apiUtils"
import { get } from "@/apis/apiUtils"

// Product Types
export type ProductType = "ColdKitchen" | "HotKitchen"

export interface OptionItems {
    id: string
    name: string
    additionalPrice: number
}

export interface ProductOption {
    id: string
    name: string
    optionItems: OptionItems[]
}

export interface Product {
    id: string
    name: string
    price: number
    image: string
    description: string
    categoryId: string
    productType: ProductType
    category: null
    options: ProductOption[]
}

export interface ProductsResponse {
    items: Product[]
    totalCount: number
}

/**
 * Product Service
 * Handles product-related API calls
 */
class ProductService {
    /**
     * Get product by ID
     */
    async getProductById(id: string): Promise<ApiResponse<Product>> {
        try {
            return await get<Product>(API_ENDPOINTS.PRODUCT.P_DETAILS(id))
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error)
            throw error
        }
    }
}

// Create and export a singleton instance
export const productService = new ProductService()

