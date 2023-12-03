import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes";

function App() {
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  // max-w-screen-xl
  return (
    <div className="mx-auto h-[100vh]">
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
