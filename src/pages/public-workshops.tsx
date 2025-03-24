"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { workshopService, type Workshop, WorkshopStatus } from "@/services/workshop-service"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Calendar, Loader2, MapPin, Users } from "lucide-react"
import WorkshopComponent from "./components/WorkshopComponent"
import WorkshopRegistrationForm from "./components/WorkshopRegistrationForm"

export default function PublicWorkshops() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [workshops, setWorkshops] = useState<Workshop[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [totalCount, setTotalCount] = useState(0)
    const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null)
    const [isRegistrationFormOpen, setIsRegistrationFormOpen] = useState(false)

    // Fetch workshops on component mount
    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
                setIsLoading(true)
                const response = await workshopService.getAllWorkshops()
                if (response.success && response.result) {
                    // Store the total count
                    setTotalCount(response.result.totalCount)

                    // Check if items exists and is an array
                    if (Array.isArray(response.result.items)) {
                        // Only show workshops with "Scheduled" status
                        const scheduledWorkshops = response.result.items.filter(
                            (workshop) =>
                                workshop.workshopStatus === WorkshopStatus.Scheduled ||
                                workshop.workshopStatus === WorkshopStatus.Opening,
                        )
                        setWorkshops(scheduledWorkshops)
                    } else {
                        // If items is not an array, set empty array and log error
                        console.error("Unexpected response format:", response.result)
                        setWorkshops([])
                        setError("Received invalid data format from server")
                    }
                } else {
                    setError(response.message || "Failed to fetch workshops")
                }
            } catch (err) {
                setError("An error occurred while fetching workshops")
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchWorkshops()
    }, [])

    // Handle workshop registration
    const handleRegisterClick = (workshop: Workshop) => {
        if (!isAuthenticated) {
            // Redirect to login if not authenticated
            navigate("/auth/login", { state: { from: "/workshops" } })
            return
        }

        // Open registration form
        setSelectedWorkshop(workshop)
        setIsRegistrationFormOpen(true)
    }

    return (
        <>
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Upcoming Pizza Workshops</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover our scheduled pizza-making workshops and plan your culinary adventure. Learn authentic techniques
                        from our master chefs in a fun, interactive environment.
                    </p>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        <span className="ml-2">Loading workshops...</span>
                    </div>
                )}

                {/* Error State */}
                {error && !isLoading && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && !error && workshops.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-8 text-center">
                        <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No scheduled workshops</h3>
                        <p className="text-gray-500 mb-6">
                            We don't have any scheduled workshops at the moment. Please check back later for upcoming events.
                        </p>
                    </div>
                )}

                {/* Workshops List */}
                {!isLoading && !error && workshops.length > 0 && (
                    <>
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Showing {workshops.length} scheduled workshops (Total workshops: {totalCount})
                            </p>
                        </div>

                        {/* Featured Workshop (if available) */}
                        {workshops.length > 0 && (
                            <div className="mb-10 bg-primary/5 p-6 rounded-xl border border-primary/20">
                                <h2 className="text-2xl font-bold mb-4">Featured Workshop</h2>
                                <div className="grid md:grid-cols-2 gap-6 items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-2">{workshops[0].name}</h3>
                                        <p className="mb-4">{workshops[0].description}</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <Calendar className="h-5 w-5 text-primary mr-2" />
                                                <span>
                                                    {new Date(workshops[0].workshopDate).toLocaleDateString("en-US", {
                                                        weekday: "long",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <MapPin className="h-5 w-5 text-primary mr-2" />
                                                <span>
                                                    {workshops[0].location} (Zone: {workshops[0].zoneName})
                                                </span>
                                            </div>
                                            <div className="flex items-center">
                                                <Users className="h-5 w-5 text-primary mr-2" />
                                                <span>Max {workshops[0].maxParticipantPerRegister} participants per registration</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xs">
                                            <div className="text-center mb-4">
                                                <span className="text-3xl font-bold text-primary">
                                                    {workshops[0].totalFee.toLocaleString()} VND
                                                </span>
                                                <p className="text-gray-500">per person</p>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4 text-center">
                                                Registration opens on {new Date(workshops[0].startRegisterDate).toLocaleDateString()}
                                            </p>
                                            {isAuthenticated ? (
                                                <Button className="w-full" onClick={() => handleRegisterClick(workshops[0])}>
                                                    Register Now
                                                </Button>
                                            ) : (
                                                <Button asChild className="w-full">
                                                    <Link to="/auth/login">Sign In to Register</Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-6">
                            {workshops.map((workshop) => (
                                <WorkshopComponent
                                    key={workshop.id}
                                    workshop={workshop}
                                    onRegister={handleRegisterClick}
                                    isAuthenticated={isAuthenticated}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Call to Action */}
                {!isAuthenticated && (
                    <div className="mt-12 bg-primary/10 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Want to Join Our Workshops?</h2>
                        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                            Create an account to be notified when registration opens for our scheduled workshops. Members get early
                            access and special discounts!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link to="/auth/login">Sign In</Link>
                            </Button>
                            <Button asChild variant="outline">
                                <Link to="/auth/register">Create Account</Link>
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Registration Form Dialog */}
            {selectedWorkshop && (
                <WorkshopRegistrationForm
                    workshop={selectedWorkshop}
                    isOpen={isRegistrationFormOpen}
                    onClose={() => {
                        setIsRegistrationFormOpen(false)
                        setSelectedWorkshop(null)
                    }}
                />
            )}
        </>
    )
}

