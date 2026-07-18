import {
  Tag,
  Package,
  IndianRupee,
  Layers,
  Star,
  Settings,
  Heart,
  ShoppingCart,
  // Pencil,
} from "lucide-react";
import { useDispatch } from "react-redux";
// import { data, Link } from "react-router-dom";
import { openModal } from "../Redux/Reducers/ModalReducer";
import InstagramEmbed from "../component/InstagramEmbed";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  offerPrice: number;
  stock: number;
  image: string;
  customizable: boolean;
  featured: boolean;
  status: boolean;
  instagram: string;
  category: {
    _id: string;
    name: string;
    image?: string;
  };
  createdAt: string;
}

interface Props {
  product: Product;
  path: "admin" | "client";
}

export default function ProductView({ product, path }: Props) {
  const isAdmin = path === "admin";
  const dispatch = useDispatch();

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

  return (
    <div className="mx-auto w-[340px] sm:w-3xl  space-y-6 p-5">
      {/* Header */}
      <div
        className={`flex flex-col gap-5 rounded-2xl p-6 text-white md:flex-row md:items-center ${
          isAdmin
            ? "bg-gradient-to-r from-indigo-600 to-blue-600"
            : "bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600"
        }`}
      >
        <img
          src={product.image}
          alt={product.title}
          className="h-28 w-28 rounded-xl border-4 border-white object-cover shadow-lg"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold">{product.title}</h2>

          <p className="mt-1 text-white/80">{product.category.name}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                product.status
                  ? "bg-green-400 text-green-900"
                  : "bg-red-400 text-red-900"
              }`}
            >
              {product.status ? "Active" : "Inactive"}
            </span>

            {product.featured && (
              <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-semibold text-yellow-900">
                ⭐ Featured
              </span>
            )}
          </div>
        </div>

        {/* Right Action */}

        <div>
          {path === "client" && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-pink-600 shadow transition hover:scale-105"
                onClick={() => {
                  handleModalOpen();
                }}
              >
                <ShoppingCart size={18} />
                Buy Now
              </button>

              <button className="flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur transition hover:bg-white hover:text-pink-600">
                <Heart size={18} />
                Wishlist
              </button>
            </div>
          )}
        </div>
      </div>

      {path == "client" && (
        <div className="flex items-center justify-center "   >
          <InstagramEmbed url={product.instagram} />
        </div>
      )}

      {/* Details */}
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-indigo-600">
            <Tag size={18} />
            <span className="font-semibold">Category</span>
          </div>
          <p>{product.category.name}</p>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-green-600">
            <IndianRupee size={18} />
            <span className="font-semibold">Price</span>
          </div>

          <p className="text-2xl font-bold text-green-600">
            ₹{product.offerPrice || product.price}
          </p>

          {product.offerPrice > 0 && (
            <p className="text-gray-500 line-through">₹{product.price}</p>
          )}
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-orange-600">
            <Package size={18} />
            <span className="font-semibold">Stock</span>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 font-semibold text-blue-700">
            {product.stock} Items
          </span>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center gap-2 text-purple-600">
            <Settings size={18} />
            <span className="font-semibold">Customizable</span>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${
              product.customizable
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.customizable ? "Yes" : "No"}
          </span>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm md:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-blue-600">
            <Layers size={18} />
            <span className="font-semibold">Description</span>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 leading-7 text-gray-700">
            {product.description}
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm md:col-span-2">
          <div className="mb-2 flex items-center gap-2 text-gray-600">
            <Star size={18} />
            <span className="font-semibold">Created On</span>
          </div>

          <p>{new Date(product.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
