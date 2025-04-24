import { API_ENDPOINTS } from "@/apis/api.config"
import type ApiResponse from "@/apis/apiUtils"
import { get } from "@/apis/apiUtils"
import { Product } from "@/types/product"

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

