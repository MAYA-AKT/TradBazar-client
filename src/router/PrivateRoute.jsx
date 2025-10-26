import { useLocation } from "react-router"
import useAuth from "../hooks/useAuth"


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <p>Loading...</p>
  if (user) return children
  return <Navigate to='/login' state={{ from: location }} replace='true' />
}

export default PrivateRoute
