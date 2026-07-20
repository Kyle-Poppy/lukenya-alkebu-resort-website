import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import RoomCard from "@/components/accommodation/RoomCard";
import CTABanner from "@/components/shared/CTABanner";
import { rooms } from "@/lib/resortData";

export default function Accommodation() {
  return (
    <>
      <PageHero
        title="Accommodation"
        subtitle="Elegant rooms and suites designed for comfort, relaxation, and unforgettable stays."
        image="https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=1600&q=80&auto=format"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Stay With Us"
            title="Choose the Perfect Room"
            subtitle="Whether you are travelling alone, with family, or as part of a group, our accommodation offers comfort, modern amenities, and peaceful surroundings."
          />

          <div className="space-y-12">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.name}
                room={room}
                index={index}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Book Your Stay?"
        subtitle="Contact our team today to check availability, room rates, and special packages."
        buttonText="Make an Enquiry"
      />
    </>
  );
}