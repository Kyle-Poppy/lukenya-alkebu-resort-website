import { motion } from "framer-motion";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";

const retreatTypes = [
  {
    title: "Corporate Retreats",
    text: "Take your team away from the busy office environment and into a peaceful setting designed for planning, collaboration, leadership development, and relaxation. Our retreat packages combine comfortable accommodation with conference facilities and outdoor activities.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000&q=80&auto=format",
  },
  {
    title: "Church Retreats",
    text: "Enjoy a quiet environment for prayer, worship, Bible study, fellowship, and spiritual renewal. Our gardens and open spaces provide the ideal atmosphere for meaningful gatherings and reflection.",
    image:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1000&q=80&auto=format",
  },
  {
    title: "School Retreats",
    text: "Create memorable educational experiences for students through leadership camps, mentorship programs, educational workshops, and outdoor learning activities in a safe and inspiring environment.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1000&q=80&auto=format",
  },
  {
    title: "Family Retreats",
    text: "Reconnect with loved ones through peaceful family getaways, outdoor activities, quality accommodation, and beautiful natural surroundings suitable for guests of all ages.",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1000&q=80&auto=format",
  },
];

export default function Retreats() {
  return (
    <>
      <PageHero
        title="Retreats"
        subtitle="Discover peaceful spaces for renewal, learning, teamwork, and spiritual growth."
        image="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=1600&q=80&auto=format"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Retreat Packages"
            title="Retreat Experiences for Every Group"
            subtitle="Whether you are organizing a corporate retreat, church fellowship, school camp, or family getaway, Lukenya Alkebu Resort provides the perfect setting for unforgettable experiences."
          />

          <div className="space-y-16">
            {retreatTypes.map((retreat, index) => (
              <motion.div
                key={retreat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "lg:[&>img]:order-2" : ""
                }`}
              >
                <img
                  src={retreat.image}
                  alt={retreat.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />

                <div>
                  <h2 className="font-heading text-3xl font-bold text-navy">
                    {retreat.title}
                  </h2>

                  <p className="mt-5 text-muted-foreground leading-8">
                    {retreat.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Start Planning Your Retreat"
        subtitle="Our team is ready to help you organize a memorable retreat tailored to your group's needs."
        buttonText="Make an Enquiry"
      />
    </>
  );
}