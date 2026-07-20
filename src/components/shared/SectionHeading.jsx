import { motion } from "framer-motion";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
  as: Heading = "h2",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className={`mb-12 ${
        center ? "max-w-3xl mx-auto text-center" : "max-w-3xl"
      }`}
    >
      {eyebrow && (
        <p className="text-burnt uppercase tracking-[0.25em] text-sm font-semibold">
          {eyebrow}
        </p>
      )}

      <Heading className="mt-3 text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-navy leading-tight">
        {title}
      </Heading>

      {subtitle && (
        <p className="mt-5 text-base md:text-lg text-slate-600 leading-8">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}