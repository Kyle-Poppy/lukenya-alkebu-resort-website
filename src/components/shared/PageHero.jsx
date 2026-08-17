import { motion } from "framer-motion";

export default function PageHero({
  title,
  subtitle,
  image,
  height = "h-[55vh]",
}) {
  return (
    <section
      aria-labelledby="page-hero-title"
      className={`relative ${height} min-h-[400px] flex items-center justify-center overflow-hidden`}
    >
      {/* Performance: Added fetchpriority="high" to optimize Largest Contentful Paint (LCP) */}
      <img
        src={image}
        alt={title}
        loading="eager"
        fetchpriority="high"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover select-none"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/60 to-navy/80" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 px-6 text-center max-w-4xl"
      >
        {/* Accessibility: Linked ID to the section's aria-labelledby */}
        <h1 id="page-hero-title" className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-cream leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 text-lg md:text-xl leading-8 text-cream/90">
            {subtitle}
          </p>
        )}
      </motion.div>
    </section>
  );
}