"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/plan", label: "Plan" },
  { href: "/progress", label: "Progress" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="top-nav">
      <div className="brand">
        <span className="brand-mark" />
        <span>AI Infra Study Tracker</span>
      </div>
      <div className="nav-links">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link key={link.href} href={link.href} className={active ? "active" : ""}>
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
