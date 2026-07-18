import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";

import { AppRouter } from "./Routes/AppRouter";
import GlobalModal from "./component/GlobalModal";

const Loader = () => (
  <div className="flex items-center justify-center h-screen bg-white">
    <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={AppRouter} />
      </Suspense>

      <GlobalModal />

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}

export default App;