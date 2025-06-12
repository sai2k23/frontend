// src/components/ProtectedRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);
  //const [checkingAuth, setCheckingAuth] = useState(true);
  if (user === null) {
    return <div className="p-6 text-center">Checking authentication...</div>;
  }
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
