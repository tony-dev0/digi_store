import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function AdminPrivateRoute() {
  const { currentUser } = useSelector((state: any) => state.user);

  if (!currentUser) {
    return <Navigate to="/admin/login" />;
  }

  if (currentUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
