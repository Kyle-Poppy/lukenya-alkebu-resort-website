import { createContext, useContext, useState, useMemo } from "react";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);

  const closeBooking = () => setBookingOpen(false);

  // Performance: Memoize the context value to prevent unnecessary re-renders 
  // of components that consume this context.
  const value = useMemo(
    () => ({
      bookingOpen,
      openBooking,
      closeBooking,
    }),
    [bookingOpen]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBooking must be used inside BookingProvider"
    );
  }

  return context;
}