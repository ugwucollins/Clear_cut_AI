import { Analytics } from "@vercel/analytics/react";
import "aos/dist/aos.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import App from "./App.tsx";
import UserContext from "./Context/UserContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <UserContext>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </UserContext>
    </StrictMode>
    <Analytics />
  </BrowserRouter>,
);
