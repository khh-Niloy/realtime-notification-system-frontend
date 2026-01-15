import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
      <Toaster
        containerStyle={{
          top: 70,
          right: 10,
          left: 40,
          bottom: 40,
        }}
        reverseOrder={false}
      />
    </ReduxProvider>
  </StrictMode>
);
