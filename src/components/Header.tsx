import { NavLink } from "react-router-dom";
import Button from "./Button";

const navItems = [
  { label: "Work", path: "/work" },
  { label: "Contact", path: "/contact" },
  { label: "Admin", path: "/admin" },
];

export default function Header() {
  return (
    <header className="border-b border-[#e6e1e5] bg-[#fbf7fa]">
      <div className="mx-auto flex max-w-[1920px] items-center justify-between px-5 py-5 sm:px-8 lg:px-24">
        <NavLink to="/work" className="text-xl font-black tracking-[-0.03em] text-[#111827] sm:text-2xl">
          STUDIO_GALLERY
        </NavLink>

        <nav className="hidden items-center gap-7 text-lg text-[#657086] md:flex lg:gap-9">
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

        <div className="hidden xl:block">
          <Button className="rounded-xl px-7">View Reel</Button>
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
