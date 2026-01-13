import { CreateNotification } from "@/pages/admin/CreateNotification";
import { NotificationList } from "@/pages/admin/NotificationList";

export const adminRoutes = [
  {
    path: "/admin/create-notification",
    Component: CreateNotification,
  },
  {
    path: "/admin/notification-list",
    Component: NotificationList,
  },
];
