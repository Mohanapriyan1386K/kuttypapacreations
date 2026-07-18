import { useEffect, useState } from "react";
import type { Category } from "../type";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeModal } from "../Redux/Reducers/ModalReducer";
import { API_BASE } from "../Constent/Constent";

interface Props {
  categoryData: Category | null;
  refreshList:()=>void;
}

function CategoryForm({ categoryData,refreshList, onClose }:any) {

  const dispatch=useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });

  // Set form data when editing
  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name,
        status: categoryData.status,
      });
    } else {
      setFormData({
        name: "",
        status: true,
      });
    }
  }, [categoryData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = categoryData
      ? `${API_BASE}/api/category/${categoryData._id}`
      : `${API_BASE}/api/category`;

    const method = categoryData ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
       dispatch(closeModal())

        toast.success(
          categoryData
            ? "Category Updated Successfully"
            : "Category Added Successfully",
        );

        refreshList?.();
        onClose?.()


        // Clear form after add
        if (!categoryData) {
          setFormData({
            name: "",
            status: true,
          });
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-6">
      <h2 className="text-2xl font-semibold">
        {categoryData ? "Edit Category" : "Add Category"}
      </h2>

      {/* Category Name */}
      <div>
        <label className="mb-2 block text-sm font-medium">Category Name</label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Status */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="status"
          checked={formData.status}
          onChange={handleChange}
          className="h-5 w-5"
        />
        <label className="text-sm font-medium">Active</label>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700"
      >
        {categoryData ? "Update Category" : "Save Category"}
      </button>
    </form>
  );
}

export default CategoryForm;
