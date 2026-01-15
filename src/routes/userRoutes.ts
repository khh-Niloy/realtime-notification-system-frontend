import { MySubscriptions } from "@/pages/user/MySubscriptions";
import { NotificationsFeed } from "@/pages/user/NotificationsFeed";

export const userRoutes = [
  {
    path: "my-subscriptions",
    Component: MySubscriptions,
  },
  {
    path: "notifications-feed",
    Component: NotificationsFeed,
  },
];
