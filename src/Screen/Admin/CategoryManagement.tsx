import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import PageHeader from "../../component/PageHeader";
import { closeModal, openModal } from "../../Redux/Reducers/ModalReducer";
import type { Category } from "../../type";
import { API_BASE } from "../../Constent/Constent";
import axios from "axios";
import PageAnimation from "../../component/PageAnimation";

function CategoryManagement() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<Category[]>([]);

  const handleGetCategory = () => {
    fetch(`${API_BASE}/api/category`)
      .then((res) => res.json())
      .then((data) => setCategories(data.data))
      .catch(console.error);
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  const handleDelete = async (data: any) => {
    if (!data?._id) return;

    try {
      await axios.delete(`${API_BASE}/api/Category/${data._id}`);
      dispatch(closeModal());
      handleGetCategory();
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete laptop.");
    }
  };

  const handleModalOpen = (data: Category | null) => {
    dispatch(
      openModal({
        modalname: "CATEGORYFORM",
        data: {
          categoryData: data,
          refreshList: handleGetCategory,
          width: "2xl",
        },
      }),
    );
  };

  const handleDeleteModalOpen = (data: Category) => {
    dispatch(
      openModal({
        modalname: "DELETEMODAL",
        data: {
          data: data,
          message:
            "Are you sure you want to delete this Category? This action cannot be undone",
          title: "Delete Category",
          onok: () => handleDelete(data),
          refreshList: () => handleGetCategory(),
        },
      }),
    );
  };

  return (
    <PageAnimation>
      <div className="max-w-6xl mx-auto md:mt-18">
        <PageHeader
          title="Category Management"
          subtitle="Manage product categories."
          buttonText="Add Category"
          onClick={() => handleModalOpen(null)}
        />

        <div className="mt-6 overflow-hidden rounded-xl bg-white shadow">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {categories?.length > 0 ? (
                  categories?.map((item) => (
                    <tr
                      key={item._id}
                      className="even:bg-gray-50 hover:bg-indigo-50 transition-all duration-200"
                    >
                      {/* Category */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 font-bold text-lg text-indigo-600">
                            {item.name.charAt(0).toUpperCase()}
                          </div>

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {item.name}
                            </h3>

                            <p className="text-xs text-gray-500">
                              Product Category
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                            item.status
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          <span
                            className={`mr-2 h-2 w-2 rounded-full ${
                              item.status ? "bg-green-500" : "bg-red-500"
                            }`}
                          ></span>

                          {item.status ? "Active" : "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleModalOpen(item)}
                            className="rounded-lg bg-blue-100 p-2.5 text-blue-600 transition hover:scale-105 hover:bg-blue-600 hover:text-white"
                          >
                            <Edit size={18} />
                          </button>

                          <button
                            onClick={() => handleDeleteModalOpen(item)}
                            className="rounded-lg bg-red-100 p-2.5 text-red-600 transition hover:scale-105 hover:bg-red-600 hover:text-white"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="py-16 text-center text-lg text-gray-500"
                    >
                      📂 No Categories Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PageAnimation>
  );
}

export default CategoryManagement;
