"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { CustomerProfile } from "@/types/customer"
import { customerService } from "@/services/customer-service"

// Define the context type
type ProfileContextType = {
    profile: CustomerProfile | null
    isVerified: boolean
    isLoadingProfile: boolean
    error: string | null
    fetchProfile: () => Promise<void>
    refetchProfile: () => Promise<void>
}

// Create the context with default values
const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    isVerified: false,
    isLoadingProfile: true,
    error: null,
    fetchProfile: async () => { },
    refetchProfile: async () => { },
})

// Custom hook to use the profile context
// eslint-disable-next-line react-refresh/only-export-components
export const useProfile = () => useContext(ProfileContext)

// Provider component
export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated } = useAuth()
    const [profile, setProfile] = useState<CustomerProfile | null>(null)
    const [isLoadingProfile, setIsLoadingProfile] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [lastFetchTime, setLastFetchTime] = useState<number>(0)

    // Computed property for verification status
    const isVerified = profile?.isVerifiedEmail || false

    // Function to fetch user profile
    const fetchProfile = async () => {
        // Skip if no user or CustomerId
        if (!user?.CustomerId) return

        try {
            setIsLoadingProfile(true)
            setError(null)

            console.log("Fetching profile for CustomerId:", user.CustomerId)
            const response = await customerService.getCustomerId(user.CustomerId)

            if (response.success && response.result) {
                console.log("Profile fetched successfully:", response.result)
                setProfile(response.result)
                setLastFetchTime(Date.now())
            } else {
                console.error("Failed to fetch profile:", response.message)
                setError(response.message || "Failed to load profile")
            }
        } catch (err) {
            console.error("Error fetching profile:", err)
            setError("An error occurred while loading your profile")
        } finally {
            setIsLoadingProfile(false)
        }
    }

    // Function to force refetch profile
    const refetchProfile = async () => {
        setLastFetchTime(0) // Reset last fetch time to force a new fetch
        await fetchProfile()
    }

    // Fetch profile when user changes or after verification
    useEffect(() => {
        if (isAuthenticated && user?.CustomerId) {
            // Only fetch if we don't have a profile or it's been more than 5 minutes
            const shouldFetch = !profile || Date.now() - lastFetchTime > 5 * 60 * 1000

            if (shouldFetch) {
                fetchProfile()
            }
        } else {
            // Reset profile when user logs out
            setProfile(null)
        }
    }, [isAuthenticated, user, lastFetchTime])

    // Value object that will be passed to consumers
    const value = {
        profile,
        isVerified,
        isLoadingProfile,
        error,
        fetchProfile,
        refetchProfile,
    }

    return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
}

