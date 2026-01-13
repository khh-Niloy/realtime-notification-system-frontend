import App from "@/App";
import Unauthorized from "@/components/Unauthorized";
import { Login } from "@/modules/auth/Login";
import { Register } from "@/modules/auth/Register";
import { Home } from "@/modules/home/Home";
import { createBrowserRouter } from "react-router";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "unauthorized",
    Component: Unauthorized,
  },
  {
    path: "/admin",
    Component: App,
    children: [
      { index: true, element: <Navigate to="/admin/notification-list" /> },
      ...adminRoutes,
    ],
  },
  {
    path: "/user",
    Component: App,
    children: [
      { index: true, element: <Navigate to="/user/my-subscriptions" /> },
      ...userRoutes,
    ],
  },
]);
