import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function SiteLayout() {
  return (
    <div className="min-h-screen bg-[#fbf7fa]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
