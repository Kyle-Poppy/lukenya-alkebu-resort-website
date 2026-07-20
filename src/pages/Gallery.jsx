import { useState } from "react";
import { motion } from "framer-motion";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";
import { galleryImages } from "@/lib/resortData";

const categories = [
  "All",
  "Rooms",
  "Pool",
  "Conference",
  "Nature",
  "Team Building",
  "Family",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (image) => image.category === activeCategory
        );

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Take a closer look at the beauty, comfort, and experiences waiting for you at Lukenya Alkebu Resort."
        image="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80&auto=format"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Photo Gallery"
            title="Explore Our Resort"
            subtitle="Browse through our accommodation, conference facilities, natural surroundings, and memorable guest experiences."
          />

          <div className="flex flex-wrap justify-center gap-4 mb-14">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-burnt text-cream shadow-lg"
                    : "bg-white text-navy hover:bg-navy hover:text-cream"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <motion.div
                key={`${image.src}-${index}`}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (index % 6) * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-2xl shadow-lg group"
              >
                <img
                  src={image.src}
                  alt={image.category}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6">
                    <span className="inline-block bg-burnt text-cream text-xs px-3 py-1 rounded-full">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Experience Lukenya Alkebu in Person"
        subtitle="The photos are only the beginning. Visit us and create unforgettable memories."
        buttonText="Make an Enquiry"
      />
    </>
  );
}