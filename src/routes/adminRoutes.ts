import { CreateNotification } from "@/pages/admin/CreateNotification";
import { NotificationList } from "@/pages/admin/NotificationList";
import { EditNotification } from "@/pages/admin/EditNotification";

export const adminRoutes = [
  {
    path: "/admin/create-notification",
    Component: CreateNotification,
  },
  {
    path: "/admin/notification-list",
    Component: NotificationList,
  },
  {
    path: "/admin/edit-notification/:id",
    Component: EditNotification,
  },
];
