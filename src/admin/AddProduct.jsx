import { useState, useRef } from "react";
import { supabase } from "../supabaseClient";
import { FaSpinner } from "react-icons/fa"; // أيقونة التحميل

const AddProduct = () => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(false); // 🔹 حالة التحميل

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
    setLoading(true); // 🔹 بدء التحميل

    try {
      let imageUrl = null;

      if (formData.image) {
        const file = formData.image;

        if (file.size > 5 * 1024 * 1024) {
          alert("❌ Image is too large (max 5MB)");
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

      alert("✅ Product added successfully!");

      // Reset form
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
      alert("❌ Error adding product: " + err.message);
    } finally {
      setLoading(false); // 🔹 انتهاء التحميل
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-[500px] p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Add Product</h2>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          rows="3"
          required
        ></textarea>

        <input
          type="file"
          name="image"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          className="block w-full mb-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
          disabled={loading} // 🔹 يمنع الضغط أثناء التحميل
        >
          {loading && <FaSpinner className="animate-spin" />}
          {loading ? "Saving..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
