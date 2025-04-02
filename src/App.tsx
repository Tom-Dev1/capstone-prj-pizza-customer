import { RouterProvider } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import router from "@/routes/router"
import "./index.css"
import { ProfileProvider } from "./contexts/ProfileContext"
import "react-toastify/dist/ReactToastify.css"

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual"
}
function App() {
  return (
    <AuthProvider>
      <ProfileProvider>

        <RouterProvider router={router} />
      </ProfileProvider>
    </AuthProvider>

  )
}

export default App
