import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        alert("❌ Error fetching product: " + error.message);
      } else {
        setFormData({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          image: data.image || null, // الرابط الحالي للصورة
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
    try {
      let imageUrl = formData.image;

      // إذا المستخدم اختار صورة جديدة (File)
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

      alert("✅ Product updated successfully!");
      navigate("/products");
    } catch (err) {
      alert("❌ Error updating product: " + err.message);
    }
  };

  if (loading) return <p className="text-center">Loading product...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-[500px] p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

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
          onChange={handleChange}
          className="block w-full mb-2"
        />

        {formData.image && (
          <img
            src={formData.image}
            alt="Product"
            className="w-24 h-24 object-cover mt-2"
          />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
