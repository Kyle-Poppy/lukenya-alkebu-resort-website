import { motion } from "framer-motion";
import { useState } from "react";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";
import BookingModal from "@/components/booking/BookingModal";

const retreatTypes = [
  {
    title: "Corporate Retreats",
    text: "Take your team away from the busy office environment and into a peaceful setting designed for planning, collaboration, leadership development, and relaxation. Our retreat packages combine comfortable accommodation with conference facilities and outdoor activities.",
    image: "/images/retreat/retreat-1.jpeg",
  },
  {
    title: "Church Retreats",
    text: "Enjoy a quiet environment for prayer, worship, Bible study, fellowship, and spiritual renewal. Our gardens and open spaces provide the ideal atmosphere for meaningful gatherings and reflection.",
    image: "/images/retreat/retreat-2.jpeg",
  },
  {
    title: "School Retreats",
    text: "Create memorable educational experiences for students through leadership camps, mentorship programs, educational workshops, and outdoor learning activities in a safe and inspiring environment.",
    image: "/images/retreat/retreat-3.jpeg",
  },
  {
    title: "Family Retreats",
    text: "Reconnect with loved ones through peaceful family getaways, outdoor activities, quality accommodation, and beautiful natural surroundings suitable for guests of all ages.",
    image: "/images/retreat/retreat-4.jpeg",
  },
];

export default function Retreats() {

  const [bookingOpen, setBookingOpen] = useState(false);
const [selectedRetreat, setSelectedRetreat] = useState("");

  return (
    <>
      <PageHero
  title="Retreats"
  subtitle="Discover peaceful spaces for renewal, learning, teamwork, and spiritual growth."
  image="/images/field/field-2.jpeg"
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
  className="w-full h-96 object-cover rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl"
/>

                <div>
  <span className="text-burnt uppercase tracking-[0.3em] text-sm font-semibold">
    Retreat Package
  </span>

  <h2 className="mt-4 font-heading text-4xl font-bold text-navy">
    {retreat.title}
  </h2>

  <p className="mt-6 text-muted-foreground leading-8">
    {retreat.text}
  </p>

  <button
  onClick={() => {
  setSelectedRetreat(retreat.title.replace("Retreats", "Retreat"));
  setBookingOpen(true);
}}
  className="mt-8 rounded-full bg-burnt px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-burnt-light hover:scale-105"
>
  Book This Retreat
</button>
</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BookingModal
  isOpen={bookingOpen}
  onClose={() => setBookingOpen(false)}
  selectedRoom={selectedRetreat}
/>

      <CTABanner
        title="Start Planning Your Retreat"
        subtitle="Our team is ready to help you organize a memorable retreat tailored to your group's needs."
        buttonText="Book Your Retreat"
      />
    </>
  );
}