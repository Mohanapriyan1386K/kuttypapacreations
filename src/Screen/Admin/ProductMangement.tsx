import { useEffect, useState } from "react";
import PageHeader from "../../component/PageHeader";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../../Redux/Reducers/ModalReducer";
import { Edit, Eye, Search, Trash2 } from "lucide-react";
import type { Product } from "../../type";
import { API_BASE } from "../../Constent/Constent";
import axios from "axios";
import PageAnimation from "../../component/PageAnimation";

function ProductMangement() {
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [debounce, setDebounce] = useState("");
  const [category, setCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [categories, setCategories] = useState<any[]>([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/Category`);
      setCategories(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetProduct = () => {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", limit.toString());

    if (category.trim()) {
      params.append("category", category);
    }

    if (debounce.trim()) {
      params.append("search", debounce);
    }

    fetch(`${API_BASE}/api/product?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.data);
        setTotalPages(data.pagination.totalPages);
      })
      .catch(console.error);
  };
  useEffect(() => {
    handleGetProduct();
  }, [page, debounce, category]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(productName);
    }, 500);

    return () => clearTimeout(timer);
  }, [productName]);

  const handleChangeStatus = async (item: Product) => {
    try {
      const newStatus = !item.status;

      await axios.put(`${API_BASE}/api/product/status/${item._id}`, {
        status: newStatus,
      });

      handleGetProduct(); // Refresh list
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (item: Product) => {
    await axios.delete(`/api/product/${item._id}`);
    dispatch(closeModal());
    handleGetProduct();
  };

  const handleModalOpen = (data: any | null) => {
    dispatch(
      openModal({
        modalname: "PRODUCTFORM",
        data: {
          proData: data,
          refreshList: () => handleGetProduct(),
          width: "2xl",
        },
      }),
    );
  };

  const handleViewModalOpen = (data: any) => {
    dispatch(
      openModal({
        modalname: "PRODUCTVIEW",
        data: {
          product: data,
          path: "admins",
          width: "6xl",
        },
      }),
    );
  };

  const hadledeleteModalOpen = (item: any) => {
    dispatch(
      openModal({
        data: {
          data: item,
          width: "xl",
          onok: () => handleDelete(item),
          title: "Delete Product",
          message:
            "Are you sure you want to delete this Product? This action cannot be undone",
        },

        modalname: "DELETEMODAL",
      }),
    );
  };
  return (
    <PageAnimation>
      <div className="max-w-6xl  md:mt-18 mx-auto">
        <PageHeader
          title="Product Mangement"
          subtitle="Manage your second-hand laptop inventory."
          buttonText="Add Product"
          onClick={() => {
            handleModalOpen(null);
          }}
        />

        <div className="mt-4 rounded-2xl bg-white shadow-xl border border-gray-200">
          {/* Top Bar */}
          <div className="flex flex-col gap-4  p-6 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-bold text-slate-800">All Product</h2>

            <div className="relative w-full md:w-80">
              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search laptop..."
                className="w-full rounded-xl border py-2 pl-10 pr-4 outline-none focus:border-blue-500"
                onChange={handleSearch}
              />
            </div>
            <div>
              <select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-4 py-3"
                required
              >
                <option value="">Select Category</option>

                {categories?.map((item: any) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mt-5 ">
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold">
                    Featured
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
                {product?.length > 0 ? (
                  product?.map((item) => (
                    <tr
                      key={item._id}
                      className="even:bg-gray-50 hover:bg-blue-50 transition-all duration-200"
                    >
                      {/* Product */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-16 w-16 rounded-xl border object-cover shadow-sm"
                          />

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {item.title}
                            </h3>

                            <p
                              className="max-w-xs truncate text-sm text-gray-500"
                              title={item.description}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                          {item.category.name}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-green-600">
                          ₹{item.price}
                        </span>
                      </td>

                      {/* Stock */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            item.stock > 10
                              ? "bg-green-100 text-green-700"
                              : item.stock > 0
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.stock}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            item.featured
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {item.featured ? "⭐ Featured" : "Regular"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            className="peer sr-only"
                            checked={item.status}
                            onChange={() => handleChangeStatus(item)}
                          />

                          <div className="h-6 w-11 rounded-full bg-gray-300 transition peer-checked:bg-green-500 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-all peer-checked:after:translate-x-5"></div>
                        </label>
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
                            onClick={() => handleViewModalOpen(item)}
                            className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                          >
                            <Eye size={18} />
                          </button>

                          <button
                            onClick={() => hadledeleteModalOpen(item)}
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
                      colSpan={7}
                      className="py-16 text-center text-lg text-gray-500"
                    >
                      📦 No Products Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {product?.length > 0 && (
            <div className="flex items-center justify-between border-t p-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => prev - 1)}
                className={`rounded-lg px-4 py-2 ${
                  page === 1
                    ? "cursor-not-allowed bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setPage(index + 1)}
                    className={`h-10 w-10 rounded-lg ${
                      page === index + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage((prev) => prev + 1)}
                className={`rounded-lg px-4 py-2 ${
                  page === totalPages
                    ? "cursor-not-allowed bg-gray-200"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </PageAnimation>
  );
}

export default ProductMangement;
