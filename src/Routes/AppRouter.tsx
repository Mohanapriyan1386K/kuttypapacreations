import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";

import About from "../Screen/About";
import Product from "../Screen/Product";
import Gallery from "../Screen/Gallery";
import Contact from "../Screen/Contact";
import Auth from "../Screen/Auth";

import Dashboard from "../Screen/Admin/Dashboard";
import ProductMangement from "../Screen/Admin/ProductMangement";
import PublicRoute from "./PublicRoute";
import CategoryManagement from "../Screen/Admin/CategoryManagement";
import EnquiryMangeMent from "../Screen/Admin/EnquriryMangement";

export const AppRouter = createBrowserRouter([
  // Website Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <About />,
      },
      {
        path: "products",
        element: <Product />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
    ],
  },

  // Login Route
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: <Auth />,
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <ProductMangement />,
      },
      {
        path:"category",
        element:<CategoryManagement/>
      },
      {
        path:"enquirymangeMent",
        element:<EnquiryMangeMent/>
      }
    ],
  },
]);