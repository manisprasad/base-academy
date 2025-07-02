import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Loading from "./loading/Loading";

const GuestOnlyRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (user?.userId) {
    // User is already logged in → redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  // User is NOT logged in → allow access to login/signup
  return <Outlet />;
};

export default GuestOnlyRoute;
