import {
  Heart,
  Gift,
  Truck,
  ShieldCheck,
  Star,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Images } from "../Constent/imageConstent";
import PageAnimation from "../component/PageAnimation";

import { useNavigate } from "react-router-dom";
import SEO from "../component/SEO";
import ProductPage from "./Product";

export default function About() {
  const navigate = useNavigate();
  const features = [
    {
      icon: <Heart size={32} />,
      title: "Handmade with Love",
      desc: "Every product is crafted carefully with attention to every detail.",
    },
    {
      icon: <Gift size={32} />,
      title: "Customized Gifts",
      desc: "Personalize gifts with your names, photos, and special memories.",
    },
    {
      icon: <Truck size={32} />,
      title: "Fast Delivery",
      desc: "Secure packaging and delivery across India.",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Premium Quality",
      desc: "Made using high-quality resin and premium materials.",
    },
  ];

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi, I'm interested in your products.");

    window.open(`https://wa.me/917904595497?text=${message}`, "_blank");
  };

  return (
    <>
      <SEO
        title="Papa Kutty Creations | Customized Gifts"
        description="Buy customized gifts, resin art, mugs, photo frames and handmade creations."
        keywords="custom gifts,resin art,photo frame,mugs,birthday gifts"
        url="https://kuttypapacreations-nine.vercel.app/"
      />
      <PageAnimation>
        <div className="bg-slate-950 text-white">
          {/* HERO */}
          <section
            className="relative overflow-hidden bg-no-repeat h-[660px]"
            style={{
              backgroundImage: `url(${Images.her})`,
              backgroundSize: "contain",
              backgroundPosition: "calc(100% - 40px) center", // 40px gap from right
            }}
          >
            <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 items-center gap-10">
              <div>
                <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm">
                  <Sparkles size={18} />
                  Handmade Resin Gifts
                </span>

                <h1 className="text-5xl md:text-5xl font-extrabold mt-6 leading-tight">
                  {/* Papakutty */}
                  <span className="block text-amber-300">
                    Handmade Resin Gifts & Personalized Custom Keepsakes
                  </span>
                </h1>

                <p className="mt-6 text-lg text-slate-100 leading-8">
                  Made with Love | Pan India Delivery
                </p>

                <div className="flex flex-row gap-4 mt-8 ">
                  <button
                    className="bg-white text-black  px-4 md:px-4 md:py-2 text-[12px] rounded-full font-semibold hover:scale-105 duration-300"
                    onClick={() => navigate("/products")}
                  >
                    Explore Products
                  </button>

                  <button
                    className="border border-white px-7 py-3 rounded-full flex items-center gap-2 hover:bg-white hover:text-black duration-300"
                    onClick={openWhatsApp}
                  >
                    <MessageCircle size={20} />
                    WhatsApp Now
                  </button>
                </div>
              </div>

              {/* <div className="flex justify-center">
            <img
              src={Images.Hero}
              alt="Gift"
              className="rounded-3xl shadow-2xl w-full max-w-md hover:scale-105 duration-500"
            />
          </div> */}
            </div>
          </section>

          <ProductPage />

          <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
            <img src={Images.Hero} className="rounded-3xl shadow-xl" />

            <div>
              <h2 className="text-4xl font-bold mb-6">About Us</h2>

              <p className="text-slate-300 leading-8 text-lg">
                At{" "}
                <span className="text-pink-400 font-semibold">
                  Papakutty Creations
                </span>
                , every handmade creation tells a story. We specialize in resin
                keychains, personalized gifts, miniatures, name boards, couple
                gifts, and custom keepsakes. Every order is designed with love,
                ensuring that your memories stay beautiful forever.
              </p>
            </div>
          </section>

          <section className="bg-slate-900 py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-center text-4xl font-bold mb-14">
                Why Choose Us
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features?.map((item) => (
                  <div
                    key={item.title}
                    className="bg-slate-800 rounded-3xl p-8 hover:-translate-y-3 duration-300 border border-slate-700"
                  >
                    <div className="text-pink-400 mb-5">{item.icon}</div>

                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <p className="text-slate-400 mt-4">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS */}

          <section className="py-20">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-center text-4xl font-bold mb-16">
                How It Works
              </h2>

              <div className="grid md:grid-cols-4 gap-8">
                {[
                  "Choose Product",
                  "Share Your Photo",
                  "Approve Design",
                  "Doorstep Delivery",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="bg-slate-900 rounded-3xl p-8 text-center border border-slate-800"
                  >
                    <div className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                      {index + 1}
                    </div>

                    <h3 className="font-semibold text-lg">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* STATS */}

          <section className="bg-gradient-to-r from-pink-600 to-purple-700 py-16">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
              <div>
                <h2 className="text-5xl font-bold">500+</h2>
                <p>Happy Customers</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">1000+</h2>
                <p>Products Made</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">4.9★</h2>
                <p>Customer Rating</p>
              </div>

              <div>
                <h2 className="text-5xl font-bold">India</h2>
                <p>Shipping Available</p>
              </div>
            </div>
          </section>

          {/* CTA */}

          <section className="py-24">
            <div className="max-w-5xl mx-auto px-6">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl p-14 text-center">
                <Star className="mx-auto mb-5" size={50} />

                <h2 className="text-4xl font-bold">
                  Ready to Create Your Dream Gift?
                </h2>

                <p className="mt-5 text-lg text-slate-100">
                  Let's make something unique together.
                </p>

                <button className="mt-8 bg-white text-black px-8 py-4 rounded-full font-semibold hover:scale-105 duration-300">
                  Order on WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>
      </PageAnimation>
    </>
  );
}
