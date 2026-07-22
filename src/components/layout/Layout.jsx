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
      <Navbar />

      <main className="flex-1">
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