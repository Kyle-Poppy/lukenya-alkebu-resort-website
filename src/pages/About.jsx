import { motion } from "framer-motion";
import { 
  HeartHandshake, 
  Leaf, 
  Star, 
  Sparkles, 
  UtensilsCrossed, 
  Scale, 
  TrendingUp, 
  Eye, 
  Target 
} from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";

// 1. Updated Core Values Array based on client requirements
const values = [
  {
    icon: HeartHandshake,
    title: "Warm Hospitality",
    text: "We welcome every guest with kindness, care, and genuine attention so they feel at home and part of the family.",
  },
  {
    icon: Leaf,
    title: "Serenity & Rest",
    text: "We protect a calm, quiet, and refreshing environment where guests can relax, recharge, and escape everyday noise.",
  },
  {
    icon: Star,
    title: "Excellence in Service",
    text: "We deliver timely, professional, high-quality service in every interaction, from reception to departure.",
  },
  {
    icon: Sparkles,
    title: "Cleanliness & Care",
    text: "We keep every room, space, and facility clean, orderly, and well maintained.",
  },
  {
    icon: UtensilsCrossed,
    title: "Memorable Experiences",
    text: "We create delightful meals, comfortable stays, and special moments that go beyond expectations.",
  },
  {
    icon: Scale,
    title: "Integrity & Value",
    text: "We offer fair value for money and serve with honesty, transparency, and consistency.",
  },
  {
    icon: TrendingUp,
    title: "Continuous Improvement",
    text: "We listen to our guests and keep improving our facilities, services, signage, and access so we are easy to find and a joy to return to.",
  },
];

export default function About() {
  return (
    <main>
      <PageHero
        title="About Lukenya Alkebu Resort"
        subtitle="Where nature, comfort, and premium hospitality come together in Athi River."
        image="/images/field/field-2.jpeg"
      />

      {/* 2. Added Vision and Mission Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-cream p-10 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-burnt/10 text-burnt">
                <Eye size={28} />
              </div>
              <h2 className="font-heading text-3xl font-bold text-navy">Our Vision</h2>
            </div>
            <p className="text-muted-foreground leading-8 text-lg">
              To be a cherished hidden gem of excellence: a serene, welcoming retreat where every guest finds rest, warmth, and hospitality worth returning for.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl bg-navy p-10 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
                <Target size={28} />
              </div>
              <h2 className="font-heading text-3xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-gray-300 leading-8 text-lg">
              To refresh every guest through genuine hospitality, excellent service, clean and well-kept surroundings, and memorable dining, in a peaceful setting that is easy to reach, fair in value, and always improving through our guests' feedback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Original Story Section - Optimized for SEO */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/images/about.jpeg"
              alt="Lukenya Alkebu Resort scenic view in Athi River"
              loading="lazy"
              decoding="async"
              className="rounded-2xl shadow-xl w-full h-[600px] object-cover object-center"
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
              Lukenya Alkebu Resort is a premium destination located near the scenic Lukenya Hills in Athi River. We provide a relaxing environment for families, corporate organizations, churches, schools, and holiday travellers looking for quality accommodation and memorable experiences.
            </p>

            <p className="mt-5 text-muted-foreground leading-8">
              Our facilities include modern guest rooms, conference halls, beautiful gardens, outdoor recreation areas, team building grounds, and spaces designed for retreats and special events. Every visit is built around comfort, excellent service, and a peaceful atmosphere.
            </p>
            
            <div className="mt-8 grid grid-cols-3 gap-4">
              <img
                src="/images/food/food-8.jpeg"
                alt="Dining and culinary experience at Lukenya Alkebu Resort"
                loading="lazy"
                decoding="async"
                className="h-32 w-full rounded-xl object-cover shadow-md hover:scale-105 transition"
              />
              <img
                src="/images/field/field-2.jpeg"
                alt="Open outdoor grounds at Lukenya Resort"
                loading="lazy"
                decoding="async"
                className="h-32 w-full rounded-xl object-cover shadow-md hover:scale-105 transition"
              />
              <img
                src="/images/retreat/retreat-4.jpeg"
                alt="Peaceful nature environment at Lukenya"
                loading="lazy"
                decoding="async"
                className="h-32 w-full rounded-xl object-cover shadow-md hover:scale-105 transition"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. Updated Core Values Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Core Values"
            title="The Principles That Guide Us"
            subtitle="Everything we do is built on a foundation of hospitality, excellence, and care."
          />

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-burnt hover:shadow-xl"
              >
                <div 
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-burnt/10 transition-all duration-300 group-hover:bg-burnt"
                  aria-hidden="true"
                >
                  <value.icon
                    size={30}
                    className="text-burnt transition-colors duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="font-heading text-xl font-bold text-navy mt-6">
                  {value.title}
                </h3>

                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {value.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Plan Your Visit Today"
        subtitle="Whether you are planning a holiday, conference, retreat, or family getaway, we are ready to welcome you."
      />
    </main>
  );
}