import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import CTABanner from "@/components/shared/CTABanner";

export default function Contact() {
  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="We would love to help you plan your next visit."
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80&auto=format"
      />

      <section className="py-24 px-4 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-burnt font-semibold tracking-widest uppercase text-xs">
              Get In Touch
            </span>

            <h2 className="font-heading text-4xl font-bold text-navy mt-3">
              We're Here to Help
            </h2>

            <p className="text-muted-foreground mt-5 leading-relaxed">
              Whether you're planning a family holiday, corporate conference,
              church retreat, or team building event, our team is ready to help
              you choose the perfect package.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14">
            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6">

                <div className="flex gap-4 p-6 rounded-xl bg-white shadow-sm">
                  <MapPin className="text-burnt shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">
                      Visit Us
                    </h3>
                    <p className="text-muted-foreground mt-2">
                      Lukenya Alkebu Resort,
                      <br />
                      Lukenya Motocross Road, Malkiel Street,
                      <br />
                      Athi River, Machakos County.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-6 rounded-xl bg-white shadow-sm">
  <Phone className="text-burnt shrink-0 mt-1" size={24} />
  <div>
    <h3 className="font-heading text-lg font-bold text-navy">
      Call Us
    </h3>

    <p className="text-muted-foreground mt-2">
      <a
        href="tel:+254703841682"
        className="hover:text-burnt"
      >
        0703 841 682
      </a>

      <br />

      <a
        href="tel:+254731796683"
        className="hover:text-burnt"
      >
        0731 796 683
      </a>
    </p>
  </div>
</div>

                <div className="flex gap-4 p-6 rounded-xl bg-white shadow-sm">
  <Mail className="text-burnt shrink-0 mt-1" size={24} />
  <div>
    <h3 className="font-heading text-lg font-bold text-navy">
      Email
    </h3>

    <p className="text-muted-foreground mt-2">
      <a
        href="mailto:lukenyaalkeburesort2019@gmail.com"
        className="hover:text-burnt break-all"
      >
        lukenyaalkeburesort2019@gmail.com
      </a>
    </p>
  </div>
</div>

                <div className="flex gap-4 p-6 rounded-xl bg-white shadow-sm">
                  <Clock className="text-burnt shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-heading text-lg font-bold text-navy">
                      Office Hours
                    </h3>

                    <p className="text-muted-foreground mt-2">
                      Monday to Sunday
                      <br />
                      8:00 AM to 5:00 PM
                    </p>

                    <p className="text-muted-foreground mt-3">
                      We normally respond to enquiries within 24 hours.
                    </p>
                  </div>
                </div>

              </div>

              <div className="rounded-xl overflow-hidden shadow-lg h-80 mt-10">
  <iframe
    title="Lukenya Alkebu Resort Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.539754072558!2d37.0352447!3d-1.4505552999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f75082602e99b%3A0xa85af0376768ed8a!2sLukenya%20Alkebu%20Resort!5e0!3m2!1sen!2ske!4v1784538202555!5m2!1sen!2ske"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="strict-origin-when-cross-origin"
  />
</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Experience Lukenya Alkebu?"
        subtitle="Reach out today and let us help you plan a memorable stay."
      />
    </div>
  );
}