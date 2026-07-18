import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./Routes/AppRouter";
import GlobalModal from "./component/GlobalModal";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <RouterProvider router={AppRouter} />
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
