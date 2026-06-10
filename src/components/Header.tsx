import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useSiteContent } from "../contexts/site-content-store";
import { useAuth } from "../hooks/useAuth";

export default function Header() {
  const { content, isContentReady } = useSiteContent();
  const { currentUser, logout } = useAuth();

  if (!isContentReady) {
    return (
      <header className="border-b border-[#e6e1e5] bg-[#fbf7fa]">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-5 py-5 sm:px-8 lg:px-24">
          <span className="text-xl font-black tracking-[-0.03em] text-[#111827] sm:text-2xl">
            STUDIO_GALLERY
          </span>
          <div
            aria-hidden="true"
            className="h-5 w-5 rounded-full border border-[#cfd3da] p-0.5"
          >
            <span className="block h-full w-full animate-spin rounded-full border-2 border-transparent border-t-[#111827]" />
          </div>
        </div>
      </header>
    );
  }

  if (!content) {
    return (
      <header className="border-b border-[#e6e1e5] bg-[#fbf7fa]">
        <div className="mx-auto flex max-w-[1920px] items-center justify-between px-5 py-5 sm:px-8 lg:px-24">
          <span className="text-xl font-black tracking-[-0.03em] text-[#111827] sm:text-2xl">
            STUDIO_GALLERY
          </span>
        </div>
      </header>
    );
  }

  const siteContent = content;
  const navItems = [
    { label: siteContent.navigation.work, path: "/" },
    { label: siteContent.navigation.contact, path: "/contact" },
  ];

  return (
    <header className="border-b border-[#e6e1e5] bg-[#fbf7fa]">
      <div className="mx-auto grid max-w-[1920px] grid-cols-[1fr_auto_1fr] items-center px-5 py-5 sm:px-8 lg:px-24">
        <div className="justify-self-start">
          <NavLink
            to="/"
            className="text-xl font-black tracking-[-0.03em] text-[#111827] sm:text-2xl"
          >
            {siteContent.brandName}
          </NavLink>
        </div>

        <nav className="hidden items-center gap-7 justify-self-center text-lg text-[#657086] md:flex lg:gap-9">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `border-b-2 pb-2 transition ${
                  isActive
                    ? "border-[#111827] text-[#111827]"
                    : "border-transparent hover:text-[#111827]"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex min-h-11 justify-self-end justify-end">
          {currentUser && (
            <Button className="hidden rounded-xl px-7 xl:inline-flex" onClick={() => void logout()} type="button">
              Sign Out
            </Button>
          )}
        </div>
      </div>

      <nav className="flex items-center justify-center gap-6 border-t border-[#e6e1e5] px-5 py-4 text-sm text-[#657086] md:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? "font-bold text-[#111827]" : undefined)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
