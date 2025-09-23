// src/pages/Contact.jsx
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Contact Us</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          We’d love to hear from you! Whether it’s a question, feedback, or
          reservation inquiry, our team is here to help.
        </p>
      </section>

      {/* Contact Info + Form */}
      <section className="container mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-3xl font-bold text-green-600">Get in Touch</h2>
          <p className="mt-4 text-gray-600">
            Reach out to us through any of the following ways, or simply fill in
            the form. We’ll get back to you as soon as possible.
          </p>

          <div className="mt-8 space-y-6">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-green-500 text-2xl" />
              <span className="text-gray-700">+20 123 456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-green-500 text-2xl" />
              <span className="text-gray-700">info@myrestaurant.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-green-500 text-2xl" />
              <span className="text-gray-700">
                123 Food Street, Cairo, Egypt
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Map / Image */}
      <section className="px-6 md:px-12 pb-16">
        <div className="w-full h-72 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Restaurant location"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
}

export default Contact;
