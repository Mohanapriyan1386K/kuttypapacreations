import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./AdminComponet/Header";
import Sidebar from "./AdminComponet/Sidebar";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      <div className="lg:ml-72">
        <Header setOpen={setOpen} />

        <main className="pt-20 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;