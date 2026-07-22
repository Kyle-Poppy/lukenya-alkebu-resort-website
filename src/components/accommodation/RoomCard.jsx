import { useState } from "react";
import BookingModal from "@/components/booking/BookingModal";
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
}) {

  const [currentImage, setCurrentImage] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);

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

        <div className="relative h-[420px] overflow-hidden">

          <img
            src={room.images[currentImage]}
            alt={room.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-all duration-500"
          />

          {room.images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="select-none absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white backdrop-blur-sm p-2 shadow hover:bg-white"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextImage}
                className="select-none absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white backdrop-blur-sm p-2 shadow hover:bg-white"
              >
                <ChevronRight size={22} />
              </button>

              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">

                {room.images.map((_, i) => (

                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
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

          <h2 className="font-heading text-3xl font-bold text-navy">
            {room.name}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {room.description}
          </p>

          <div className="mt-6 rounded-xl bg-cream p-5">

            <h3 className="font-semibold text-burnt mb-3">
              Room Rates
            </h3>

            <div className="space-y-2 text-slate-700">

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
                  <Check
                    size={18}
                    className="text-burnt flex-shrink-0"
                  />

                  <span>{amenity}</span>

                </li>

              ))}

            </ul>

          </div>

          <button
  onClick={() => setBookingOpen(true)}
  className="inline-flex items-center gap-2 mt-10 rounded-full bg-burnt px-8 py-3 font-semibold text-cream transition hover:bg-burnt-light"
>
  Book Now
  <ArrowRight size={18} />
</button>

        </div>

      </div>

<BookingModal
  isOpen={bookingOpen}
  onClose={() => setBookingOpen(false)}
  selectedRoom={room.name}
/>

    </motion.article>
  );
}