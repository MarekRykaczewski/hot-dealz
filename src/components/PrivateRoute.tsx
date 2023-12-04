import { UserAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const { user } = UserAuth();

  return user ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
