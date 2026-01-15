interface Ime {
  email: string;
  name: string;
  role: string;
  _id: string;
}

export const getNavItems = (me: Ime) => {
  if (!me) {
    return [{ name: "Home", link: "/" }];
  }
  switch (me.role?.toLowerCase()) {
    case "user":
      return [
        { name: "Home", link: "/" },
        { name: "My Subscriptions", link: "/user/my-subscriptions" },
        { name: "Notifications Feed", link: "/user/notifications-feed" },
      ];
    case "admin":
      return [
        { name: "Home", link: "/" },
        { name: "Create Notification", link: "/admin/create-notification" },
        { name: "Notification List", link: "/admin/notification-list" },
      ];
    default:
      return [{ name: "Home", link: "/" }];
  }
};
