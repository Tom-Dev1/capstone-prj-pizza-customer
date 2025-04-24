import type { Product, ProductOption, Option, } from "@/types/product"
import OptionItem from "@/types/product"

/**
 * Safely gets option items from a product option with proper null checks
 * @param productOption The product option to get items from
 * @returns An array of option items or an empty array if not available
 */
export function getOptionItems(productOption: ProductOption | undefined): OptionItem[] {
    if (!productOption || !productOption.option || !productOption.option.optionItems) {
        return []
    }
    return productOption.option.optionItems
}

/**
 * Safely gets the option from a product option with proper null checks
 * @param productOption The product option to get the option from
 * @returns The option or undefined if not available
 */
export function getOption(productOption: ProductOption | undefined): Option | undefined {
    if (!productOption) {
        return undefined
    }
    return productOption.option
}

/**
 * Checks if a product has valid child products
 * @param product The product to check
 * @returns True if the product has at least one child product
 */
export function hasChildProducts(product: Product | undefined): boolean {
    if (!product || !product.childProducts) {
        return false
    }
    return product.childProducts.length > 0
}

/**
 * Safely gets child products from a product with proper null checks
 * @param product The product to get child products from
 * @returns An array of child products or an empty array if not available
 */
export function getChildProducts(product: Product | undefined) {
    if (!product || !product.childProducts) {
        return []
    }
    return product.childProducts
}

/**
 * Safely gets product options from a product with proper null checks
 * @param product The product to get options from
 * @returns An array of product options or an empty array if not available
 */
export function getProductOptions(product: Product | undefined) {
    if (!product || !product.productOptions) {
        return []
    }
    return product.productOptions
}

// Add a new function to get child products by their IDs
/**
 * Gets child products by their IDs from a collection of products
 * @param childProductIds Array of child product IDs
 * @param allProducts Map of all available products
 * @returns Array of child products that match the IDs
 */
export function getChildProductsByIds(childProductIds: { id: string }[], allProducts: Map<string, Product>): Product[] {
    if (!childProductIds || !allProducts || childProductIds.length === 0) {
        return []
    }

    return childProductIds
        .map((cp) => allProducts.get(cp.id))
        .filter((product): product is Product => product !== undefined && product.productRole === "Child")
}

/**
 * Checks if a product is a master product with child products
 * @param product The product to check
 * @returns True if the product is a master product with child products
 */
export function isMasterProductWithChildren(product: Product | undefined): boolean {
    if (!product) {
        return false
    }

    return product.productRole === "Master" && product.childProducts !== undefined && product.childProducts.length > 0
}
