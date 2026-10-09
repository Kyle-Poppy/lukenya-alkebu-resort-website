import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Loader2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Ensure environment variables are loaded correctly
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
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    if (status === "error") {
      setStatus("idle");
      setErrorMsg("");
    }
  };

  // Helper to sanitize input to prevent basic XSS and injection
  const sanitizeInput = (input) => {
    return input.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
  };

  const validateForm = () => {
    // Basic email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg("Please enter a valid email address.");
      return false;
    }
    
    // Check if required fields are not just spaces
    if (!form.name.trim() || !form.message.trim() || !form.service) {
      setErrorMsg("Please fill out all required fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "sending") return;

    // Client-side validation before attempting to send
    if (!validateForm()) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    try {
      // Sanitize inputs before sending to EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: sanitizeInput(form.name),
          from_email: sanitizeInput(form.email),
          phone: sanitizeInput(form.phone),
          service: sanitizeInput(form.service),
          message: sanitizeInput(form.message),
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
      console.error("EmailJS Error:", error);
      setErrorMsg("Failed to send the message. Please try again later.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-white p-10 shadow-xl text-center">
        <CheckCircle
          size={70}
          className="mx-auto text-green-600 mb-6"
          aria-hidden="true"
        />
        <h2 className="font-heading text-3xl font-bold text-navy">
          Thank You!
        </h2>
        <p className="mt-4 text-slate-600 leading-7">
          Your enquiry has been received successfully.
          Our reservations team will contact you shortly.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => setStatus("idle")}
            className="rounded-full bg-burnt px-8 py-3 font-semibold text-white hover:bg-burnt-light transition-colors"
          >
            Send Another Enquiry
          </button>
          <button
            onClick={() => navigate("/")}
            className="rounded-full border border-gray-300 px-8 py-3 font-semibold text-slate-700 hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </button>
        </div>
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
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-navy">
            Full Name <span className="text-red-500">*</span>
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
            maxLength={100} 
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-navy">
            Email Address <span className="text-red-500">*</span>
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
            maxLength={150}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-navy">
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
            maxLength={20}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-semibold text-navy">
            Service <span className="text-red-500">*</span>
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
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-navy">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={6}
          name="message"
          value={form.message}
          onChange={handleChange}
          maxLength={1000}
          placeholder="Tell us how we can help you..."
          className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-burnt focus:outline-none focus:ring-2 focus:ring-burnt"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-center text-red-600 font-medium">
          {errorMsg || "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-burnt py-4 font-semibold text-white transition-all hover:bg-burnt-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <Loader2 size={20} className="animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          "Send Enquiry"
        )}
      </button>
    </form>
  );
}