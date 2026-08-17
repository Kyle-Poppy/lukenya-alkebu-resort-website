import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function RoomCard({
  room,
  index = 0,
  reverse = false,
  onBook,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
      }}
      className={`overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 ${
        reverse ? "md:[&>div:first-child]:order-2" : ""
      }`}
    >
      <div className="grid md:grid-cols-2 items-center">

        <div className="relative h-[320px] md:h-[420px] lg:h-[500px] overflow-hidden bg-gray-100">

          {/* Performance: Added decoding="async" for smoother scrolling */}
          <img
            src={room.images[currentImage]}
            alt={room.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {currentImage + 1} / {room.images.length}
          </div>

          {room.images.length > 1 && (
            <>
              {/* Accessibility: Added aria-label for screen readers */}
              <button
                onClick={previousImage}
                aria-label="Previous image"
                className="select-none absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white backdrop-blur-md p-2 transition hover:bg-burnt"
              >
                <ChevronLeft size={22} aria-hidden="true" />
              </button>

              {/* Accessibility: Added aria-label for screen readers */}
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="select-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 text-white backdrop-blur-md p-2 transition hover:bg-burnt"
              >
                <ChevronRight size={22} aria-hidden="true" />
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">

                {/* Accessibility: Added aria-label to dot indicators */}
                {room.images.map((_, i) => (    
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-3 w-3 rounded-full transition ${
                      currentImage === i
                        ? "bg-white"
                        : "bg-white/40"
                    }`}
                  />

                ))}

              </div>
            </>
          )}

        </div>

        <div className="p-8 lg:p-10">

          <p className="text-sm uppercase tracking-[0.25em] text-burnt font-semibold mb-2">
            Accommodation
          </p>

          <h2 className="font-heading text-3xl font-bold text-navy">
            {room.name}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {room.description}
          </p>

          <div className="mt-6 rounded-xl bg-cream p-5">

            <h3 className="mb-4 text-lg font-bold text-burnt">
              Room Rates
            </h3>

            <div className="space-y-3 text-slate-700">

              <div className="flex justify-between">
                <span>Bed & Breakfast</span>
                <strong>KES {room.pricing.bedBreakfast.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between">
                <span>Half Board</span>
                <strong>KES {room.pricing.halfBoard.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between">
                <span>Full Board</span>
                <strong>KES {room.pricing.fullBoard.toLocaleString()}</strong>
              </div>

            </div>

          </div>

          <div className="mt-8">

            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-burnt">
              Room Features
            </h3>

            <ul className="grid gap-3 sm:grid-cols-2">

              {room.amenities.map((amenity) => (

                <li
                  key={amenity}
                  className="flex items-center gap-3 text-slate-700"
                >
                  {/* Accessibility: Hid decorative icon from screen readers */}
                  <Check
                    size={18}
                    className="text-burnt flex-shrink-0"
                    aria-hidden="true"
                  />

                  <span>{amenity}</span>

                </li>

              ))}

            </ul>

          </div>

          <button
            onClick={onBook}
            className="inline-flex items-center gap-2 mt-10 rounded-full bg-burnt px-8 py-3 font-semibold text-cream transition hover:bg-burnt-light"
          >
            Book Now
            {/* Accessibility: Hid decorative icon from screen readers */}
            <ArrowRight size={18} aria-hidden="true" />
          </button>

        </div>

      </div>
    </motion.article>
  );
}