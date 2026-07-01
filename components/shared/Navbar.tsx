"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, X, Car } from "lucide-react";

const links = [
  { href: "/cars", label: "Browse Cars" },
  { href: "/cars?category=suv", label: "SUVs" },
  { href: "/cars?category=luxury", label: "Luxury" },
  { href: "/cars?category=electric", label: "Electric" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1440px] mx-auto px-6 sm:px-16 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary-blue rounded-lg p-1.5">
            <Car className="w-5 h-5 text-white" />
          </div>
          <span className={`text-xl font-extrabold ${scrolled || !isHome ? "text-black-100" : "text-white"}`}>
            Dinga<span className="text-primary-blue"> Rentals</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm font-semibold transition-colors hover:text-primary-blue ${
                  scrolled || !isHome ? "text-black-100" : "text-white/90"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth */}
        <div className="hidden md:flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <Link href="/sign-in" className={`text-sm font-semibold transition-colors hover:text-primary-blue ${scrolled || !isHome ? "text-black-100" : "text-white/90"}`}>Sign In</Link>
              <Link href="/sign-up" className="bg-primary-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary-blue/90 transition-colors">Get Started</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className={`text-sm font-semibold transition-colors hover:text-primary-blue ${scrolled || !isHome ? "text-black-100" : "text-white/90"}`}>Dashboard</Link>
              <UserButton />
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden ${scrolled || !isHome ? "text-black-100" : "text-white"}`}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-100">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-black-100 font-semibold text-sm"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-gray-100 flex flex-col gap-3">
              {!isSignedIn ? (
                <>
                  <Link href="/sign-in" className="text-black-100 font-semibold text-sm" onClick={() => setOpen(false)}>Sign In</Link>
                  <Link href="/sign-up" className="bg-primary-blue text-white text-sm font-semibold px-5 py-2.5 rounded-full text-center" onClick={() => setOpen(false)}>Get Started</Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard" className="text-black-100 font-semibold text-sm" onClick={() => setOpen(false)}>Dashboard</Link>
                  <div className="flex items-center gap-2"><UserButton /><span className="text-sm text-grey">My Account</span></div>
                </>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
