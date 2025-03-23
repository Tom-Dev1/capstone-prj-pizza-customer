import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-8 text-center">The page you are looking for doesn't exist or has been moved.</p>
            <div className="space-x-4">
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link to="/">Go Home</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to="/customer/dashboard">Dashboard</Link>
                </Button>
            </div>
        </div>
    )
}

