import React from "react";

const Hero = () => {
  return (
    <>
      <section className="relative bg-green-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Welcome to <span className="font-semibold">MyRestaurant</span>, where
          passion meets flavor. We serve delicious meals prepared with love and
          fresh ingredients.
        </p>
      </section>
    </>
  );
};

export default Hero;
