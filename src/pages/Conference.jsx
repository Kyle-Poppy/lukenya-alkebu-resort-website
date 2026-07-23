import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Users, Projector, Utensils, Wifi } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";

const features = [
  {
    icon: Users,
    title: "Flexible Capacity",
    text: "Conference halls designed to comfortably accommodate small meetings or large gatherings of up to 200 guests.",
  },
  {
    icon: Projector,
    title: "Modern Presentation Equipment",
    text: "High-quality projectors, audio systems, microphones, and presentation facilities for professional events.",
  },
  {
    icon: Utensils,
    title: "Professional Catering",
    text: "Tea breaks, buffet lunches, dinners, and customized catering packages prepared by our experienced chefs.",
  },
  {
    icon: Wifi,
    title: "High-Speed Internet",
    text: "Reliable Wi-Fi connectivity throughout the conference facilities to keep your team connected.",
  },
];

const gallery = [
  "/images/conference-room/conference-room-1.jpeg",
  "/images/conference-room/conference-room-2.jpeg",
  "/images/conference-room/conference-room-3.jpeg",
];

export default function Conference() {
  const [selectedImage, setSelectedImage] = useState(null);
const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <>
      <PageHero
        title="Conference Facilities"
        subtitle="Professional meeting spaces surrounded by the beauty and tranquility of Lukenya Hills."
        image="/images/conference-room/conference-room-1.jpeg"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Conference & Meetings"
            title="Everything You Need for a Successful Event"
            subtitle="Whether you are hosting a board meeting, seminar, workshop, corporate training, or annual conference, our facilities provide the perfect environment for productive gatherings."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-burnt hover:shadow-2xl"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-burnt/10 transition-all duration-300 group-hover:bg-burnt">
                  <feature.icon
  size={30}
  className="text-burnt transition-colors duration-300 group-hover:text-white"
/>
                </div>

                <h3 className="font-heading text-xl font-bold text-navy mt-6">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground mt-4 leading-7 text-sm">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Our Venue"
            title="Conference Gallery"
            subtitle="Take a look at our modern conference facilities and event spaces."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {gallery.map((image, index) => (
  <motion.img
    key={image}
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.5,
      delay: index * 0.1,
    }}
    whileHover={{
      scale: 1.05,
      y: -8,
    }}
    onClick={() => {
      setSelectedImage(image);
      setSelectedIndex(index);
    }}
    src={image}
    alt={`Conference Hall ${index + 1}`}
    className="h-72 w-full rounded-2xl object-cover shadow-lg cursor-pointer"
  />
))}
          </div>
        </div>
      </section>

<AnimatePresence>
  {selectedImage && (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
      onClick={() => setSelectedImage(null)}
    >
      <img
        src={selectedImage}
        alt="Conference"
        className="max-w-6xl max-h-[90vh] rounded-xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        onClick={(e) => {
          e.stopPropagation();

          const newIndex =
            selectedIndex === 0
              ? gallery.length - 1
              : selectedIndex - 1;

          setSelectedIndex(newIndex);
          setSelectedImage(gallery[newIndex]);
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-burnt transition"
      >
        <ChevronLeft size={32} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();

          const newIndex =
            selectedIndex === gallery.length - 1
              ? 0
              : selectedIndex + 1;

          setSelectedIndex(newIndex);
          setSelectedImage(gallery[newIndex]);
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-burnt transition"
      >
        <ChevronRight size={32} />
      </button>

      <button
        onClick={() => setSelectedImage(null)}
        className="absolute top-6 right-6 text-white text-5xl hover:text-burnt transition"
      >
        ×
      </button>
    </div>
  )}
</AnimatePresence>

      <CTABanner
        title="Host Your Next Event at Lukenya Alkebu Resort"
        subtitle="Contact our team today to discuss conference packages, venue availability, and customized event solutions."
        buttonText="Book Your Stay"
      />
    </>
  );
}