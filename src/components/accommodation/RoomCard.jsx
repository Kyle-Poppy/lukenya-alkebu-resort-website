import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export default function RoomCard({
  room,
  index = 0,
  reverse = false,
}) {
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
      <div className="grid items-center md:grid-cols-2">

        <div className="overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            loading="lazy"
            className="h-80 w-full object-cover transition-transform duration-700 hover:scale-110 md:h-full"
          />
        </div>

        <div className="p-8 lg:p-10">

          <h2 className="font-heading text-3xl font-bold text-navy">
            {room.name}
          </h2>

          <p className="mt-5 leading-8 text-slate-600">
            {room.description}
          </p>

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

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 mt-10 rounded-full bg-burnt px-8 py-3 font-semibold text-cream transition-all duration-300 hover:bg-burnt-light hover:gap-3"
          >
            Book Now
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </motion.article>
  );
}