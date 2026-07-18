import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";

const navItems = [
  { name: "About", path: "/" },
  { name: "Products", path: "/products" },
  // { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto h-16 px-5 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="text-2xl font-bold text-pink-500">
          Papakutty
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }:any) =>
                `transition font-medium ${
                  isActive
                    ? "text-pink-500"
                    : "text-white hover:text-pink-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 px-5 py-2 rounded-full text-white"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        } bg-slate-900`}
      >
        <nav className="flex flex-col px-5 py-4 gap-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }:any) =>
                `py-2 transition ${
                  isActive
                    ? "text-pink-500"
                    : "text-white hover:text-pink-400"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 py-3 rounded-full text-white"
          >
            <MessageCircle size={18} />
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}