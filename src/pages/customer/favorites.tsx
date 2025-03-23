"use client"

import { Heart, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CustomerFavorites() {
    // This would typically fetch from an API
    const favorites = []

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Favorite Pizzas</h1>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Favorite
                </Button>
            </div>

            {favorites.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <Heart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                    <p className="text-gray-500 mb-6">Save your favorite pizzas for quick ordering in the future!</p>
                    <Button className="bg-primary hover:bg-primary/90">Browse Menu</Button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{/* Favorites would be mapped here */}</div>
            )}
        </div>
    )
}

