import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/skeletons/loader.jsx";
import UseAuth from "../context/useAuth.js";


export default function AdminRoute() {
  
  const { isUser } = UseAuth();

  // If auth is still loading and there's no user, show a loader
  if (isUser.loading && !isUser.isLogin) {
    return <Loader />;
  }

  // If no user is present, redirect to login
  if (!isUser.isLogin) {
    return <Navigate to="/login" />;
  }
  if (isUser.role !== "admin") {
    return <Navigate to="/" />;
  }

  // If user is authenticated and data is ready, render the children without loader
  return <Outlet />
}