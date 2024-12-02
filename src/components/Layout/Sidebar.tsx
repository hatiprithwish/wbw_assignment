import {
  BadgePercent,
  FileBox,
  Home,
  Package,
  ScrollText,
  Settings,
  Store,
  TicketPercent,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "../../lib/tailwind";

const navLinks = [
  {
    icon: <Home strokeWidth={1.6} width={20} height={20} />,
    href: "/",
    label: "Home",
  },
  {
    icon: <Store strokeWidth={1.6} width={20} height={20} />,
    href: "/stores",
    label: "Stores",
  },
  {
    icon: <Package strokeWidth={1.6} width={20} height={20} />,
    href: "/products",
    label: "Products",
  },
  {
    icon: <TicketPercent strokeWidth={1.6} width={20} height={20} />,
    href: "/catalogue",
    label: "Catalogue",
  },
  {
    icon: <BadgePercent strokeWidth={1.6} width={20} height={20} />,
    href: "/promotions",
    label: "Promotions",
  },
  {
    icon: <FileBox strokeWidth={1.6} width={20} height={20} />,
    href: "/reports",
    label: "Reports",
  },
  {
    icon: <ScrollText strokeWidth={1.6} width={20} height={20} />,
    href: "/docs",
    label: "Docs",
  },
  {
    icon: <Settings strokeWidth={1.6} width={20} height={20} />,
    href: "/settings",
    label: "Settings",
  },
];

export function Sidebar() {
  const { pathname } = useLocation();

  return (
    <div className="w-64 h-screen flex flex-col gap-6 border-r-2 border-[#00000014] p-6">
      <img src="/logo.png" width={116} height={48} alt="logo" />

      <div className="flex-1 space-y-2 border-t-2 pt-8 border-[#00000014]">
        {navLinks.map((item, i) => (
          <Link
            key={i}
            to={item.href}
            className={cn(
              "flex gap-2 items-center px-4 py-1 rounded-md transition-all",
              pathname === item.href
                ? "bg-sky-50 text-sky-500"
                : "hover:bg-gray-100"
            )}
          >
            {item.icon} <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
