"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar, MapPin, Users, Phone, Clock, DollarSign, Pizza } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Workshop } from "@/services/workshop-service"
import { Link } from "react-router-dom"
import ProductDetails from "./ProductDetail"

// Status color mapping
const statusColorMap: Record<string, string> = {
    Scheduled: "bg-blue-500",
    Opening: "bg-green-500",
    Closed: "bg-gray-500",
    Approved: "bg-purple-500",
    Cancelled: "bg-red-500",
}

interface WorkshopProps {
    workshop: Workshop
    onRegister?: (workshop: Workshop) => void
    isAuthenticated?: boolean
}

export default function WorkshopComponent({ workshop, onRegister, isAuthenticated = false }: WorkshopProps) {
    const [isExpanded, setIsExpanded] = useState(false)

    // Format dates for display
    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "PPP")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Invalid date:", dateString)
            return "Invalid date"
        }
    }

    const formatDateTime = (dateString: string) => {
        try {
            return format(new Date(dateString), "PPP p")
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Invalid date:", dateString)
            return "Invalid date"
        }
    }

    // Handle register button click
    const handleRegisterClick = () => {
        if (onRegister) {
            onRegister(workshop)
        }
    }

    return (
        <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl font-bold">{workshop.name}</CardTitle>
                        <CardDescription className="mt-1">{workshop.header}</CardDescription>
                    </div>
                    <Badge className={`${statusColorMap[workshop.workshopStatus] || "bg-gray-500"} text-white`}>
                        {workshop.workshopStatus}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="pb-3">
                <div className="space-y-3">
                    <div className="flex items-start">
                        <Calendar className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Workshop Date</p>
                            <p className="text-sm text-gray-600">{formatDateTime(workshop.workshopDate)}</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Location</p>
                            <p className="text-sm text-gray-600">{workshop.location}</p>
                            <p className="text-sm text-gray-600">Zone: {workshop.zoneName}</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <Users className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Capacity</p>
                            <p className="text-sm text-gray-600">
                                Max Participants: {workshop.maxParticipantPerRegister} per registration (Total: {workshop.maxRegister})
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <DollarSign className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Fee</p>
                            <p className="text-sm text-gray-600">{workshop.totalFee.toLocaleString()} VND</p>
                        </div>
                    </div>

                    {isExpanded && (
                        <>
                            <div className="flex items-start">
                                <Clock className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">Registration Period</p>
                                    <p className="text-sm text-gray-600">
                                        From {formatDate(workshop.startRegisterDate)} to {formatDate(workshop.endRegisterDate)}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <Phone className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">Contact</p>
                                    <p className="text-sm text-gray-600">
                                        {workshop.organizer} - {workshop.hotLineContact}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="font-medium mb-1">Description</p>
                                <p className="text-sm text-gray-600">{workshop.description}</p>
                            </div>

                            {workshop.workshopFoodDetails.length > 0 && (
                                <div>
                                    <p className="font-medium mb-1 flex items-center">
                                        <Pizza className="h-4 w-4 mr-1" /> Available Food Options
                                    </p>
                                    <ul className="text-sm text-gray-600 space-y-1 mt-2">
                                        {workshop.workshopFoodDetails.map((food) => (
                                            <li key={food.id}>
                                                <div className="flex justify-between mb-1">
                                                    <span>{food.name}</span>
                                                    <span>{food.price.toLocaleString()} VND</span>
                                                </div>
                                                <ProductDetails productId={food.productId} />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
                <Button variant="outline" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Show Less" : "Show More"}
                </Button>

                {isAuthenticated ? (
                    <Button className="bg-primary hover:bg-primary/90" onClick={handleRegisterClick}>
                        Register Now
                    </Button>
                ) : (
                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link to="/auth/login?redirect=workshops">Sign In to Register</Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

