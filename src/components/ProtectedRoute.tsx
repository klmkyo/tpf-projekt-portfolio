import { Navigate, useLocation } from "react-router-dom";
import type { ReactElement } from "react";
import LoadingState from "./LoadingState";
import { useAuth } from "../hooks/useAuth";

type ProtectedRouteProps = {
  children: ReactElement;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { currentUser, isAuthReady } = useAuth();

  if (!isAuthReady) {
    return (
      <main className="min-h-screen bg-[#fbf7fa]">
        <LoadingState />
      </main>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
