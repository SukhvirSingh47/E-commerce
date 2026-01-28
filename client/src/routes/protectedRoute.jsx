import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../api/auth.api";

export default function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getMe(); 
        setAuthorized(true);
      } catch (err) {
        console.error("Auth failed:", err);
        localStorage.removeItem("token");
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-lg">
        Checking authentication...
      </div>
    );
  }

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
