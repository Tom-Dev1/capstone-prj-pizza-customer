

export interface Product {
    id: string
    name: string
    price: number
    imageUrl: string
    description: string
    productOptions: ProductOption[]
    productRole: ProductRole
    productStatus: ProductStatus
    childProducts: ChildProducts[]
    recipes: Recipe[]
}
export interface Recipe {
    id: string
    productId: string
    ingredientId: string
    ingredientName: string
    unit: UnitType
    quantity: number
    ingredient: Ingredient
}
export interface Ingredient {
    id: string
    name: string
    description: string | null
}


export interface ChildProducts {
    id: string
    name: string
    price: number
}

export interface ProductOption {
    id: string;
    optionId: string;
    option: Option
}
export interface Option {
    id: string;
    name: string;
    selectMany: boolean
    description: string;
    optionItems: OptionItem[];
}

export default interface OptionItem {
    id: string,
    name: string,
    additionalPrice: number
}



export interface ProductsResponse {
    items: Product[]
    totalCount: number
}
export enum UnitType {
    Milligram = "Milligram",
    Gram = "Gram",
    Kilogram = "Kilogram",
    Milliliter = "Milliliter",
    Liter = "Liter",
    Piece = "Piece",
    Teaspoon = "Teaspoon",
    Tablespoon = "Tablespoon",
}

export type ProductStatus = "Available" | "OutOfIngredient" | "Locked"
// Product Types
export type ProductType = "ColdKitchen" | "HotKitchen"

export type ProductRole = "Child" | "Master" | "Combo"