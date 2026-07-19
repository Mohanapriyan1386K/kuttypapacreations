import { useEffect, useState } from "react";
// import type { Category } from "../type";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { closeModal } from "../Redux/Reducers/ModalReducer";
import { API_BASE } from "../Constent/Constent";

// interface Props {
//   categoryData: Category | null;
//   refreshList:()=>void;
// }

// Option group shape: { name: "Size", values: ["10 inch", "14 inch"] }
interface OptionGroup {
  name: string;
  values: string[];
}

function CategoryForm({ categoryData, refreshList, onClose }: any) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    status: true,
  });

  // Dynamic option groups: [{ name: "Size", values: ["10 inch","14 inch"] }, ...]
  const [options, setOptions] = useState<OptionGroup[]>([]);

  // Temp input state per group (for typing new value before adding)
  const [valueInputs, setValueInputs] = useState<string[]>([]);

  // image
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Set form data when editing
  useEffect(() => {
    if (categoryData) {
      setFormData({
        name: categoryData.name,
        status: categoryData.status,
      });
      const existingOptions = categoryData.options || [];
      setOptions(existingOptions);
      setValueInputs(existingOptions.map(() => ""));
      setImagePreview(categoryData.image || "");
      setImageFile(null);
    } else {
      setFormData({
        name: "",
        status: true,
      });
      setOptions([]);
      setValueInputs([]);
      setImagePreview("");
      setImageFile(null);
    }
  }, [categoryData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ---------- Option Group Handlers ----------

  // Add a new empty option group (e.g. new "Shape" or "Size" row)
  const handleAddGroup = () => {
    setOptions((prev) => [...prev, { name: "", values: [] }]);
    setValueInputs((prev) => [...prev, ""]);
  };

  // Remove entire option group
  const handleRemoveGroup = (groupIndex: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== groupIndex));
    setValueInputs((prev) => prev.filter((_, i) => i !== groupIndex));
  };

  // Update group's name (e.g. "Shape", "Size")
  const handleGroupNameChange = (groupIndex: number, name: string) => {
    setOptions((prev) =>
      prev.map((group, i) => (i === groupIndex ? { ...group, name } : group)),
    );
  };

  // Update the temp input text for a specific group
  const handleValueInputChange = (groupIndex: number, value: string) => {
    setValueInputs((prev) =>
      prev.map((v, i) => (i === groupIndex ? value : v)),
    );
  };

  // Add a value (e.g. "10 inch") into a group's values array
  const handleAddValue = (groupIndex: number) => {
    const trimmed = valueInputs[groupIndex]?.trim();
    if (!trimmed) return;

    setOptions((prev) =>
      prev.map((group, i) => {
        if (i !== groupIndex) return group;
        if (group.values.includes(trimmed)) {
          toast.error("Value already added");
          return group;
        }
        return { ...group, values: [...group.values, trimmed] };
      }),
    );

    setValueInputs((prev) => prev.map((v, i) => (i === groupIndex ? "" : v)));
  };

  const handleValueKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    groupIndex: number,
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddValue(groupIndex);
    }
  };

  // Remove a single value from a group
  const handleRemoveValue = (groupIndex: number, valueIndex: number) => {
    setOptions((prev) =>
      prev.map((group, i) =>
        i === groupIndex
          ? { ...group, values: group.values.filter((_, vi) => vi !== valueIndex) }
          : group,
      ),
    );
  };

  // ---------- Submit ----------

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: every group must have a name and at least 1 value
    const invalidGroup = options.find(
      (g) => !g.name.trim() || g.values.length === 0,
    );
    if (invalidGroup) {
      toast.error("Each option must have a name and at least one value");
      return;
    }

    const url = categoryData
      ? `${API_BASE}/api/category/${categoryData._id}`
      : `${API_BASE}/api/category`;

    const method = categoryData ? "PUT" : "POST";

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("status", String(formData.status));
      payload.append("options", JSON.stringify(options));

      if (imageFile) {
        payload.append("image", imageFile);
      }

      const res = await fetch(url, {
        method,
        body: payload,
      });

      const data = await res.json();
      if (data.success) {
        dispatch(closeModal());

        toast.success(
          categoryData
            ? "Category Updated Successfully"
            : "Category Added Successfully",
        );

        refreshList?.();
        onClose?.();

        // Clear form after add
        if (!categoryData) {
          setFormData({
            name: "",
            status: true,
          });
          setOptions([]);
          setValueInputs([]);
          setImageFile(null);
          setImagePreview("");
        }
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
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

      {/* Category Image */}
      <div>
        <label className="mb-2 block text-sm font-medium">Category Image</label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
        />

        {imagePreview && (
          <img
            src={imagePreview}
            alt="preview"
            className="mt-3 h-24 w-24 rounded-lg object-cover"
          />
        )}
      </div>

      {/* Dynamic Options (Shape, Size, etc.) */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-sm font-medium">Options</label>
          <button
            type="button"
            onClick={handleAddGroup}
            className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700"
          >
            + Add Option
          </button>
        </div>

        <div className="space-y-4">
          {options.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="rounded-lg border border-gray-300 p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                {/* Option group name e.g. "Shape" / "Size" */}
                <input
                  type="text"
                  value={group.name}
                  onChange={(e) =>
                    handleGroupNameChange(groupIndex, e.target.value)
                  }
                  placeholder="Option name (e.g. Size, Shape)"
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm font-medium outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveGroup(groupIndex)}
                  className="shrink-0 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-500 hover:bg-red-100"
                >
                  Remove
                </button>
              </div>

              {/* Values input e.g. "10 inch", "14 inch" or "Round", "Square" */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={valueInputs[groupIndex] || ""}
                  onChange={(e) =>
                    handleValueInputChange(groupIndex, e.target.value)
                  }
                  onKeyDown={(e) => handleValueKeyDown(e, groupIndex)}
                  placeholder="e.g. 10 inch, 14 inch or Round, Square"
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => handleAddValue(groupIndex)}
                  className="shrink-0 rounded-lg bg-gray-800 px-3 py-2 text-sm text-white transition hover:bg-gray-900"
                >
                  Add
                </button>
              </div>

              {/* Show added values as chips */}
              {group.values.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.values.map((val, valueIndex) => (
                    <span
                      key={valueIndex}
                      className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm"
                    >
                      {val}
                      <button
                        type="button"
                        onClick={() => handleRemoveValue(groupIndex, valueIndex)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {options.length === 0 && (
            <p className="text-sm text-gray-400">
              No options added yet. Click "+ Add Option" to add Shape, Size, etc.
            </p>
          )}
        </div>
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