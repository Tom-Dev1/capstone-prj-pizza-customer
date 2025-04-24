
import { useState, useEffect } from "react"

import type { Product, ProductOption } from "@/types/product"
import { Loader2, AlertCircle, Pizza, ChevronDown, ChevronUp, Plus, Package } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { getOption, getOptionItems, hasChildProducts } from "@/utils/product-helpers"
import { productService } from "@/services"

interface ProductDetailsProps {
    productId: string
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showOptions, setShowOptions] = useState(false)
    const [showChildProducts, setShowChildProducts] = useState(false)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const response = await productService.getProductById(productId)

                if (response.success && response.result) {
                    setProduct(response.result)
                    console.log("Product loaded:", response.result)
                } else {
                    setError(response.message || "Failed to fetch product details")
                }
            } catch (err) {
                console.error(`Error fetching product ${productId}:`, err)
                setError("An error occurred while fetching product details")
            } finally {
                setIsLoading(false)
            }
        }

        if (productId) {
            fetchProductDetails()
        }
    }, [productId])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
                <span className="text-sm">Loading product...</span>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center text-red-500 p-2 text-sm">
                <AlertCircle className="h-4 w-4 mr-1" />
                <span>{error}</span>
            </div>
        )
    }

    if (!product) {
        return <div className="text-sm text-gray-500 p-2">Product information not available</div>
    }

    // Ensure productOptions is always an array
    const productOptions = product.productOptions || []
    const hasOptions = productOptions.length > 0
    const hasChilds = hasChildProducts(product)

    return (
        <Card className="overflow-hidden border-dashed border-primary/30 bg-primary/5 mb-2">
            <CardContent className="p-3">
                <div className="flex items-start">
                    {product.imageUrl && (
                        <div className="flex-shrink-0 mr-3">
                            <img
                                src={product.imageUrl || "/placeholder.svg"}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-md"
                                onError={(e) => {
                                    e.currentTarget.src = "/placeholder.svg?height=64&width=64"
                                    e.currentTarget.alt = "Image not available"
                                }}
                            />
                        </div>
                    )}
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium text-primary flex items-center">
                                <Pizza className="h-4 w-4 mr-1" />
                                {product.name}
                            </h4>
                            <Badge variant="outline" className="ml-2 text-xs">
                                {product.productRole}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                        <div className="mt-1 font-semibold text-primary">{product.price.toLocaleString()} VND</div>

                        <div className="flex space-x-2 mt-2">
                            {/* Toggle options button */}
                            {hasOptions && (
                                <button
                                    onClick={() => setShowOptions(!showOptions)}
                                    className="text-xs flex items-center text-primary hover:text-primary/80 transition-colors"
                                >
                                    {showOptions ? (
                                        <>
                                            <ChevronUp className="h-3 w-3 mr-1" />
                                            Hide options
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="h-3 w-3 mr-1" />
                                            Show options ({productOptions.length})
                                        </>
                                    )}
                                </button>
                            )}

                            {/* Toggle child products button */}
                            {hasChilds && (
                                <button
                                    onClick={() => setShowChildProducts(!showChildProducts)}
                                    className="text-xs flex items-center text-primary hover:text-primary/80 transition-colors"
                                >
                                    {showChildProducts ? (
                                        <>
                                            <ChevronUp className="h-3 w-3 mr-1" />
                                            Hide variants
                                        </>
                                    ) : (
                                        <>
                                            <ChevronDown className="h-3 w-3 mr-1" />
                                            Show variants ({product.childProducts.length})
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Child products */}
                {product.productRole === "Master" &&
                    product.childProducts &&
                    product.childProducts.length > 0 &&
                    showChildProducts && (
                        <div className="mt-3 border-t border-dashed border-primary/20 pt-2">
                            <h5 className="text-sm font-medium flex items-center mb-2">
                                <Package className="h-4 w-4 mr-1 text-primary" />
                                Các loại sản phẩm
                            </h5>
                            <div className="space-y-1 pl-2">
                                {product.childProducts.map((childProduct) => (
                                    <div key={childProduct.id} className="flex justify-between text-xs py-1 bg-white p-2 rounded-md">
                                        <span>{childProduct.name}</span>
                                        <span className="font-medium">{childProduct.price.toLocaleString()} VND</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                {/* Product options */}
                {hasOptions && showOptions && (
                    <div className="mt-3 border-t border-dashed border-primary/20 pt-2">
                        <Accordion type="single" collapsible className="w-full">
                            {productOptions.map((productOption: ProductOption) => {
                                // Get the option from the productOption
                                const option = getOption(productOption)
                                if (!option) return null

                                return (
                                    <AccordionItem key={productOption.id} value={productOption.id} className="border-b-0">
                                        <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                                            {option.name || "Option"}
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-1 pl-2">
                                                {/* Add null check for optionItems */}
                                                {getOptionItems(productOption).map((item) => (
                                                    <div key={item.id} className="flex justify-between text-xs py-1">
                                                        <span className="flex items-center">
                                                            <Plus className="h-3 w-3 mr-1 text-primary/70" />
                                                            {item.name}
                                                        </span>
                                                        {item.additionalPrice > 0 && (
                                                            <span className="text-primary">+{item.additionalPrice.toLocaleString()} VND</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                )
                            })}
                        </Accordion>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
