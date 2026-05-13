import { Navigate, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { currentUser, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#fbf7fa] text-xs font-bold uppercase tracking-[0.35em] text-[#718096]">
        Loading access
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
