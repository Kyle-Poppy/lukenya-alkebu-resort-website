import { useState, useEffect } from "react";
import { X } from "lucide-react";
import emailjs from "@emailjs/browser";
import ReservationStatusModal from "@/components/shared/ReservationStatusModal";

export default function BookingModal({ isOpen, onClose, selectedRoom = "", }) {
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const [statusData, setStatusData] = useState({
    success: true,
    title: "",
    message: "",
    buttonText: "",
  });
  const [reservationType, setReservationType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",

    reservationType: "",

    roomCategory: "",
    rooms: "1",
    checkIn: "",
    checkOut: "",
    adults: "2",
    children: "0",

    conferenceType: "",
    eventDate: "",
    guests: "",
    duration: "",

    campingArrival: "",
    campingDeparture: "",
    campers: "",
    campingPackage: "",

    activities: [],
    activityDate: "",
    participants: "",

    specialEvent: "",
    eventGuests: "",
    eventDescription: "",

    additionalRequests: "",
    preferredContact: "WhatsApp",
  });

  useEffect(() => {
    if (!isOpen || !selectedRoom) return;

    // Check if the selected room matches an accommodation category
    const accommodationRooms = [
      "Deluxe Room",
      "Deluxe Twin Room",
      "Superior Room",
      "Executive Room"
    ];

    if (accommodationRooms.includes(selectedRoom) || selectedRoom.toLowerCase().includes("room")) {
      setReservationType("Accommodation");
      setFormData((prev) => ({
        ...prev,
        roomCategory: selectedRoom,
      }));
    } else {
      setReservationType("Conference & Retreats");
      setFormData((prev) => ({
        ...prev,
        conferenceType: selectedRoom,
      }));
    }
  }, [isOpen, selectedRoom]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleActivityChange = (activity) => {
    setFormData((prev) => {
      const exists = prev.activities.includes(activity);

      return {
        ...prev,
        activities: exists
          ? prev.activities.filter((item) => item !== activity)
          : [...prev.activities, activity],
      };
    });
  };

  const validateForm = () => {

    if (!formData.firstName.trim()) {
      alert("Please enter your first name.");
      return false;
    }

    if (!formData.lastName.trim()) {
      alert("Please enter your last name.");
      return false;
    }

    if (!formData.phone.trim()) {
      alert("Please enter your phone number.");
      return false;
    }

    const phoneRegex = /^(?:\+254|254|0)(7\d{8}|1\d{8})$/;

    if (!phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
      alert(
        "Please enter a valid Kenyan phone number.\nExample: 0703841682 or +254703841682"
      );
      return false;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email.trim())) {
      alert("Please enter a valid email address.");
      return false;
    }

    if (!reservationType) {
      alert("Please choose a reservation type.");
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (reservationType === "Accommodation") {
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);

      if (checkIn < today) {
        alert("Check-in date cannot be in the past.");
        return false;
      }

      if (checkOut <= checkIn) {
        alert("Check-out date must be after the check-in date.");
        return false;
      }
    }

    if (
      ["Conference & Retreats", "Team Building", "Activities", "Special Events"].includes(reservationType)
    ) {
      const eventDate = new Date(formData.eventDate || formData.activityDate);

      if (eventDate < today) {
        alert("The selected date cannot be in the past.");
        return false;
      }
    }

    if (reservationType === "Camping") {
      const arrival = new Date(formData.campingArrival);
      const departure = new Date(formData.campingDeparture);

      if (arrival < today) {
        alert("Arrival date cannot be in the past.");
        return false;
      }

      if (departure <= arrival) {
        alert("Departure date must be after the arrival date.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    let reservationDetails = "";

    switch (reservationType) {

      case "Accommodation":
        reservationDetails = `
Room Category: ${formData.roomCategory}
Rooms: ${formData.rooms}
Check In: ${formData.checkIn}
Check Out: ${formData.checkOut}
Adults: ${formData.adults}
Children: ${formData.children}
`;
        break;

      case "Conference & Retreats":
        reservationDetails = `
Booking Type: ${formData.conferenceType}
Event Date: ${formData.eventDate}
Guests: ${formData.guests}
Duration: ${formData.duration}
`;
        break;

      case "Team Building":
        reservationDetails = `
Event Date: ${formData.eventDate}
Participants: ${formData.guests}
`;
        break;

      case "Camping":
        reservationDetails = `
Arrival: ${formData.campingArrival}
Departure: ${formData.campingDeparture}
Campers: ${formData.campers}
Package: ${formData.campingPackage}
`;
        break;

      case "Activities":
        reservationDetails = `
Activities:
${formData.activities.join(", ")}

Activity Date:
${formData.activityDate}

Participants:
${formData.participants}
`;
        break;

      case "Special Events":
        reservationDetails = `
Event: ${formData.specialEvent}
Guests: ${formData.eventGuests}

Description:
${formData.eventDescription}
`;
        break;

      default:
        reservationDetails = "";
    }

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          ...formData,

          reservationType,

          reservationDetails,

          submissionDate: new Date().toLocaleString(),

          activities: Array.isArray(formData.activities)
            ? formData.activities.join(", ")
            : formData.activities,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatusData({
        success: true,
        title: "Reservation Sent Successfully",
        message:
          "Thank you for choosing Lukenya Alkebu Resort. Our reservations team has received your request and will contact you shortly.",
        buttonText: "Close",
      });

      setStatusModalOpen(true);

    } catch (error) {

      console.error(error);

      setStatusData({
        success: false,
        title: "Reservation Failed",
        message:
          "We couldn't send your reservation. Please try again in a few moments.",
        buttonText: "Try Again",
      });

      setStatusModalOpen(true);

    } finally {

      setIsSubmitting(false);

    }
  };

  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-gray-100 hover:text-red-500"
          aria-label="Close reservation modal"
        >
          <X size={24} />
        </button>

        <div className="border-b px-8 py-6">
          <h2 id="booking-modal-title" className="font-heading text-3xl font-bold text-navy">
            Make a Reservation
          </h2>

          <p className="mt-2 text-gray-600">
            Plan your perfect experience at Lukenya Alkebu Resort. Complete the
            details below and our reservations team will contact you shortly.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-8 py-8 space-y-8"
        >

          {/* Guest Information */}

          <section>
            <h3 className="text-xl font-semibold text-navy border-b pb-2">
              Guest Information
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div>
                <label htmlFor="booking-firstName" className="block mb-2 font-medium text-gray-700">
                  First Name
                </label>

                <input
                  id="booking-firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="booking-lastName" className="block mb-2 font-medium text-gray-700">
                  Last Name
                </label>

                <input
                  id="booking-lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="booking-phone" className="block mb-2 font-medium text-gray-700">
                  Phone Number
                </label>

                <input
                  id="booking-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07xxxxxxxx"
                  maxLength={13}
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="booking-email" className="block mb-2 font-medium text-gray-700">
                  Email Address
                </label>

                <input
                  id="booking-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  required
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                />
              </div>

            </div>
          </section>

          {/* Reservation */}

          <section>
            <h3 className="text-xl font-semibold text-navy border-b pb-2">
              Reservation Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mt-6">

              <div>
                <label htmlFor="booking-reservationType" className="block mb-2 font-medium text-gray-700">
                  Reservation Type
                </label>

                <select
                  id="booking-reservationType"
                  value={reservationType}
                  onChange={(e) => {
                    setReservationType(e.target.value);

                    if (e.target.value !== "Accommodation") {
                      setFormData((prev) => ({
                        ...prev,
                        roomCategory: "",
                      }));
                    }
                  }}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                >
                  <option value="">
                    Choose what you'd like to reserve
                  </option>

                  <option>Accommodation</option>

                  <option>Conference & Retreats</option>

                  <option>Team Building</option>

                  <option>Camping</option>

                  <option>Activities</option>

                  <option>Special Events</option>

                </select>
              </div>

            </div>
          </section>

          {/* Dynamic Reservation Section */}

          {reservationType === "Accommodation" && (
            <div className="rounded-xl bg-cream p-6 border space-y-6">

              <h3 className="font-semibold text-xl text-navy">
                Accommodation Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label htmlFor="acc-roomCategory" className="block mb-2 font-medium text-gray-700">
                    Room Category
                  </label>

                  <select
                    id="acc-roomCategory"
                    name="roomCategory"
                    value={formData.roomCategory}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  >
                    <option value="">Select Room Category</option>

                    <option value="Deluxe Room">Deluxe Room</option>

                    <option value="Deluxe Twin Room">
                      Deluxe Twin Room
                    </option>

                    <option value="Superior Room">
                      Superior Room
                    </option>

                    <option value="Executive Room">
                      Executive Room
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="acc-rooms" className="block mb-2 font-medium text-gray-700">
                    Number of Rooms
                  </label>

                  <input
                    id="acc-rooms"
                    type="number"
                    name="rooms"
                    min="1"
                    value={formData.rooms}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="acc-checkIn" className="block mb-2 font-medium text-gray-700">
                    Check In
                  </label>

                  <input
                    id="acc-checkIn"
                    type="date"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="acc-checkOut" className="block mb-2 font-medium text-gray-700">
                    Check Out
                  </label>

                  <input
                    id="acc-checkOut"
                    type="date"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="acc-adults" className="block mb-2 font-medium text-gray-700">
                    Adults
                  </label>

                  <input
                    id="acc-adults"
                    type="number"
                    name="adults"
                    min="1"
                    value={formData.adults}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="acc-children" className="block mb-2 font-medium text-gray-700">
                    Children
                  </label>

                  <input
                    id="acc-children"
                    type="number"
                    name="children"
                    min="0"
                    value={formData.children}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

              </div>

            </div>
          )}

          {reservationType === "Conference & Retreats" && (
            <div className="rounded-xl bg-cream p-6 border space-y-6">

              <h3 className="font-semibold text-xl text-navy">
                Conference & Retreat Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label htmlFor="cr-conferenceType" className="block mb-2 font-medium text-gray-700">
                    Booking Type
                  </label>

                  <select
                    id="cr-conferenceType"
                    name="conferenceType"
                    value={formData.conferenceType}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  >
                    <option value="">Select Booking Type</option>

                    <option value="Corporate Conference">
                      Corporate Conference
                    </option>

                    <option value="Corporate Retreat">
                      Corporate Retreat
                    </option>

                    <option value="Church Retreat">
                      Church Retreat
                    </option>

                    <option value="School Retreat">
                      School Retreat
                    </option>

                    <option value="Family Retreat">
                      Family Retreat
                    </option>

                    <option value="Seminar">
                      Seminar
                    </option>

                    <option value="Workshop">
                      Workshop
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="cr-eventDate" className="block mb-2 font-medium text-gray-700">
                    Event Date
                  </label>

                  <input
                    id="cr-eventDate"
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="cr-guests" className="block mb-2 font-medium text-gray-700">
                    Number of Guests
                  </label>

                  <input
                    id="cr-guests"
                    type="number"
                    name="guests"
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    placeholder="Expected guests"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="cr-duration" className="block mb-2 font-medium text-gray-700">
                    Duration
                  </label>

                  <select
                    id="cr-duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                  >
                    <option value="">Select Duration</option>
                    <option>Half Day</option>
                    <option>One Day</option>
                    <option>Two Days</option>
                    <option>Three Days</option>
                    <option>More than Three Days</option>
                  </select>
                </div>

              </div>

            </div>
          )}

          {/* Additional Requests */}

          <section>
            <h3 className="text-xl font-semibold text-navy border-b pb-2">
              Additional Requests
            </h3>

            <div className="mt-6">

              <label htmlFor="global-additionalRequests" className="sr-only">
                Additional Requests
              </label>

              <textarea
                id="global-additionalRequests"
                rows="5"
                name="additionalRequests"
                value={formData.additionalRequests}
                onChange={handleChange}
                placeholder="Tell us anything that will help us prepare for your visit."
                className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:border-burnt focus:outline-none"
              />

            </div>
          </section>

          {/* Contact Method */}

          <section>
            <h3 className="text-xl font-semibold text-navy border-b pb-2">
              Preferred Contact Method
            </h3>

            <div className="mt-6 flex flex-col md:flex-row gap-6">

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="preferredContact"
                  value="WhatsApp"
                  checked={formData.preferredContact === "WhatsApp"}
                  onChange={handleChange}
                />
                WhatsApp
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="preferredContact"
                  value="Phone Call"
                  checked={formData.preferredContact === "Phone Call"}
                  onChange={handleChange}
                />
                Phone Call
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="preferredContact"
                  value="Email"
                  checked={formData.preferredContact === "Email"}
                  onChange={handleChange}
                />
                Email
              </label>

            </div>
          </section>

          {/* Buttons */}

          <div className="flex flex-col-reverse md:flex-row justify-end gap-4 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-xl px-8 py-3 font-semibold text-white transition ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-burnt hover:bg-burnt-light"
              }`}
            >
              {isSubmitting ? "Sending Reservation..." : "Submit Reservation"}
            </button>

          </div>

        </form>

      </div>

      <ReservationStatusModal
        open={statusModalOpen}
        success={statusData.success}
        title={statusData.title}
        message={statusData.message}
        buttonText={statusData.buttonText}
        onClose={() => setStatusModalOpen(false)}
      />

    </div>
  );
}