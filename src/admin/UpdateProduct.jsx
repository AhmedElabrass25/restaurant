import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Swal from "sweetalert2";
import { FaSpinner, FaUpload } from "react-icons/fa";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        Swal.fire("❌ Error", error.message, "error");
      } else {
        setFormData({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          image: data.image || null,
        });
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      let imageUrl = formData.image;

      // Upload new image if changed
      if (formData.image instanceof File) {
        const filePath = `${Date.now()}_${formData.image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from("products")
        .update({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          description: formData.description,
          image: imageUrl,
        })
        .eq("id", id);

      if (error) throw error;

      await Swal.fire({
        icon: "success",
        title: "✅ Product Updated!",
        text: "The product has been updated successfully.",
        showConfirmButton: false,
        timer: 1500,
        background: "#f0fdf4",
        color: "#166534",
      });

      navigate("/displayProducts");
    } catch (err) {
      Swal.fire("❌ Error", err.message, "error");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-gray-600">
        Loading product...
      </div>
    );

  const previewSrc =
    formData.image instanceof File
      ? URL.createObjectURL(formData.image)
      : formData.image;

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
          🍀 Update Product
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-md p-2 outline-none transition"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-md p-2 outline-none transition"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-md p-2 outline-none transition"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 rounded-md p-2 outline-none transition resize-none"
            required
          ></textarea>

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
                onChange={handleChange}
                className="hidden"
              />
              {formData.image && (
                <span className="text-sm text-gray-600 truncate">
                  {formData.image.name || "Existing image selected"}
                </span>
              )}
            </div>
          </div>

          {previewSrc && (
            <div className="flex justify-center mt-4">
              <img
                src={previewSrc}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-lg shadow-md border border-gray-200"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={btnLoading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition flex items-center justify-center gap-2 shadow-md"
          >
            {btnLoading && <FaSpinner className="animate-spin" />}
            {btnLoading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
