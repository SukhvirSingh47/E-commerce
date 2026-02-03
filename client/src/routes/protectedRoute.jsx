import { Navigate, Outlet } from "react-router-dom";
import UserDashboardSkeleton from "../components/skeletons/UserDashboardSkeleton.jsx";
import UseAuth from "../context/useAuth.js";

export default function ProtectedRoute() {
  
  const { isUser } = UseAuth();

  // If auth is still loading and there's no user, show a loader
  if (isUser.loading && !isUser.isLogin) {
    return <UserDashboardSkeleton />;
  }

  // If no user is present, redirect to login
  if (!isUser.isLogin) {
    return <Navigate to="/login" />;
  }

  // If user is authenticated and data is ready, render the children without loader
  return <Outlet />;
}
