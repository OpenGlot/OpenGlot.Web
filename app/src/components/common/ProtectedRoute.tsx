import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { authState } = useAuth();

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
