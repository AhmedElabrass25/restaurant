import React from "react";

const Map = () => {
  return (
    <>
      <section className="pb-16">
        {/* title */}
        <div className="container mb-5 text-center">
          <h2 className="text-3xl font-bold text-green-600">Our Location</h2>
        </div>
        <div className="w-full h-96 overflow-hidden shadow-lg">
          <iframe
            title="Restaurant Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110527.36673307192!2d31.18420001727646!3d30.008344422648223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145847f35a16e65f%3A0xb30f8b67b4b07c6d!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1692543930958!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Map;
