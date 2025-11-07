import React from "react";

const OurStory = () => {
  return (
    <>
      <section className="container py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Restaurant Interior"
            className="rounded-2xl shadow-lg"
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-3xl font-bold text-green-600">Our Story</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">
            At <span className="font-semibold">MyRestaurant</span>, we believe
            food is more than just a meal — it’s an experience. Founded with a
            love for authentic recipes and modern flavors, we’ve created a place
            where everyone feels at home.
          </p>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Our chefs carefully select fresh, organic ingredients to ensure
            every dish is full of taste, health, and happiness.
          </p>
        </div>
      </section>
    </>
  );
};

export default OurStory;
