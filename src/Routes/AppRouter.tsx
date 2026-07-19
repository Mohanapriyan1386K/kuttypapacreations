import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import Loader from "../component/Loader";
import ProductView from "../Screen/ProductView";
import TermsAndConditions from "../Screen/TermsAndConditions";
import PrivacyPolicy from "../Screen/PrivacyPolicy";

// Lazy Load Pages
const About = lazy(() => import("../Screen/About"));
const Product = lazy(() => import("../Screen/Product"));
const Gallery = lazy(() => import("../Screen/Gallery"));
const Contact = lazy(() => import("../Screen/Contact"));

const LoginPage = lazy(() => import("../Screen/Auth/LoginPage"));

const Dashboard = lazy(() => import("../Screen/Admin/Dashboard"));
const ProductMangement = lazy(() => import("../Screen/Admin/ProductMangement"));
const CategoryManagement = lazy(() => import("../Screen/Admin/CategoryManagement"));
const EnquiryMangeMent = lazy(() => import("../Screen/Admin/EnquriryMangement"));



const Loadable = (Component: React.ReactNode) => (
  <Suspense fallback={<Loader />}>
    {Component}
  </Suspense>
);

export const AppRouter = createBrowserRouter([
  // Website Routes
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: Loadable(<About />),
      },
      {
        path: "products",
        element: Loadable(<Product />),
      },
      {
        path: "productView/:slug",
        element:Loadable(<ProductView/>)
      },
      {
        path: "gallery",
        element: Loadable(<Gallery />),
      },
      {
        path: "contact",
        element: Loadable(<Contact />),
      },
      {
        path:"terms_and_conditions",
        element:Loadable(<TermsAndConditions/>)
      },
      {
        path:"/privacy",
        element:Loadable(<PrivacyPolicy/>)
      }
    ],
  },

  // Public Routes
  {
    element: <PublicRoute />,
    children: [
      {
        path: "/login",
        element: Loadable(<LoginPage />),
      },
    ],
  },

  // Admin Routes
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: Loadable(<Dashboard />),
          },
          {
            path: "products",
            element: Loadable(<ProductMangement />),
          },
          {
            path: "category",
            element: Loadable(<CategoryManagement />),
          },
          {
            path: "enquirymangeMent",
            element: Loadable(<EnquiryMangeMent />),
          },
        ],
      },
    ],
  },
]);