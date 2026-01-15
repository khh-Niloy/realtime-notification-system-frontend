import App from "@/App";
import Unauthorized from "@/components/Unauthorized";
import { Login } from "@/modules/auth/Login";
import { Register } from "@/modules/auth/Register";
import { Home } from "@/modules/home/Home";
import { createBrowserRouter } from "react-router-dom";
import { adminRoutes } from "./adminRoutes";
import { userRoutes } from "./userRoutes";
import { roleBasedCompo } from "@/middleware/roleBasedCompo";
import { Role, type TRole } from "@/constant/constValues";

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
    Component: roleBasedCompo(App, Role.admin as TRole),
    children: [...adminRoutes],
  },
  {
    path: "/user",
    Component: roleBasedCompo(App, Role.user as TRole),
    children: [...userRoutes],
  },
]);
