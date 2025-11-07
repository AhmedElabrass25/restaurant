import { useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { FaSpinner, FaUpload } from "react-icons/fa";
import Swal from "sweetalert2";

const AddProduct = () => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = null;

      if (formData.image) {
        const file = formData.image;

        if (file.size > 5 * 1024 * 1024) {
          Swal.fire("⚠️ Too Large!", "Image size must be under 5MB", "warning");
          setLoading(false);
          return;
        }

        const filePath = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("products").insert([
        {
          name: formData.name,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          image: imageUrl,
        },
      ]);

      if (insertError) throw insertError;

      Swal.fire({
        icon: "success",
        title: "✅ Product Added!",
        text: `${formData.name} has been added successfully.`,
        timer: 1500,
        showConfirmButton: false,
      });

      setFormData({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null,
      });
      if (fileInputRef.current) fileInputRef.current.value = null;
    } catch (err) {
      console.error("Error details:", err);
      Swal.fire({
        icon: "error",
        title: "❌ Error Adding Product",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Enter price"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="e.g. Pizza, Drinks, Dessert..."
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none resize-none"
              placeholder="Enter short description..."
              rows="3"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Product Image
            </label>
            <div className="flex items-center gap-3">
              <label
                htmlFor="fileUpload"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition"
              >
                <FaUpload /> Upload Image
              </label>
              <input
                id="fileUpload"
                type="file"
                name="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
              />
              {formData.image && (
                <span className="text-sm text-gray-600 truncate">
                  {formData.image.name}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-green-700 transition disabled:opacity-70"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" /> Saving...
              </>
            ) : (
              "Save Product"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
