import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { rooms } from "@/lib/resortData";

export default function FeaturedRooms() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          eyebrow="Accommodation"
          title="Rest in Comfort and Style"
          subtitle="Experience elegant rooms designed for comfort, relaxation, and unforgettable stays surrounded by nature."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {rooms.map((room, index) => (
            <motion.article
              key={room.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-2xl bg-cream shadow-lg hover:shadow-2xl transition-shadow"
            >

              <div className="overflow-hidden">

                <img
  src={room.images[0]}
  alt={room.name}
  loading="lazy"
  className="w-full h-56 object-cover object-center transition-transform duration-500 hover:scale-110"
/>

              </div>

              <div className="p-6">

                <h3 className="text-xl font-heading font-bold text-navy">
                  {room.name}
                </h3>

                <p className="mt-2 text-burnt font-semibold">
  From KES {room.pricing.bedBreakfast.toLocaleString()} / Night
</p>

                <p className="mt-3 text-slate-600 leading-7">
                  {room.description}
                </p>

                {room.amenities && (
                  <ul className="mt-5 space-y-2">

                    {room.amenities.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="text-sm text-slate-600"
                      >
                        • {item}
                      </li>
                    ))}

                  </ul>
                )}

              </div>

            </motion.article>
          ))}

        </div>

        <div className="mt-14 text-center">

          <Link
            to="/accommodation"
            className="inline-flex items-center gap-2 rounded-full border-2 border-navy px-8 py-4 font-semibold text-navy transition-all duration-300 hover:bg-navy hover:text-white"
          >
            View All Rooms
            <ArrowRight size={18} />
          </Link>

        </div>

      </div>
    </section>
  );
}