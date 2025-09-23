import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaSpinner } from "react-icons/fa";

const UpdateProduct = () => {
  const { id } = useParams(); // get product id from URL
  const navigate = useNavigate(); // for redirecting after update

  // state for the form
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: null, // can be a file or a URL
  });

  const [loading, setLoading] = useState(true); // loading product data
  const [btnLoading, setBtnLoading] = useState(false); // loading state for update button

  // fetch product data from supabase when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single(); // get single product by id

      if (error) {
        alert("Error fetching product: " + error.message);
      } else {
        // fill form with existing product data
        setFormData({
          name: data.name,
          price: data.price,
          category: data.category,
          description: data.description,
          image: data.image || null, // existing image URL
        });
      }
      setLoading(false); // stop loading
    };

    fetchProduct();
  }, [id]);

  // handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files?.length) {
      // if a new image is selected, save the file
      setFormData({ ...formData, image: files[0] });
    } else {
      // update other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true); // show spinner on button

    try {
      let imageUrl = formData.image;

      // if user selected a new image, upload it to supabase storage
      if (formData.image instanceof File) {
        const filePath = `${Date.now()}_${formData.image.name}`;
        const { error: uploadError } = await supabase.storage
          .from("products")
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("products")
          .getPublicUrl(filePath);

        imageUrl = publicUrlData.publicUrl; // use the uploaded image URL
      }

      // update product in supabase table
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

      alert("Product updated successfully!"); // notify user
      navigate("/displayProducts"); // redirect to products page
    } catch (err) {
      alert("Error updating product: " + err.message); // show error
    } finally {
      setBtnLoading(false); // hide spinner
    }
  };

  if (loading) return <p className="text-center">Loading product...</p>; // show loading text

  // determine image preview source
  const previewSrc =
    formData.image instanceof File
      ? URL.createObjectURL(formData.image)
      : formData.image;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-[500px] p-4 border rounded">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>

        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          required
        />

        {/* Price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="block w-full border p-2 mb-2"
          rows="3"
          required
        ></textarea>

        {/* Image input */}
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="block w-full mb-2"
        />

        {/* Image preview */}
        {formData.image && (
          <img
            src={previewSrc}
            alt="Product"
            className="w-24 h-24 object-cover mt-2"
          />
        )}

        {/* Update button with spinner */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 flex items-center justify-center gap-2"
          disabled={btnLoading} // disable button when updating
        >
          {btnLoading && <FaSpinner className="animate-spin" />}
          {btnLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
