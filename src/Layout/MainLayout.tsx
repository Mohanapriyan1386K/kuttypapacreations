import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../component/ScrollToTop";


function MainLayout() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;