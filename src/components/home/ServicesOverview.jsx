import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { services } from "@/lib/resortData";

export default function ServicesOverview() {
  return (
    <section className="bg-cream py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          eyebrow="What We Offer"
          title="Everything for Your Perfect Stay"
          subtitle="From luxurious accommodation to conferences, retreats, team building, and family experiences, discover everything Lukenya Alkebu Resort has to offer."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all"
            >

              <div className="overflow-hidden">

                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-60 object-cover transition-transform duration-500 hover:scale-110"
                />

              </div>

              <div className="p-6">

                <h3 className="text-2xl font-heading font-bold text-navy">
                  {service.title}
                </h3>

                <p className="mt-4 text-slate-600 leading-7">
                  {service.description}
                </p>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 mt-6 text-burnt font-semibold hover:gap-3 transition-all"
                >
                  Learn More
                  <ArrowRight size={18} />
                </Link>

              </div>

            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
}