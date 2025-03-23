import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

// Define the user type based on JWT payload
export type User = {
    CustomerId: string
    AppUserCustomerId: string
    role: string
    unique_name: string
    name: string
    nbf: number
    exp: number
    iat: number
}

// Define the auth token type
type AuthToken = {
    token: string
    expiration: string
}

// Define the context type
type AuthContextType = {
    user: User | null
    token: AuthToken | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (authToken: AuthToken) => void
    logout: () => void
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    login: () => { },
    logout: () => { },
})

// Custom hook to use the auth context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext)

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<AuthToken | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Check for existing token and user data on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token")
        console.log("Initial auth check - stored token:", storedToken ? "exists" : "none")

        if (storedToken) {
            try {
                const parsedToken = JSON.parse(storedToken) as AuthToken
                console.log("Parsed token:", parsedToken)

                // Check if token is expired
                const expirationDate = new Date(parsedToken.expiration)
                const now = new Date()
                console.log("Token expiration:", expirationDate)
                console.log("Current time:", now)
                console.log("Is token expired:", expirationDate <= now)

                if (expirationDate > now) {
                    // Token is still valid
                    setToken(parsedToken)

                    // Decode JWT to get user info
                    try {
                        const decodedToken = jwtDecode(parsedToken.token) as User
                        console.log("Decoded token:", decodedToken)
                        setUser(decodedToken)
                    } catch (decodeError) {
                        console.error("Error decoding token:", decodeError)
                        localStorage.removeItem("auth_token")
                    }
                } else {
                    // Token is expired, clear it
                    console.log("Token is expired, clearing")
                    localStorage.removeItem("auth_token")
                }
            } catch (error) {
                // If there's an error parsing the token, clear the storage
                console.error("Error parsing stored token:", error)
                localStorage.removeItem("auth_token")
            }
        }

        setIsLoading(false)
    }, [])

    // Login function
    const login = (authToken: AuthToken) => {
        console.log("Login called with token:", authToken)
        setToken(authToken)

        // Decode JWT to get user info
        try {
            const decodedToken = jwtDecode(authToken.token) as User
            console.log("Decoded user from token:", decodedToken)
            setUser(decodedToken)

            // Store in localStorage for persistence
            localStorage.setItem("auth_token", JSON.stringify(authToken))
            console.log("Token stored in localStorage")
        } catch (error) {
            console.error("Error decoding JWT token:", error)
        }
    }

    // Logout function
    const logout = () => {
        setToken(null)
        setUser(null)

        // Clear from localStorage
        localStorage.removeItem("auth_token")
    }

    // Value object that will be passed to consumers
    const value = {
        user,
        token,
        isAuthenticated: !!user, // Change this to check for user instead of token
        isLoading,
        login,
        logout,
    }

    console.log("Auth context value:", {
        user: !!value.user,
        token: !!value.token,
        isAuthenticated: value.isAuthenticated,
    })

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

