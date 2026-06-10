import { Navigate, Route, Routes } from "react-router-dom";
import AnalyticsListener from "./components/AnalyticsListener";
import ProtectedRoute from "./components/ProtectedRoute";
import SiteLayout from "./components/SiteLayout";
import AdminPage from "./pages/AdminPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import NewProjectPage from "./pages/NewProjectPage";
import NotFoundPage from "./pages/NotFoundPage";
import WorkPage from "./pages/WorkPage";

export default function App() {
  return (
    <>
      <AnalyticsListener />
      <Routes>
        <Route path="/work" element={<Navigate to="/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<SiteLayout />}>
          <Route index element={<WorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/new"
            element={
              <ProtectedRoute>
                <NewProjectPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
