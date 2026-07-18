import { Menu } from "lucide-react";

export default function Header({ setOpen }:any) {
  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-white shadow flex items-center justify-between px-5 z-40">
      <button
        className="lg:hidden"
        onClick={() => setOpen(true)}
      >
        <Menu size={28} />
      </button>

      <h2 className="font-semibold text-xl">Dashboard</h2>
    </header>
  );
}