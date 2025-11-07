import React from "react";
import { FaUtensils, FaLeaf, FaSmile } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhyChoose = () => {
  return (
    <>
      <section className="bg-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-green-600">Why Choose Us?</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            We focus on quality, freshness, and customer satisfaction. Here’s
            why our guests love dining with us:
          </p>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaUtensils className="text-4xl text-green-500 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Authentic Recipes</h3>
              <p className="mt-2 text-gray-600">
                Our menu is crafted with traditional flavors and a modern twist.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaLeaf className="text-4xl text-green-500 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Fresh Ingredients</h3>
              <p className="mt-2 text-gray-600">
                We source the freshest organic produce for every meal.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
              <FaSmile className="text-4xl text-green-500 mx-auto" />
              <h3 className="mt-4 text-xl font-semibold">Friendly Service</h3>
              <p className="mt-2 text-gray-600">
                Our team makes every guest feel like part of the family.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChoose;
