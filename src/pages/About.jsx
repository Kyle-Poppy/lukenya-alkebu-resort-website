import { motion } from "framer-motion";
import { Leaf, Heart, Users } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";

const values = [
  {
    icon: Leaf,
    title: "Nature",
    text: "Surrounded by the beautiful Lukenya Hills, our resort offers fresh air, open landscapes, and peaceful gardens that help every guest reconnect with nature.",
  },
  {
    icon: Heart,
    title: "Hospitality",
    text: "We believe every guest deserves warm service, comfortable accommodation, and an unforgettable experience from arrival to departure.",
  },
  {
    icon: Users,
    title: "Community",
    text: "Families, churches, schools, companies, and organizations all find a welcoming environment designed for learning, relaxation, and meaningful connections.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        title="About Lukenya Alkebu Resort"
        subtitle="Where nature, comfort, and hospitality come together."
        image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&q=80&auto=format"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1000&q=80&auto=format"
              alt="Lukenya Alkebu Resort"
              className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-burnt uppercase tracking-[0.3em] text-sm font-semibold">
              Our Story
            </span>

            <h2 className="font-heading text-4xl font-bold text-navy mt-4">
              Experience Comfort in the Heart of Lukenya Hills
            </h2>

            <p className="mt-6 text-muted-foreground leading-8">
              Lukenya Alkebu Resort is a peaceful destination located near the
              scenic Lukenya Hills. We provide a relaxing environment for
              families, corporate organizations, churches, schools, and holiday
              travellers looking for quality accommodation and memorable
              experiences.
            </p>

            <p className="mt-5 text-muted-foreground leading-8">
              Our facilities include modern guest rooms, conference halls,
              beautiful gardens, outdoor recreation areas, team building
              grounds, and spaces designed for retreats and special events.
              Every visit is built around comfort, excellent service, and a
              peaceful atmosphere.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Values"
            title="What Makes Us Different"
            subtitle="Everything we do is guided by these core principles."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="bg-cream rounded-2xl p-8 shadow-md text-center"
              >
                <div className="w-16 h-16 rounded-full bg-burnt/10 flex items-center justify-center mx-auto">
                  <value.icon className="text-burnt" size={30} />
                </div>

                <h3 className="font-heading text-2xl font-bold text-navy mt-6">
                  {value.title}
                </h3>

                <p className="text-muted-foreground mt-4 leading-7">
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Plan Your Visit Today"
        subtitle="Whether you are planning a holiday, conference, retreat, or family getaway, we are ready to welcome you."
      />
    </>
  );
}