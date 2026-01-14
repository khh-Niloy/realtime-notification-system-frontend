import { socket } from "@/lib/socket";
import { useEffect, useState } from "react";
import {
  categoryIcons,
  categoryColors,
  categoryIconColors,
} from "@/components/CategoryCard";
import { Bell, CheckCircle2 } from "lucide-react";
import {
  useGetUserNotificationQuery,
  useMarkAsReadMutation,
} from "@/redux/features/notification/notification.api";
import toast from "react-hot-toast";

export const NotificationsFeed = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

  const { data: initialNotifications, isLoading } =
    useGetUserNotificationQuery(undefined);
  const [markAsRead] = useMarkAsReadMutation();

  useEffect(() => {
    if (initialNotifications) {
      setNotifications(initialNotifications);
    }
  }, [initialNotifications]);

  const handleUpdateNotification = (payload: {
    updatedNotification: any;
    isRead: boolean;
  }) => {
    setNotifications((prev) => {
      const notificationId = payload.updatedNotification._id;
      const prevWithoutUpdate = prev.filter((notification) => {
        return notification.notificationId._id !== notificationId;
      });

      console.log(prevWithoutUpdate);

      const existingMatchedNotification = prev.find(
        (notification) => notification.notificationId._id === notificationId
      );

      const updateItem = {
        ...existingMatchedNotification,
        notificationId: {
          ...payload.updatedNotification,
        },
        isRead: payload.isRead,
      };

      return [updateItem, ...prevWithoutUpdate];
    });
  };

  useEffect(() => {
    socket.on("new-notification", (notification) => {
      setNotifications((prev) => [notification, ...prev]);
    });
    socket.on("update-notification", handleUpdateNotification);

    return () => {
      socket.off("new-notification");
      socket.off("update-notification");
    };
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead(id).unwrap();
      toast.success("Notification marked as read");
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading messages...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-16">
      <div className="flex items-end justify-between mb-16 px-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-foreground">
            Notifications Feed
          </h2>
          <p className="text-sm text-muted-foreground">
            Stay updated with real-time alerts from your subscriptions.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map((item, index) => {
            // Socket might send data differently than the DB pull (populated vs raw)
            const data = item.notificationId || item;
            const Icon = categoryIcons[data.category] || Bell;
            const isRead = item.isRead || false;

            return (
              <div
                key={item._id || index}
                className={`flex items-center gap-6 p-6 rounded-[2.5rem] transition-all duration-500 border ${
                  isRead
                    ? "bg-background border-border/40"
                    : `${categoryColors[data.category]} border-white/50`
                }`}
              >
                <div
                  className={`flex-shrink-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-colors duration-500 ${
                    isRead ? "bg-muted/20" : "bg-white/60 shadow-inner"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 transition-colors duration-500 ${
                      isRead
                        ? "text-muted-foreground/40"
                        : categoryIconColors[data.category]
                    }`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-500 ${
                        isRead
                          ? "text-muted-foreground/30"
                          : "text-foreground/50"
                      }`}
                    >
                      {data.category}
                    </span>
                    <span className="text-[8px] text-muted-foreground/30">
                      •
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">
                      {data.createdAt
                        ? new Date(data.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Just now"}
                    </span>
                  </div>

                  <h3
                    className={`text-xl font-bold tracking-tight leading-none mb-2 transition-colors duration-500 ${
                      isRead ? "text-muted-foreground/80" : "text-foreground"
                    }`}
                  >
                    {data.title}
                  </h3>

                  <p
                    className={`text-sm font-medium leading-relaxed line-clamp-1 transition-colors duration-500 ${
                      isRead
                        ? "text-muted-foreground/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {data.message}
                  </p>
                </div>

                {!isRead && (
                  <button
                    onClick={() => handleMarkAsRead(item._id)}
                    className="flex-shrink-0 w-12 h-12 rounded-full border border-border/20 flex items-center justify-center bg-white/40 hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group cursor-pointer"
                    title="Mark as read"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center bg-muted/5 rounded-[3rem] border border-dashed border-border/40">
            <Bell className="w-12 h-12 text-muted-foreground/20 mb-6" />
            <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">
              Quiet Zone
            </h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground max-w-[200px] mt-2">
              No notifications found
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
