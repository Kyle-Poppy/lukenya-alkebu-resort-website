import { Outlet } from "react-router-dom";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import BookingModal from "@/components/booking/BookingModal";

import { BookingProvider, useBooking } from "@/context/BookingContext";

function LayoutContent() {
  const { bookingOpen, closeBooking } = useBooking();

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Accessibility: Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-burnt focus:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burnt"
      >
        Skip to main content
      </a>

      <Navbar />

      {/* Semantic HTML: id added for the skip link target */}
      <main id="main-content" className="flex-1" tabIndex="-1">
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />

      <BookingModal
        isOpen={bookingOpen}
        onClose={closeBooking}
      />
    </div>
  );
}

export default function Layout() {
  return (
    <BookingProvider>
      <LayoutContent />
    </BookingProvider>
  );
}