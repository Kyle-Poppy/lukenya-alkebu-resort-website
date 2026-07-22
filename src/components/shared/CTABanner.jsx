import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

export default function CTABanner({
  title,
  subtitle,
  buttonText = "Book Your Stay",
  to = "/contact",
}) {
  const { openBooking } = useBooking();

  return (
    <section className="relative overflow-hidden bg-navy py-20 px-6">

      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-burnt blur-3xl"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-white blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-cream leading-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-6 text-lg leading-8 text-cream/80">
            {subtitle}
          </p>
        )}

        <button
          onClick={openBooking}
          className="inline-flex items-center justify-center mt-10 px-8 py-4 rounded-full bg-burnt text-white font-semibold shadow-lg hover:bg-burnt-light hover:scale-105 transition-all duration-300"
        >
          {buttonText}
        </button>
      </motion.div>
    </section>
  );
}