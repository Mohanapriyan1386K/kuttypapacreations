import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE } from "../Constent/Constent";
import toast from "react-hot-toast";

function ProductForm({ proData, refreshList, onClose }: any) {
  const [product, setProduct] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    image: null as File | null,
    description: "",
    instagram: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (proData) {
      setProduct({
        title: proData.title || "",
        category: proData.category?._id || "",
        price: proData.price || "",
        stock: proData.stock || "",
        image: null,
        description: proData.description || "",
        instagram: proData.instagram || "",
      });
    }
  }, [proData]);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/Category`);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();

    formData.append("title", product.title);
    formData.append("category", product.category);
    formData.append("price", product.price);
    formData.append("stock", product.stock);
    formData.append("description", product.description);

    formData.append("instagram", product.instagram || "");

    if (product.image) {
      formData.append("image", product.image);
    }

    try {
      if (proData) {
        await axios.put(`${API_BASE}/api/product/${proData._id}`, formData);
      } else {
        await axios.post(`${API_BASE}/api/product`, formData);
      }

      refreshList?.();
      onClose?.();
      toast.success(
        proData ? "Product Updated Successfully" : "Product Added Successfully",
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">
        {proData ? "Edit Product" : "Add Product"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">Product Name</label>

          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Enter product name"
            required
            disabled={loading}
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
            disabled={loading}
          >
            <option value="">Select Category</option>

            {categories?.map((item: any) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Price"
            required
            disabled={loading}
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">Stock</label>

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Stock"
            required
            disabled={loading}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Instagram Video</label>

          <input
            type="text"
            name="instagram"
            value={product.instagram}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Instagram Reel URL"
          />
        </div>

        {/* Current Image */}
        {proData?.image && (
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">Current Image</label>

            <img
              src={proData.image}
              alt={proData.title}
              className="h-28 w-28 rounded-lg object-cover border"
            />
          </div>
        )}

        {/* Upload Image */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">
            {proData ? "Change Image" : "Product Image"}
          </label>

          <input
            type="file"
            name="image"
            disabled={loading}
            accept="image/*"
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            rows={5}
            disabled={loading}
            name="description"
            value={product.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            placeholder="Enter description..."
            required
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => onClose?.()}
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 
        0 0 5.373 0 12h4zm2 
        5.291A7.962 7.962 0 014 
        12H0c0 3.042 1.135 
        5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}

            {loading
              ? proData
                ? "Updating..."
                : "Saving..."
              : proData
                ? "Update Product"
                : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ProductForm;
