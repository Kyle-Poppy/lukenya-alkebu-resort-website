import { motion } from "framer-motion";
import {
  Target,
  HeartHandshake,
  Trophy,
  Trees,
} from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import CTABanner from "@/components/shared/CTABanner";

const highlights = [
  {
    icon: Target,
    title: "Goal-Oriented Activities",
    text: "Professionally planned activities that strengthen communication, leadership, and problem-solving skills while keeping every participant engaged.",
  },
  {
    icon: HeartHandshake,
    title: "Collaboration & Trust",
    text: "Interactive challenges designed to improve teamwork, build trust, and encourage stronger workplace relationships.",
  },
  {
    icon: Trophy,
    title: "Fun Competitions",
    text: "Exciting games and friendly competitions that motivate teams while creating memorable shared experiences.",
  },
  {
    icon: Trees,
    title: "Outdoor Environment",
    text: "Enjoy fresh air, beautiful scenery, and spacious grounds that provide the perfect setting for productive and enjoyable team-building events.",
  },
];

export default function TeamBuilding() {
  return (
    <>
      <PageHero
  title="Team Building"
  subtitle="Strengthen teamwork, leadership, and collaboration in the peaceful surroundings of Lukenya Hills."
  image="/images/team-building/team-building-1.jpeg"
/>

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Team Building"
            title="Build Stronger Teams Through Shared Experiences"
            subtitle="Our spacious outdoor grounds provide the ideal setting for companies, schools, organizations, and community groups to learn, collaborate, and grow together."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
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
                  <highlight.icon
  size={30}
  className="text-burnt transition-colors duration-300 group-hover:text-white"
/>
                </div>

                <h3 className="font-heading text-xl font-bold text-navy mt-6">
                  {highlight.title}
                </h3>

                <p className="text-muted-foreground mt-4 leading-7 text-sm">
                  {highlight.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.img
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            src="/images/team-building/team-building-2.jpeg"
            alt="Team Building Activities"
            className="w-full h-[450px] rounded-2xl shadow-lg object-cover"
          />

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-burnt uppercase tracking-[0.3em] text-sm font-semibold">
              Why Choose Us
            </span>

            <h2 className="font-heading text-4xl font-bold text-navy mt-4">
              Inspire Your Team Beyond the Workplace
            </h2>

            <p className="mt-6 text-muted-foreground leading-8">
              At Lukenya Alkebu Resort, we provide the perfect balance between
              structured team-building activities and relaxation. Our natural
              surroundings encourage creativity, open communication, and lasting
              connections among participants.
            </p>

            <p className="mt-5 text-muted-foreground leading-8">
              Whether you are organizing a one-day event or a multi-day retreat,
              our facilities, accommodation, catering services, and experienced
              staff help create a seamless and rewarding experience for every
              group.
            </p>
          </motion.div>
        </div>
      </section>

      <CTABanner
        title="Plan Your Next Team Building Event"
        subtitle="Contact our team today to create a customized team-building experience for your organization."
        buttonText="Book Us"
      />
    </>
  );
}