import {
  useGetAllNotificationQuery,
  useDeleteNotificationMutation,
} from "@/redux/features/notification/notification.api";
import { Bell, Plus, Edit2, Trash2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { categoryIconColors, categoryIcons } from "@/constant/constValues";

export const NotificationList = () => {
  const { data: notifications, isLoading } =
    useGetAllNotificationQuery(undefined);
  const [deleteNotification] = useDeleteNotificationMutation();

  const handleDeletion = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
      toast.success("Notification deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-4 border-foreground/10 border-t-foreground rounded-full animate-spin" />
        <p className="text-sm font-medium text-muted-foreground animate-pulse">
          Fetching master list...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold tracking-tight text-foreground uppercase">
            Management
          </h2>
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Notifications Database
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin/create-notification">
            <Button className="rounded-2xl h-12 px-6 gap-2 font-bold shadow-xl shadow-foreground/10 hover:shadow-foreground/20 transition-all active:scale-95">
              <Plus className="w-5 h-5" />
              CREATE NEW
            </Button>
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-background border border-border/50 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-foreground/[0.02]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Category
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Details
                </th>
                <th className="px-6 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Date Created
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {notifications?.length > 0 ? (
                notifications.map((item: any) => {
                  const Icon = categoryIcons[item.category] || Bell;
                  return (
                    <tr
                      key={item._id}
                      className="group hover:bg-muted/10 transition-colors"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center ${
                              categoryIconColors[item.category]
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-foreground/70">
                            {item.category}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="space-y-1 max-w-md">
                          <h4 className="font-bold text-foreground leading-none">
                            {item.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {item.message}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 transition-opacity">
                          <Link to={`/admin/edit-notification/${item._id}`}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="w-9 h-9 rounded-xl hover:bg-background hover:shadow-md cursor-pointer"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeletion(item._id)}
                            className="w-9 h-9 rounded-xl text-destructive hover:bg-destructive/10 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <Bell className="w-12 h-12 text-muted-foreground/20" />
                      <p className="font-bold text-muted-foreground uppercase tracking-widest text-xs">
                        No notifications found in database
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
