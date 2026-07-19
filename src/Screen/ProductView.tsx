import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE } from "../Constent/Constent";
import type { Product } from "../type";
import InstagramEmbed from "../component/InstagramEmbed";
import { useDispatch } from "react-redux";
import { openModal } from "../Redux/Reducers/ModalReducer";

export interface CategoryOption {
  _id: string;
  name: string;
  values: string[];
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  options: CategoryOption[];
  status: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryResponse {
  success: boolean;
  data: Category;
}

function ProductView() {
  const { slug } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [category, setCategory] = useState<Category | null>(null);

  const [loading, setLoading] = useState(true);

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetProduct();
  }, [slug]);

  const handleGetProduct = () => {
    setLoading(true);
    const params = new URLSearchParams();

    if (slug) {
      params.append("slug", decodeURIComponent(slug));
    }

    fetch(`${API_BASE}/api/product?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data.length > 0) {
          setProduct(data.data[0]);
          const categoryid = data.data[0].category._id;
          handleCtgroyDeatils(categoryid);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleCtgroyDeatils = (id: string) => {
    fetch(`${API_BASE}/api/Category/${id}`)
      .then((res) => res.json())
      .then((data: CategoryResponse) => {
        if (data.success) {
          setCategory(data.data);
        }
      })
      .catch(console.error);
  };
  const handleModalOpen = () => {
    dispatch(
      openModal({
        modalname: "CUSTOMERFORM",
        data: {
          proData: product,
          width: "2xl",
        },
      }),
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-5 min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-gray-400 text-lg">
          Loading product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto p-5 min-h-[60vh] flex items-center justify-center">
        <div className="text-gray-500 text-lg">Product not found.</div>
      </div>
    );
  }

  const inStock = Number(product.stock) > 0;

  return (
    <div className="max-w-7xl mx-auto p-5 lg:p-8">
      {/* Image on top, Instagram below on mobile; side by side from sm up */}
      <div className="flex flex-col lg:flex-row justify-center gap-6">
        {/* Product Image */}
        <div className="w-full lg:w-[420px] bg-gray-50 rounded-2xl overflow-hidden shadow border">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[200px] md:h-[520px] object-contain sm:object-cover"
          />
        </div>

        {/* Instagram */}
        {product?.instagram && (
          <div className="w-full lg:w-[420px] bg-gray-50 rounded-2xl overflow-hidden shadow border p-2 flex justify-center">
            <InstagramEmbed url={product.instagram} width="320px" />
          </div>
        )}
      </div>

      {/* Details below */}
      <div className="mt-8">
        <span className="inline-block w-fit text-xs font-semibold uppercase tracking-wide text-pink-600 bg-pink-50 px-3 py-1 rounded-full mb-3">
          {product.category?.name}
        </span>
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {product.title}
        </h1>
        <div className="flex items-center gap-3 mt-4">
          <p className="text-3xl font-bold text-pink-600">₹{product.price}</p>

          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              inStock ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
            }`}
          >
            {/* {inStock ? `In Stock (${product.stock})` : "Out of Stock"} */}
          </span>
        </div>
        <p className="mt-6 text-gray-600 leading-relaxed">
          {product.description}
        </p>
        {category && (
          <div className="mt-8 space-y-6">
            {category.options.map((option) => (
              <div key={option._id}>
                <h3 className="font-semibold text-gray-800 mb-3">
                  {option.name}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {option.values.map((value) => {
                    const active = selectedOptions[option.name] === value;

                    return (
                      <button
                        key={value}
                        onClick={() =>
                          setSelectedOptions((prev) => ({
                            ...prev,
                            [option.name]: value,
                          }))
                        }
                        className={`px-5 py-2 rounded-xl border transition-all duration-200 ${
                          active
                            ? "bg-pink-600 text-white border-pink-600"
                            : "bg-white text-gray-700 border-gray-300 hover:border-pink-500 hover:text-pink-600"
                        }`}
                      >
                        {value}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Buy now / Add to cart: stacks below on mobile, side by side on larger screens */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => {
              handleModalOpen();
            }}
            disabled={!inStock}
            className={`flex-1 py-3.5 rounded-xl text-lg font-semibold shadow-md transition-all duration-200 ${
              inStock
                ? "bg-pink-600 text-white hover:bg-pink-700 hover:shadow-lg active:scale-[0.98]"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {inStock ? "Buy Now" : "Out of Stock"}
          </button>

          <button className="flex-1 py-3.5 rounded-xl text-lg font-semibold border-2 border-pink-600 text-pink-600 hover:bg-pink-50 transition-all duration-200">
            Add to Cart
          </button>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6 space-y-2 text-sm text-gray-500">
          <p>Free delivery on orders above ₹499</p>
          <p>Easy returns within 7 days</p>
        </div>
      </div>
    </div>
  );
}

export default ProductView;
