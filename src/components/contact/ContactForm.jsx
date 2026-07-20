import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle } from "lucide-react";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const services = [
  "Accommodation",
  "Conferencing",
  "Corporate Retreat",
  "Church Retreat",
  "Team Building",
  "Family Outing",
  "Other",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (status === "error") {
      setStatus("idle");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "sending") return;

    setStatus("sending");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          phone: form.phone.trim(),
          service: form.service,
          message: form.message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-xl text-center">

        <CheckCircle
          size={70}
          className="mx-auto text-green-600 mb-6"
        />

        <h2 className="font-heading text-3xl font-bold text-navy">
          Thank You!
        </h2>

        <p className="mt-4 text-slate-600 leading-7">
          Your enquiry has been received successfully.
          Our reservations team will contact you shortly.
        </p>

        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded-full bg-burnt px-8 py-3 font-semibold text-white hover:bg-burnt-light transition-colors"
        >
          Send Another Enquiry
        </button>

      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white p-8 shadow-xl space-y-6"
    >

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-navy"
          >
            Full Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="John Doe"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-navy"
          >
            Email Address
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          />
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-navy"
          >
            Phone Number
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+254 712 345 678"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          />
        </div>

        <div>
          <label
            htmlFor="service"
            className="mb-2 block text-sm font-semibold text-navy"
          >
            Service
          </label>

          <select
            id="service"
            required
            name="service"
            value={form.service}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          >
            <option value="">Select a Service</option>

            {services.map((service) => (
              <option
                key={service}
                value={service}
              >
                {service}
              </option>
            ))}

          </select>
        </div>

      </div>

      <div>

        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-navy"
        >
          Message
        </label>

        <textarea
          id="message"
          required
          rows={6}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can help you..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
        />

      </div>

      {status === "error" && (
        <p className="text-center text-red-600">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-burnt py-4 font-semibold text-white transition-all hover:bg-burnt-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2
              size={20}
              className="animate-spin"
            />
            Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>

    </form>
  );
}