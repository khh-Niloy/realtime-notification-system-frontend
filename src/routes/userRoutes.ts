import { MySubscriptions } from "@/pages/user/MySubscriptions";
import { NotificationsFeed } from "@/pages/user/NotificationsFeed";

export const userRoutes = [
  {
    path: "/user/my-subscriptions",
    Component: MySubscriptions,
  },
  {
    path: "/user/notifications-feed",
    Component: NotificationsFeed,
  },
];
