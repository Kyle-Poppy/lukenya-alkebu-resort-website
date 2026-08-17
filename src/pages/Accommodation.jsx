import { useState } from "react";
import PageHero from "@/components/shared/PageHero";
import SectionHeading from "@/components/shared/SectionHeading";
import RoomCard from "@/components/accommodation/RoomCard";
import CTABanner from "@/components/shared/CTABanner";
import BookingModal from "@/components/booking/BookingModal";
import { rooms } from "@/lib/resortData";

export default function Accommodation() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState("");

  // Schema.org structured data for hotel rooms to improve AI and search discoverability
  const roomsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": rooms.map((room, index) => ({
      "@type": "HotelRoom",
      "position": index + 1,
      "name": room.name,
      "description": room.description,
      "bed": {
        "@type": "BedDetails",
        "numberOfBeds": 1,
        "typeOfBed": room.amenities[0]
      },
      "amenityFeature": room.amenities.map(amenity => ({
        "@type": "LocationFeatureSpecification",
        "name": amenity,
        "value": true
      })),
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "KES",
        "lowPrice": room.pricing.bedBreakfast,
        "highPrice": room.pricing.fullBoard
      }
    }))
  };

  const handleBookRoom = (roomName) => {
    setSelectedRoom(roomName);
    setBookingOpen(true);
  };

  return (
    /* Semantic HTML: Wrapped page content in a main landmark */
    <main>
      {/* Schema.org Injection for SEO & AI Discoverability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(roomsSchema) }}
      />

      <PageHero
        title="Accommodation"
        subtitle="Elegant rooms and suites designed for comfort, relaxation, and unforgettable stays."
        image="/images/deluxe/deluxe-1.jpeg"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Stay With Us"
            title="Choose the Perfect Room"
            subtitle="Choose from our Deluxe, Deluxe Twin, Superior, and Executive rooms, each thoughtfully designed to provide comfort, privacy, and exceptional value for every guest."
          />

          <div className="space-y-12">
            {rooms.map((room, index) => (
              <RoomCard
                key={room.name}
                room={room}
                index={index}
                reverse={index % 2 === 1}
                onBook={() => handleBookRoom(room.name)}
              />
            ))}
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        selectedRoom={selectedRoom}
      />

      <CTABanner
        title="Ready to Book Your Stay?"
        subtitle="Contact our team today to check availability, room rates, and special packages."
        buttonText="Book Your Stay"
        onButtonClick={() => handleBookRoom("General Booking")}
      />
    </main>
  );
}