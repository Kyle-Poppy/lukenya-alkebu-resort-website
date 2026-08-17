import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import { testimonials } from "@/lib/resortData";

export default function Testimonials() {
  return (
    <section className="bg-cream py-24 px-6" aria-label="Guest Testimonials">
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          eyebrow="Guest Experiences"
          title="What Our Guests Say"
          subtitle="Our guests return for the peaceful atmosphere, exceptional hospitality, and memorable experiences."
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all"
            >

              {/* Accessibility: Hide decorative quote icon */}
              <Quote
                size={34}
                className="text-burnt mb-5"
                aria-hidden="true"
              />

              {/* Accessibility: Group stars into a single readable rating for screen readers */}
              <div 
                className="flex gap-1 mb-5" 
                role="img" 
                aria-label="5 out of 5 stars"
              >
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-burnt text-burnt"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Semantic HTML: Use blockquote for actual citations */}
              <blockquote className="italic leading-8 text-slate-600">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-8 border-t pt-5">

                <h3 className="font-heading text-lg font-bold text-navy">
                  {testimonial.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {testimonial.role}
                </p>

              </div>

            </motion.article>
          ))}

        </div>

      </div>
    </section>
  );
}