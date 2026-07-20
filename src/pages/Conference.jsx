import { motion } from "framer-motion";
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
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80&auto=format",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format",
];

export default function Conference() {
  return (
    <>
      <PageHero
        title="Conference Facilities"
        subtitle="Professional meeting spaces surrounded by the beauty and tranquility of Lukenya Hills."
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format"
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
                className="bg-white rounded-2xl shadow-md p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-burnt/10 flex items-center justify-center mx-auto">
                  <feature.icon className="text-burnt" size={30} />
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
                src={image}
                alt="Conference Hall"
                className="rounded-2xl shadow-lg h-72 w-full object-cover"
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Host Your Next Event at Lukenya Alkebu Resort"
        subtitle="Contact our team today to discuss conference packages, venue availability, and customized event solutions."
        buttonText="Enquire Today"
      />
    </>
  );
}