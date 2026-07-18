import { useEffect, useState } from "react";
import type { Category, Product } from "../type";
import { useDispatch } from "react-redux";
import { openModal } from "../Redux/Reducers/ModalReducer";
import { API_BASE } from "../Constent/Constent";

function ProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const dispatch = useDispatch();
  // Get Categories
  const getCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/category`);
      const data = await res.json();
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleViewModalOpen = (data: any) => {
    dispatch(
      openModal({
        modalname: "PRODUCTVIEW",
        data: {
          product: data,
          path:"client",
          width: "5xl",
        },
      }),
    );
  };

  // Get Products
  const getProducts = async (pageNo = 1, categoryId = "", reset = false) => {
    if (loading) return;

    setLoading(true);

    try {
      let url = `${API_BASE}/api/product?page=${pageNo}&limit=${limit}`;

      if (categoryId) {
        url += `&category=${categoryId}`;
      }

      const res = await fetch(url);
      const data = await res.json();

      if (reset) {
        setProducts(data.data);
      } else {
        setProducts((prev) => [...prev, ...data.data]);
      }

      setHasMore(pageNo < data.pagination.totalPages);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // First Load
  useEffect(() => {
    getCategories();
    getProducts(1, "", true);
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;

      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 200
      ) {
        const nextPage = page + 1;
        setPage(nextPage);
        getProducts(nextPage, selectedCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, loading, hasMore, selectedCategory]);

  // Category Click
  const handleCategoryClick = (item: Category) => {
    setSelectedCategory(item._id);
    setPage(1);
    setHasMore(true);
    getProducts(1, item._id, true);
  };

  // All Products
  const handleAll = () => {
    setSelectedCategory("");
    setPage(1);
    setHasMore(true);
    getProducts(1, "", true);
  };

  return (
    <div>
      {/* Sticky Category */}
      <div className="  sticky top-16 z-50 bg-[#3F4555]  shadow-sm">
        <div className="max-w-7xl mx-auto  overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max px-3 py-3">
            <button
              onClick={handleAll}
              className={`px-5 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === ""
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200"
              }`}
            >
              All
            </button>

            {categories?.map((item) => (
              <button
                key={item._id}
                onClick={() => handleCategoryClick(item)}
                className={`px-5 py-2 rounded-full whitespace-nowrap ${
                  selectedCategory === item._id
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3">
          {products?.map((item) => (
            <div
              key={item._id}
              className="rounded-xl shadow-sm overflow-hidden bg-white shadow-3xl shadow-pink-400"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-square object-cover"
              />

              <div className="p-3">
                <h2 className="font-semibold line-clamp-2">{item.title}</h2>

                <p className="text-gray-500 text-sm line-clamp-2">
                  {item.description}
                </p>

                <p className="text-pink-600 font-bold text-xl mt-2">
                  ₹{item.price}
                </p>

                <button
                  className="mt-3 w-full bg-pink-500 text-white rounded-lg py-2"
                  onClick={() => handleViewModalOpen(item)}
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {loading && <div className="text-center py-5 text-lg">Loading...</div>}

        {!hasMore && (
          <div className="text-center py-5 text-gray-500">No More Products</div>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
