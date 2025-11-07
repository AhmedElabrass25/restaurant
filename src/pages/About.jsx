// src/pages/About.jsx
import WhyChoose from "../components/about/WhyChoose";
import Hero from "../components/about/Hero";
import OurStory from "../components/about/OurStory";
import ActionSection from "../components/about/ActionSection";

function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <Hero />
      {/* Our Story */}
      <OurStory />
      {/* Why Choose Us */}
      <WhyChoose />

      {/* Call to Action */}
      <ActionSection />
    </div>
  );
}

export default About;
