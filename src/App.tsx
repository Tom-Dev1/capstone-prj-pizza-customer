import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import router from "@/routes/router"
import "./index.css"
import { ProfileProvider } from "./contexts/ProfileContext"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </ProfileProvider>
    </AuthProvider>

  )
}

export default App
