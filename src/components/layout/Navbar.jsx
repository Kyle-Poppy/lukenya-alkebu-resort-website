import { useState, useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/resortData";
import { useBooking } from "@/context/BookingContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const { openBooking } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-navy/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src="/images/logo.png"
            alt="Lukenya Alkebu Resort"
            className="h-20 w-20 rounded-full object-cover bg-white p-1 shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-burnt"
                    : "text-cream hover:text-burnt"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <button
            onClick={openBooking}
            className="rounded-full bg-burnt px-6 py-3 font-semibold text-cream transition-colors duration-300 hover:bg-burnt-light"
          >
            Book Now
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-cream"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <nav className="border-t border-white/10 bg-navy">
          <div className="flex flex-col py-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-6 py-4 text-base transition-colors ${
                    isActive
                      ? "text-burnt"
                      : "text-cream hover:text-burnt"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="px-6 pt-5">
              <button
                onClick={() => {
                  setOpen(false);
                  openBooking();
                }}
                className="block w-full rounded-full bg-burnt py-3 text-center font-semibold text-cream transition-colors duration-300 hover:bg-burnt-light"
              >
                Book Now
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}