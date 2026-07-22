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
  if (isOpen && selectedRoom) {
    setReservationType("Accommodation");

    setFormData((prev) => ({
      ...prev,
      roomCategory: selectedRoom,
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

/*onClose();*/

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
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-2 text-slate-500 transition hover:bg-gray-100 hover:text-red-500"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="border-b px-8 py-6">
          <h2 className="font-heading text-3xl font-bold text-navy">
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
  <label className="block mb-2 font-medium text-gray-700">
    First Name
  </label>

  <input
    type="text"
    name="firstName"
    value={formData.firstName}
    onChange={handleChange}
    placeholder="First Name"
    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
  />
</div>

<div>
  <label className="block mb-2 font-medium text-gray-700">
    Last Name
  </label>

  <input
    type="text"
    name="lastName"
    value={formData.lastName}
    onChange={handleChange}
    placeholder="Last Name"
    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
  />
</div>

              <div>
  <label className="block mb-2 font-medium text-gray-700">
    Phone Number
  </label>

  <input
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
  <label className="block mb-2 font-medium text-gray-700">
    Email Address
  </label>

  <input
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
                <label className="block mb-2 font-medium text-gray-700">
                  Reservation Type
                </label>

<select
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

              {/*<div>
                <label className="block mb-2 font-medium text-gray-700">
                  Preferred Arrival Date
                </label>

                <input
                  type="date"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
                />
              </div>*/}

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
        <label className="block mb-2 font-medium text-gray-700">
          Room Category
        </label>

        <select
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
        <label className="block mb-2 font-medium text-gray-700">
          Number of Rooms
        </label>

        <input
          type="number"
          name="rooms"
          min="1"
          value={formData.rooms}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Check In
        </label>

        <input
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Check Out
        </label>

        <input
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Adults
        </label>

        <input
          type="number"
          name="adults"
          min="1"
          value={formData.adults}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Children
        </label>

        <input
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
        <label className="block mb-2 font-medium text-gray-700">
          Booking Type
        </label>

        <select
          name="conferenceType"
          value={formData.conferenceType}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        >
          <option value="">Select Booking Type</option>
          <option>Corporate Conference</option>
          <option>Corporate Retreat</option>
          <option>Church Retreat</option>
          <option>Seminar</option>
          <option>Workshop</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Event Date
        </label>

        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Number of Guests
        </label>

        <input
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
        <label className="block mb-2 font-medium text-gray-700">
          Duration
        </label>

        <select
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

{reservationType === "Team Building" && (
  <div className="rounded-xl bg-cream p-6 border space-y-6">

    <h3 className="font-semibold text-xl text-navy">
      Team Building Details
    </h3>

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Team Building Date
        </label>

        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Number of Participants
        </label>

        <input
          type="number"
          name="guests"
          min="1"
          value={formData.guests}
          onChange={handleChange}
          placeholder="Expected participants"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Team Building Type
        </label>

        <select
          name="conferenceType"
          value={formData.conferenceType}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        >
          <option value="">Select Activity Type</option>
          <option>Indoor Team Building</option>
          <option>Outdoor Team Building</option>
          <option>Mixed Activities</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Require Conference Room?
        </label>

        <select
          name="additionalRequests"
          value={formData.additionalRequests}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        >
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

    </div>

  </div>
)}

{reservationType === "Camping" && (
  <div className="rounded-xl bg-cream p-6 border space-y-6">

    <h3 className="font-semibold text-xl text-navy">
      Camping Details
    </h3>

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Arrival Date
        </label>

        <input
          type="date"
          name="campingArrival"
          value={formData.campingArrival}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Departure Date
        </label>

        <input
          type="date"
          name="campingDeparture"
          value={formData.campingDeparture}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Number of Campers
        </label>

        <input
          type="number"
          name="campers"
          min="1"
          value={formData.campers}
          onChange={handleChange}
          placeholder="How many campers?"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Camping Package
        </label>

        <select
          name="campingPackage"
          value={formData.campingPackage}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        >
          <option value="">Select Package</option>
          <option>Day Camping</option>
          <option>Overnight Camping</option>
          <option>Weekend Camping</option>
        </select>
      </div>

    </div>

  </div>
)}

{reservationType === "Activities" && (
  <div className="rounded-xl bg-cream p-6 border space-y-6">

    <h3 className="font-semibold text-xl text-navy">
      Activity Booking
    </h3>

    <p className="text-gray-600">
      Select one or more activities you would like to enjoy during your visit.
    </p>

    <div className="grid md:grid-cols-2 gap-4">

  <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer hover:border-burnt transition">
    <input
      type="checkbox"
      checked={formData.activities.includes("Quad Bike")}
      onChange={() => handleActivityChange("Quad Bike")}
    />
    <span>🏍 Quad Bike</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer hover:border-burnt transition">
    <input
      type="checkbox"
      checked={formData.activities.includes("Cycling")}
      onChange={() => handleActivityChange("Cycling")}
    />
    <span>🚴 Cycling</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer hover:border-burnt transition">
    <input
      type="checkbox"
      checked={formData.activities.includes("Swimming")}
      onChange={() => handleActivityChange("Swimming")}
    />
    <span>🏊 Swimming</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer hover:border-burnt transition">
    <input
      type="checkbox"
      checked={formData.activities.includes("Pool Table")}
      onChange={() => handleActivityChange("Pool Table")}
    />
    <span>🎱 Pool Table</span>
  </label>

  <label className="flex items-center gap-3 rounded-xl border p-4 cursor-pointer hover:border-burnt transition">
    <input
      type="checkbox"
      checked={formData.activities.includes("Archery")}
      onChange={() => handleActivityChange("Archery")}
    />
    <span>🏹 Archery</span>
  </label>

</div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Preferred Activity Date
      </label>

      <input
        type="date"
        name="activityDate"
        value={formData.activityDate}
        onChange={handleChange}
        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
      />
    </div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Number of Participants
      </label>

      <input
        type="number"
        name="participants"
        min="1"
        value={formData.participants}
        onChange={handleChange}
        placeholder="Number of participants"
        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
      />
    </div>

  </div>
)}

{reservationType === "Special Events" && (
  <div className="rounded-xl bg-cream p-6 border space-y-6">

    <h3 className="font-semibold text-xl text-navy">
      Special Event Details
    </h3>

    <p className="text-gray-600">
      Tell us more about your event and we'll prepare the perfect package.
    </p>

    <div className="grid md:grid-cols-2 gap-6">

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Event Type
        </label>

        <select
          name="specialEvent"
          value={formData.specialEvent}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        >
          <option value="">Select Event</option>
          <option>Wedding</option>
          <option>Celebration Party</option>
          <option>Birthday Party</option>
          <option>Graduation Party</option>
          <option>Photoshoot</option>
          <option>Video Shoot</option>
        </select>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Event Date
        </label>

        <input
          type="date"
          name="eventDate"
          value={formData.eventDate}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Number of Guests
        </label>

        <input
          type="number"
          name="eventGuests"
          min="1"
          value={formData.eventGuests}
          onChange={handleChange}
          placeholder="Expected guests"
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Event Duration
        </label>

        <select
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none"
        >
          <option value="">Select Duration</option>
          <option>Half Day</option>
          <option>Full Day</option>
          <option>Weekend</option>
        </select>
      </div>

    </div>

    <div>
      <label className="block mb-2 font-medium text-gray-700">
        Describe Your Event
      </label>

      <textarea
        rows={4}
        name="eventDescription"
        value={formData.eventDescription}
        onChange={handleChange}
        placeholder="Tell us about your event, decoration needs, photography, catering, or any special requests..."
        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-burnt focus:outline-none resize-none"
      />
    </div>

  </div>
)}

{/* Additional Requests */}

<section>
  <h3 className="text-xl font-semibold text-navy border-b pb-2">
    Additional Requests
  </h3>

  <div className="mt-6">

    <textarea
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