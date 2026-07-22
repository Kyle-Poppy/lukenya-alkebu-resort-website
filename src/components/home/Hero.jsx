import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export default function Hero() {
  const { openBooking } = useBooking();

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">

      <img
        src="/images/hero.jpg"
        alt="Lukenya Alkebu Resort"
        loading="eager"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />

      <div className="absolute inset-0 bg-black/20" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <p className="text-burnt uppercase tracking-[0.3em] text-sm font-semibold">
          Lukenya Hills • Nairobi, Kenya
        </p>

        <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-cream leading-tight">
          Escape Into Nature.
          <br />
          Stay In Comfort.
        </h1>

        <p className="mt-8 text-lg md:text-xl text-cream/90 max-w-3xl mx-auto leading-8">
          Experience premium accommodation, conference facilities,
          corporate retreats, church retreats, team building activities,
          and memorable family getaways at Lukenya Alkebu Resort.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          <button
            onClick={openBooking}
            className="px-8 py-4 rounded-full bg-burnt text-white font-semibold hover:bg-burnt-light transition-all duration-300"
          >
            Book Your Stay
          </button>

          <Link
            to="/gallery"
            className="px-8 py-4 rounded-full border border-white/40 text-cream hover:bg-white/10 transition-all duration-300"
          >
            Explore Resort
          </Link>

        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-4">

          <span className="bg-white/10 backdrop-blur-sm text-cream px-4 py-2 rounded-full text-sm">
            Accommodation
          </span>

          <span className="bg-white/10 backdrop-blur-sm text-cream px-4 py-2 rounded-full text-sm">
            Conferences
          </span>

          <span className="bg-white/10 backdrop-blur-sm text-cream px-4 py-2 rounded-full text-sm">
            Retreats
          </span>

          <span className="bg-white/10 backdrop-blur-sm text-cream px-4 py-2 rounded-full text-sm">
            Team Building
          </span>

        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream/70 animate-bounce">
        ↓
      </div>

    </section>
  );
}