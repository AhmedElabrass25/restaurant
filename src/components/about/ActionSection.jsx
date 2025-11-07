import React from "react";
import { Link } from "react-router-dom";

const ActionSection = () => {
  return (
    <>
      <section className="bg-green-600 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Come Taste the Difference
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Whether you’re here for a family dinner or a casual lunch, we promise
          you’ll leave with a smile.
        </p>
        <div className="mt-6">
          <Link
            to={"/shop"}
            className=" bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
          >
            Explore Our Menu
          </Link>
        </div>
      </section>
    </>
  );
};

export default ActionSection;
