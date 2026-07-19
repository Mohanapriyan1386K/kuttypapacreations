import { useEffect, useState } from "react";
import type { Category, Product } from "../type";
import { useDispatch } from "react-redux";
import { openModal } from "../Redux/Reducers/ModalReducer";
import { API_BASE } from "../Constent/Constent";
import { motion } from "framer-motion";
import AnimatedCard from "../component/AnimatedCard";
import SEO from "../component/SEO";
import Loader from "../component/Loader";

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
          path: "client",
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
    setProducts([])
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
    <>
      <SEO
        title="Papa Kutty Creations | Customized Gifts"
        description="Buy customized gifts, resin art, mugs, photo frames and handmade creations."
        keywords="custom gifts,resin art,photo frame,mugs,birthday gifts"
        url="https://kuttypapacreations-nine.vercel.app/products"
      />
      <div className="">
        {/* Sticky Category */}
        <div className="sticky top-14 z-50 bg-[#3F4555]/90 backdrop-blur-lg shadow-lg border-b border-white/10">
          <div className="max-w-7xl mx-auto overflow-x-auto scrollbar-hide">
            <motion.div
              className="flex gap-3 min-w-max px-3 py-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.button
                whileHover={{
                  scale: 1.08,
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={handleAll}
                className={`relative px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === ""
                    ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white shadow-lg shadow-pink-500/40"
                    : "bg-white text-gray-700 hover:bg-pink-100"
                }`}
              >
                {selectedCategory === "" && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 -z-10"
                  />
                )}
                All
              </motion.button>

              {categories.map((item, index) => (
                <motion.button
                  key={item._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryClick(item)}
                  className={`relative px-5 py-2 rounded-full font-medium whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === item._id
                      ? "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 text-white shadow-lg shadow-pink-500/40"
                      : "bg-white text-gray-700 hover:bg-pink-100"
                  }`}
                >
                  {selectedCategory === item._id && (
                    <motion.div
                      layoutId="activeCategory"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 -z-10"
                    />
                  )}

                  {item.name}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* <h1 className="text-center bg-pink-500 p-2 ">
            Customized Gifts & Handmade Creations
          </h1> */}

        {/* Products */}

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-5">
            {products.map((item, index) => (
              <AnimatedCard key={item._id} index={index} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl bg-white shadow-xl transition-all duration-300 hover:shadow-pink-300">
                  {/* Image */}
                  <div className="overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Content */}
                  <div className="relative z-10 flex h-[200px] flex-col p-2">
                    <h2 className="line-clamp-2 text-lg font-bold">
                      {item.title}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xl font-bold">
                        <span className="text-gray-500 text-sm font-medium">
                          Starting from{" "}
                        </span>
                        <span className="bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent">
                          ₹{item.price}
                        </span>
                      </p>

                      {/* <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                          In Stock
                        </span> */}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleViewModalOpen(item)}
                      className="mt-auto w-full rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 py-3 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      View Product
                    </button>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          {loading && (
            // <div className="text-center py-5 text-lg">Loading...</div>
            <Loader />
          )}

          {!hasMore && (
            <div className="text-center py-5 text-gray-500">
              No More Products
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductPage;
