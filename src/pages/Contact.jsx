// src/pages/Contact.jsx
import Hero from "../components/contact/Hero";
import InfoForm from "../components/contact/InfoForm";
import Map from "../components/contact/Map";

function Contact() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <Hero />
      <div className="container">
        {/* Contact Info + Form */}
        <InfoForm />
      </div>
      {/* Map / Image */}
      <Map />
    </div>
  );
}

export default Contact;
