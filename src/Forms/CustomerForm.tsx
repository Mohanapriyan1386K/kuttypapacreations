import { useState } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../Redux/Reducers/ModalReducer";

export default function CustomerForm({ proData }: any) {

  const dispatch=useDispatch()
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    quantity: 1,
    paymentMethod: "Cash on Delivery",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(closeModal())



    const price =
      proData.offerPrice > 0 ? proData.offerPrice : proData.price;

    const total = price * form.quantity;

    const message = `
*New Order Received*
━━━━━━━━━━━━━━━━━━━━━━
*PRODUCT DETAILS*
Product : ${proData.title}
Category : ${proData.category?.name}
Price : ₹${proData.price}
Offer Price : ₹${price}
Quantity : ${form.quantity}
Total : ₹${total}
Product Image
${proData.image}
━━━━━━━━━━━━━━━━━━━━━━
*CUSTOMER DETAILS*
Name : ${form.name}
Mobile : ${form.mobile}
Alternate Mobile : ${
      form.alternateMobile || "Not Provided"
    }
Email : ${form.email || "Not Provided"}
━━━━━━━━━━━━━━━━━━━━━━
*DELIVERY ADDRESS*

${form.address}

Landmark : ${form.landmark || "Not Provided"}

City : ${form.city}

State : ${form.state}

Pincode : ${form.pincode}
━━━━━━━━━━━━━━━━━━━━━━
Payment Method : ${form.paymentMethod}
Notes :
${form.notes || "No Notes"}
━━━━━━━━━━━━━━━━━━━━━━
`;
    const whatsappNumber = "917904595497";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-2">
        Customer Details
      </h2>

      <p className="text-gray-500 text-center mb-8">
        Fill the details to place your order via WhatsApp
      </p>

      {/* Product Preview */}

      <div className="border border-pink-500 rounded-xl p-4 mb-8 flex gap-4 items-center bg-gray-50">
        <img
          src={proData.image}
          alt={proData.title}
          className="w-28 h-28 rounded-lg object-cover border"
        />

        <div className="flex-1">
          <h3 className="text-xl font-bold">{proData.title}</h3>

          <p className="text-gray-500">
            {proData.category?.name}
          </p>

          <p className="mt-2 text-green-600 font-bold text-xl">
            ₹
            {proData.offerPrice > 0
              ? proData.offerPrice
              : proData.price}
          </p>

          <p className="text-sm text-gray-500">
            Stock : {proData.stock}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium">Full Name *</label>

            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
              placeholder="Enter Name"
            />
          </div>

          <div>
            <label className="font-medium">Mobile *</label>

            <input
              required
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
              placeholder="9876543210"
            />
          </div>

          <div>
            <label className="font-medium">
              Alternate Mobile
            </label>

            <input
              name="alternateMobile"
              value={form.alternateMobile}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="font-medium">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div>
          <label className="font-medium">
            Delivery Address *
          </label>

          <textarea
            required
            rows={4}
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            placeholder="House No, Street, Area..."
          />
        </div>

        <div>
          <label className="font-medium">Landmark</label>

          <input
            name="landmark"
            value={form.landmark}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <div>
            <label className="font-medium">City *</label>

            <input
              required
              name="city"
              value={form.city}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="font-medium">State *</label>

            <input
              required
              name="state"
              value={form.state}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="font-medium">Pincode *</label>

            <input
              required
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="font-medium">Quantity</label>

            <input
              type="number"
              min={1}
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <label className="font-medium">
              Payment Method
            </label>

            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            >
              <option>Cash on Delivery</option>
              <option>UPI</option>
              <option>Bank Transfer</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-medium">
            Order Notes
          </label>

          <textarea
            rows={3}
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full mt-2 border rounded-lg p-3 outline-none focus:border-pink-500"
            placeholder="Special Instructions..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl text-lg font-semibold"
        >
          📲 Place Order on WhatsApp
        </button>
      </form>
    </div>
  );
}