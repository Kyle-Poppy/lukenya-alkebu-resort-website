import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/shared/CTABanner";

export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesOverview />
      <FeaturedRooms />
      <Testimonials />
      <CTABanner
        title="Ready to Plan Your Getaway?"
        subtitle="Whether it's a family outing, corporate retreat, or church fellowship — we'd love to host you."
      />
    </div>
  );
}