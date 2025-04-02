"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export default function CustomerDashboard() {
    const { user } = useAuth()
    console.log(user?.CustomerId);

    return (
        <div className="">
            <main className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Username</p>
                            <p className="font-medium">{user?.unique_name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Customer ID</p>
                            <p className="font-medium">{user?.CustomerId}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Name</p>
                            <p className="font-medium">{user?.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Role</p>
                            <p className="font-medium">{user?.role}</p>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-3">My Orders</h3>
                        <p className="text-gray-600 mb-4">View and track your pizza orders</p>
                        <Link to="/customer/orders">
                            <Button className="w-full bg-primary hover:bg-primary/90">View Orders</Button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-3">Favorite Pizzas</h3>
                        <p className="text-gray-600 mb-4">Your saved favorite pizza combinations</p>
                        <Link to="/customer/favorites">
                            <Button className="w-full bg-primary hover:bg-primary/90">View Favorites</Button>
                        </Link>
                    </div>

                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold mb-3">Workshop Bookings</h3>
                        <p className="text-gray-600 mb-4">Manage your pizza workshop reservations</p>
                        <Link to="/customer/workshops">
                            <Button className="w-full bg-primary hover:bg-primary/90">View Bookings</Button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

