import Hero from "@/components/home/Hero";
import ServicesOverview from "@/components/home/ServicesOverview";
import FeaturedRooms from "@/components/home/FeaturedRooms";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/shared/CTABanner";

export default function Home() {
  // Schema.org structured data for homepage resort discoverability
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Lukenya Alkebu Resort",
    "description": "A peaceful resort destination near Lukenya Hills offering accommodation, conferencing, corporate retreats, church retreats, and team building facilities.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Athi River",
      "addressRegion": "Machakos County",
      "addressCountry": "KE"
    },
    "url": "https://lukenyaalkeburesort.com"
  };

  return (
    /* Semantic HTML: Wrapped page content in a main landmark */
    <main>
      {/* Schema.org Injection for SEO & AI Discoverability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      <Hero />
      <ServicesOverview />
      <FeaturedRooms />
      <Testimonials />
      <CTABanner
        title="Ready to Plan Your Getaway?"
        subtitle="Whether it's a family outing, corporate retreat, or church fellowship — we'd love to host you."
      />
    </main>
  );
}