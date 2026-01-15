import { CreateNotification } from "@/pages/admin/CreateNotification";
import { NotificationList } from "@/pages/admin/NotificationList";
import { EditNotification } from "@/pages/admin/EditNotification";

export const adminRoutes = [
  {
    path: "create-notification",
    Component: CreateNotification,
  },
  {
    path: "notification-list",
    Component: NotificationList,
  },
  {
    path: "edit-notification/:id",
    Component: EditNotification,
  },
];
