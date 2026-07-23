import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";
import { galleryImages } from "@/lib/resortData";

const categories = [
  "All",
  "Rooms",
  "Conference",
  "Cuisine",
  "Nature",
  "Team Building",
  "Retreats",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (image) => image.category === activeCategory
        );

  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImage(null);
      }

      if (e.key === "ArrowRight") {
        const newIndex =
          selectedIndex === filteredImages.length - 1
            ? 0
            : selectedIndex + 1;

        setSelectedIndex(newIndex);
        setSelectedImage(filteredImages[newIndex]);
      }

      if (e.key === "ArrowLeft") {
        const newIndex =
          selectedIndex === 0
            ? filteredImages.length - 1
            : selectedIndex - 1;

        setSelectedIndex(newIndex);
        setSelectedImage(filteredImages[newIndex]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, selectedIndex, filteredImages]);

  useEffect(() => {
  if (selectedImage) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }

  return () => {
    document.body.style.overflow = "";
  };
}, [selectedImage]);

  return (
    <>
      <PageHero
        title="Gallery"
        subtitle="Take a closer look at the beauty, comfort, and experiences waiting for you at Lukenya Alkebu Resort."
        image="/images/field/field-2.jpeg"
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
                onClick={() => {
    setSelectedImage(image);
    setSelectedIndex(index);
  }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (index % 6) * 0.08,
                }}
                whileHover={{ y: -6 }}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
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
       
      <AnimatePresence>
      {selectedImage && (
  <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.25 }}
  className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
  onClick={() => setSelectedImage(null)}
>
    <motion.img
  key={selectedImage.src}
  src={selectedImage.src}
  alt={selectedImage.category}
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.3 }}
  className="max-w-6xl max-h-[90vh] rounded-xl shadow-2xl"
  onClick={(e) => e.stopPropagation()}
/>

    <button
  onClick={(e) => {
    e.stopPropagation();

    const newIndex =
      selectedIndex === 0
        ? filteredImages.length - 1
        : selectedIndex - 1;

    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  }}
  className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white hover:bg-burnt transition"
>
  <ChevronLeft size={32} />
</button>

<button
  onClick={(e) => {
    e.stopPropagation();

    const newIndex =
      selectedIndex === filteredImages.length - 1
        ? 0
        : selectedIndex + 1;

    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
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
  </motion.div>
)}
</AnimatePresence>

      <CTABanner
        title="Experience Lukenya Alkebu in Person"
        subtitle="The photos are only the beginning. Visit us and create unforgettable memories."
        buttonText="Make an Enquiry"
      />
    </>
  );
}