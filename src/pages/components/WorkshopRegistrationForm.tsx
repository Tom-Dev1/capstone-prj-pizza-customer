"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import {
    workshopService,
    type Workshop,
    type WorkshopRegistration,
    type ProductSelection
} from "@/services/workshop-service"
import { productService, type Product } from "@/services/product-service"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, AlertCircle, Check } from 'lucide-react'
import { toast } from "react-toastify"

interface WorkshopRegistrationFormProps {
    workshop: Workshop
    isOpen: boolean
    onClose: () => void
}

export default function WorkshopRegistrationForm({
    workshop,
    isOpen,
    onClose
}: WorkshopRegistrationFormProps) {
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [totalParticipants, setTotalParticipants] = useState(1)
    const [selectedProducts, setSelectedProducts] = useState<Map<string, Set<string>>>(new Map())
    const [productDetails, setProductDetails] = useState<Map<string, Product>>(new Map())

    // Fetch product details for all workshop food options
    useEffect(() => {
        const fetchProductDetails = async () => {
            if (!workshop || !workshop.workshopFoodDetails.length) return

            setIsLoading(true)
            setError(null)

            try {
                const productMap = new Map<string, Product>()
                const productSelections = new Map<string, Set<string>>()

                // Fetch details for each product
                for (const food of workshop.workshopFoodDetails) {
                    try {
                        const response = await productService.getProductById(food.productId)
                        if (response.success && response.result) {
                            productMap.set(food.productId, response.result)
                            productSelections.set(food.productId, new Set<string>())
                        }
                    } catch (err) {
                        console.error(`Error fetching product ${food.productId}:`, err)
                    }
                }

                setProductDetails(productMap)
                setSelectedProducts(productSelections)
            } catch (err) {
                console.error("Error fetching product details:", err)
                setError("Failed to load product details")
            } finally {
                setIsLoading(false)
            }
        }

        if (isOpen) {
            fetchProductDetails()
        }
    }, [workshop, isOpen])

    // Toggle product selection
    const toggleProductSelection = (productId: string) => {
        const updatedSelections = new Map(selectedProducts)

        if (updatedSelections.has(productId)) {
            // If already selected, remove it
            updatedSelections.delete(productId)
        } else {
            // If not selected, add it with empty options
            updatedSelections.set(productId, new Set<string>())
        }

        setSelectedProducts(updatedSelections)
    }

    // Toggle option item selection
    const toggleOptionItem = (productId: string, optionItemId: string) => {
        const updatedSelections = new Map(selectedProducts)
        const productOptions = updatedSelections.get(productId) || new Set<string>()

        if (productOptions.has(optionItemId)) {
            productOptions.delete(optionItemId)
        } else {
            productOptions.add(optionItemId)
        }

        updatedSelections.set(productId, productOptions)
        setSelectedProducts(updatedSelections)
    }

    // Check if a product is selected
    const isProductSelected = (productId: string): boolean => {
        return selectedProducts.has(productId)
    }

    // Check if an option item is selected
    const isOptionItemSelected = (productId: string, optionItemId: string): boolean => {
        const productOptions = selectedProducts.get(productId)
        return productOptions ? productOptions.has(optionItemId) : false
    }

    // Handle form submission
    const handleSubmit = async () => {
        if (!user?.CustomerId) {
            setError("User information not found. Please log in again.")
            return
        }

        setIsSubmitting(true)
        setError(null)
        setSuccess(null)

        try {
            // Prepare products array for submission
            const products: ProductSelection[] = []

            selectedProducts.forEach((optionItems, productId) => {
                products.push({
                    productId,
                    optionItemIds: Array.from(optionItems)
                })
            })

            // Prepare registration data
            const registrationData: WorkshopRegistration = {
                customerId: user.CustomerId,
                workshopId: workshop.id,
                totalParticipant: totalParticipants,
                products
            }

            console.log("Submitting registration data:", registrationData)

            // Submit registration
            const response = await workshopService.workShopRegistration(registrationData)

            if (response.success) {
                setSuccess("Workshop registration successful!")
                toast.success("You have successfully registered for the workshop!")

                // Close dialog after a short delay
                setTimeout(() => {
                    onClose()
                }, 2000)
            } else {
                setError(response.message || "Registration failed")
            }
        } catch (err) {
            console.error("Registration error:", err)
            setError("An error occurred during registration")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Register for Workshop</DialogTitle>
                    <DialogDescription>
                        Complete your registration for "{workshop.name}"
                    </DialogDescription>
                </DialogHeader>

                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
                        <span>Loading product options...</span>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                ) : (
                    <>
                        {success && (
                            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md flex items-start mb-4">
                                <Check className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                                <p>{success}</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Participant Information */}
                            <div>
                                <Label htmlFor="totalParticipants">Number of Participants</Label>
                                <Input
                                    id="totalParticipants"
                                    type="number"
                                    min={1}
                                    max={workshop.maxParticipantPerRegister}
                                    value={totalParticipants}
                                    onChange={(e) => setTotalParticipants(parseInt(e.target.value) || 1)}
                                    className="mt-1"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Maximum {workshop.maxParticipantPerRegister} participants per registration
                                </p>
                            </div>

                            {/* Product Selection */}
                            <div>
                                <Label className="block mb-2">Select Products</Label>
                                <div className="space-y-3 max-h-60 overflow-y-auto p-2 border rounded-md">
                                    {workshop.workshopFoodDetails.map((food) => {
                                        const product = productDetails.get(food.productId)
                                        if (!product) return null

                                        return (
                                            <div key={food.id} className="border p-3 rounded-md">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="font-medium">{food.name}</div>
                                                        <div className="text-sm text-gray-600">{food.price.toLocaleString()} VND</div>
                                                    </div>
                                                    <Checkbox
                                                        id={`product-${food.id}`}
                                                        checked={isProductSelected(food.productId)}
                                                        onCheckedChange={() => toggleProductSelection(food.productId)}
                                                    />
                                                </div>

                                                {isProductSelected(food.productId) && product.options && product.options.length > 0 && (
                                                    <div className="mt-2 pl-4 border-t pt-2">
                                                        <p className="text-sm font-medium mb-1">Options:</p>
                                                        {product.options.map((option) => (
                                                            <div key={option.id} className="mb-2">
                                                                <p className="text-sm">{option.name}</p>
                                                                <div className="pl-2 space-y-1">
                                                                    {option.optionItems.map((item) => (
                                                                        <div key={item.id} className="flex items-center justify-between">
                                                                            <div className="flex items-center">
                                                                                <Checkbox
                                                                                    id={`option-${item.id}`}
                                                                                    checked={isOptionItemSelected(food.productId, item.id)}
                                                                                    onCheckedChange={() => toggleOptionItem(food.productId, item.id)}
                                                                                />
                                                                                <Label htmlFor={`option-${item.id}`} className="ml-2 text-sm">
                                                                                    {item.name}
                                                                                </Label>
                                                                            </div>
                                                                            {item.additionalPrice > 0 && (
                                                                                <span className="text-xs text-primary">
                                                                                    +{item.additionalPrice.toLocaleString()} VND
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading || isSubmitting}
                        className="bg-primary hover:bg-primary/90"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            "Complete Registration"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
