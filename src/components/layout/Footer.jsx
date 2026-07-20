import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { navLinks } from "@/lib/resortData";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link
              to="/"
              className="font-heading text-3xl font-bold"
            >
              Lukenya <span className="text-burnt">Alkebu</span>
            </Link>

            <p className="mt-5 text-sm leading-7 text-cream/75">
              Experience comfort, nature, exceptional hospitality, conference
              facilities, retreats, family outings, and memorable team building
              experiences in the peaceful surroundings of Lukenya Hills.
            </p>

            <div className="mt-6 flex gap-5">

              <a
                href="#"
                aria-label="Facebook"
                className="text-cream/70 transition-all duration-300 hover:text-burnt hover:-translate-y-1"
              >
                <Facebook size={22} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="text-cream/70 transition-all duration-300 hover:text-burnt hover:-translate-y-1"
              >
                <Instagram size={22} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="text-cream/70 transition-all duration-300 hover:text-burnt hover:-translate-y-1"
              >
                <Twitter size={22} />
              </a>

            </div>

            <Link
              to="/contact"
              className="inline-block mt-8 rounded-full bg-burnt px-6 py-3 font-semibold transition-colors duration-300 hover:bg-burnt-light"
            >
              Book an Enquiry
            </Link>
          </div>

          <div>

            <h3 className="font-heading text-xl font-bold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/75 transition-colors duration-300 hover:text-burnt"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

            </ul>

          </div>

          <div>

            <h3 className="font-heading text-xl font-bold mb-5">
              Contact
            </h3>

            <ul className="space-y-5 text-sm">

              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="mt-1 shrink-0 text-burnt"
                />
                <span className="text-cream/75">
                  Lukenya Alkebu Resort,
                  <br />
                  Lukenya Hills
                  <br />
                  Machakos County, Kenya
                </span>
              </li>

              <li className="flex items-center gap-3">
                <Phone
                  size={18}
                  className="shrink-0 text-burnt"
                />
                <a
                  href="tel:+254700000000"
                  className="text-cream/75 transition-colors duration-300 hover:text-burnt"
                >
                  +254 700 000 000
                </a>
              </li>

              <li className="flex items-center gap-3">
                <Mail
                  size={18}
                  className="shrink-0 text-burnt"
                />
                <a
                  href="mailto:info@lukenyaalkebu.com"
                  className="text-cream/75 transition-colors duration-300 hover:text-burnt"
                >
                  info@lukenyaalkebu.com
                </a>
              </li>

            </ul>

          </div>

          <div>

            <h3 className="font-heading text-xl font-bold mb-5">
              Opening Hours
            </h3>

            <div className="flex items-start gap-3">

              <Clock
                size={18}
                className="mt-1 shrink-0 text-burnt"
              />

              <div className="space-y-2 text-sm text-cream/75">
                <p>Open 24 Hours</p>
                <p>Reception Available Daily</p>
                <p>Check-in: 2:00 PM</p>
                <p>Check-out: 10:00 AM</p>
              </div>

            </div>

          </div>

        </div>

        <div className="mt-14 border-t border-white/10 pt-8 text-center text-sm text-cream/60">

          <p>
            © {new Date().getFullYear()} Lukenya Alkebu Resort. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}