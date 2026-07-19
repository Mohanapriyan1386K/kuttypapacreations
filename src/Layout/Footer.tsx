import {
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";



import { IoMdMail,IoLogoInstagram,IoLogoFacebook } from "react-icons/io";

import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-pink-500">
              Papakutty Creations
            </h2>

            <p className="mt-4 leading-7 text-gray-400">
              Handmade resin gifts crafted with love.
              Personalized keychains, miniatures,
              name boards and unique gifts for every occasion.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <NavLink to="/" className="hover:text-pink-400">
                Home
              </NavLink>

              <NavLink to="/products" className="hover:text-pink-400">
                Products
              </NavLink>
{/* 
              <NavLink to="/about" className="hover:text-pink-400">
                About
              </NavLink> */}

              {/* <NavLink to="/gallery" className="hover:text-pink-400">
                Gallery
              </NavLink> */}

              <NavLink to="/contact" className="hover:text-pink-400">
                Contact
              </NavLink>

            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Phone size={18} className="text-pink-500" />
                <span>+91 86672 22695</span>
              </div>

              <div className="flex items-center gap-3">
                <IoMdMail size={18} className="text-pink-500" />
                <span>papakutty24712@gmail.com</span>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-pink-500 mt-1" />
                <span>Trichy, Tamil Nadu</span>
              </div>

            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <a
                href="https://www.instagram.com/papakutty_creations?igsh=MXR0YmRjenZtb2trbA=="
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-3 rounded-full hover:bg-pink-500 transition"
              >
                {/* <Instagram size={22} /> */}
                <IoLogoInstagram size={22}/>
              </a>

              <a
                href="https://facebook.com/"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-3 rounded-full hover:bg-blue-500 transition"
              >
                {/* <Facebook size={22} /> */}
                <IoLogoFacebook  size={22}/>
              </a>

              <a
                href="https://wa.me/7904595497"
                target="_blank"
                rel="noreferrer"
                className="bg-slate-800 p-3 rounded-full hover:bg-green-500 transition"
              >
                <MessageCircle size={22} />
              </a>

            </div>

            <a
              href="https://wa.me/917904595497"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-block bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-full text-white font-semibold"
            >
              Chat on WhatsApp
            </a>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} Papakutty Creations. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm">
            <NavLink to="/privacy" className="hover:text-pink-400">
              Privacy Policy
            </NavLink>

            <NavLink to="/terms_and_conditions" className="hover:text-pink-400">
              Terms & Conditions
            </NavLink>
          </div>

        </div>

      </div>
    </footer>
  );
}