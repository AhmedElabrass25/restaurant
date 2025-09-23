// src/pages/About.jsx
import { FaUtensils, FaLeaf, FaSmile } from "react-icons/fa";

function About() {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto">
          Welcome to <span className="font-semibold">MyRestaurant</span>, where
          passion meets flavor. We serve delicious meals prepared with love and
          fresh ingredients.
        </p>
      </section>

      {/* Our Story */}
      <section className="container mx-auto px-6 md:px-12 py-16 grid md:grid-cols-2 gap-12 items-center">
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

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 md:px-12 text-center">
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

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Come Taste the Difference
        </h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Whether you’re here for a family dinner or a casual lunch, we promise
          you’ll leave with a smile.
        </p>
        <button className="mt-6 bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Explore Our Menu
        </button>
      </section>
    </div>
  );
}

export default About;
