"use client"

import { useState, useEffect } from "react"
import { productService, type Product, type ProductOption } from "@/services/product-service"
import { Loader2, AlertCircle, Pizza, ChevronDown, ChevronUp, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProductDetailsProps {
    productId: string
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
    const [product, setProduct] = useState<Product | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showOptions, setShowOptions] = useState(false)

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                setIsLoading(true)
                setError(null)

                const response = await productService.getProductById(productId)

                if (response.success && response.result) {
                    setProduct(response.result)
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

    return (
        <Card className="overflow-hidden border-dashed border-primary/30 bg-primary/5 mb-2">
            <CardContent className="p-3">
                <div className="flex items-start">
                    {product.image && (
                        <div className="flex-shrink-0 mr-3">
                            <img
                                src={`data:image/jpeg;base64,` + product.image || "/placeholder.svg"}
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
                                {product.productType}
                            </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                        <div className="mt-1 font-semibold text-primary">{product.price.toLocaleString()} VND</div>

                        {/* Toggle options button */}
                        {product.options && product.options.length > 0 && (
                            <button
                                onClick={() => setShowOptions(!showOptions)}
                                className="mt-2 text-xs flex items-center text-primary hover:text-primary/80 transition-colors"
                            >
                                {showOptions ? (
                                    <>
                                        <ChevronUp className="h-3 w-3 mr-1" />
                                        Hide options
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="h-3 w-3 mr-1" />
                                        Show options ({product.options.length})
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                {/* Product options */}
                {showOptions && product.options && product.options.length > 0 && (
                    <div className="mt-3 border-t border-dashed border-primary/20 pt-2">
                        <Accordion type="single" collapsible className="w-full">
                            {product.options.map((option: ProductOption) => (
                                <AccordionItem key={option.id} value={option.id} className="border-b-0">
                                    <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline">
                                        {option.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-1 pl-2">
                                            {option.optionItems.map((item) => (
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
                            ))}
                        </Accordion>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

