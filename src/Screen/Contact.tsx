import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import SEO from "../component/SEO";
import { API_BASE } from "../Constent/Constent";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await axios.post(
        `${API_BASE}/api/enquiry`,
        formData
      );

      if (data.success) {
        toast.success(data.message);

        setFormData({
          name: "",
          phone: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Papa Kutty Creations | Contact Us"
        description="Contact Papa Kutty Creations for customized gifts, resin art, photo frames, keychains and handmade creations."
        keywords="contact papa kutty creations,custom gifts,resin art,photo frame"
        url="https://kuttypapacreations-nine.vercel.app/contact"
      />

      <section className="relative min-h-screen overflow-hidden bg-[#FFF5FB] flex items-center justify-center px-4 py-12">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F6339A]/30 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-pink-300/40 rounded-full blur-[120px] animate-pulse"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-[#F6339A]/20 rounded-full blur-[100px] animate-ping"></div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/40 p-8 md:p-10">
            <h2 className="text-4xl font-bold text-center text-gray-800">
              Contact Us
            </h2>

            <p className="text-center text-gray-500 mt-2 mb-8">
              We'd love to hear from you. Send us your enquiry.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#F6339A] focus:ring-4 focus:ring-pink-200"
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#F6339A] focus:ring-4 focus:ring-pink-200"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#F6339A] focus:ring-4 focus:ring-pink-200"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition focus:border-[#F6339A] focus:ring-4 focus:ring-pink-200"
              />

              <textarea
                rows={5}
                name="message"
                placeholder="Write your message..."
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none resize-none transition focus:border-[#F6339A] focus:ring-4 focus:ring-pink-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-[#F6339A] to-pink-500 py-3 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-400/40 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}