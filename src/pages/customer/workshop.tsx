"use client"

import { Calendar, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CustomerWorkshops() {
    // This would typically fetch from an API
    const workshops = []

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Workshop Bookings</h1>
                <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Book Workshop
                </Button>
            </div>

            {workshops.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No workshop bookings</h3>
                    <p className="text-gray-500 mb-6">Join our pizza-making workshops to learn from our master chefs!</p>
                    <Button className="bg-primary hover:bg-primary/90">View Available Workshops</Button>
                </div>
            ) : (
                <div className="space-y-4">{/* Workshops would be mapped here */}</div>
            )}
        </div>
    )
}

