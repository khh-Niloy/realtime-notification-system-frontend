import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubscriptionsCategories } from "@/constant/subscriptionArr";
import toast from "react-hot-toast";
import { ArrowLeft, Save, Edit, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  notificationApi,
  useGetNotificationByIdQuery,
} from "@/redux/features/notification/notification.api";
import { socket } from "@/lib/socket";
import { useDispatch } from "react-redux";

const notificationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
});

type NotificationSchema = z.infer<typeof notificationSchema>;

export const EditNotification = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: notification, isLoading } = useGetNotificationByIdQuery(
    id as string,
    {
      skip: !id,
    }
  );

  const form = useForm<NotificationSchema>({
    resolver: zodResolver(notificationSchema),
    values: notification
      ? {
          title: notification.title,
          message: notification.message,
          category: notification.category,
        }
      : {
          title: "",
          message: "",
          category: "",
        },
  });

  const {
    handleSubmit,
    control,
    formState: { dirtyFields, isSubmitting },
  } = form;

  const onSubmit = async (data: NotificationSchema) => {
    // Only send the fields that have been modified (dirtyFields)
    const updatedData = Object.keys(dirtyFields).reduce((acc: any, key) => {
      acc[key] = (data as any)[key];
      return acc;
    }, {});

    if (Object.keys(updatedData).length === 0) {
      toast.error("No changes detected");
      return;
    }

    try {
      console.log("Updating fields:", updatedData);
      socket.emit("update-notification", { _id: id, ...updatedData });
      dispatch(notificationApi.util.invalidateTags(["Notifications"]));
      toast.success("Notification updated and broadcasted!");
      navigate("/admin/notification-list");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to update notification");
    }
  };

  if (isLoading || !notification) {
    return (
      <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
          Loading notification details...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-1 mb-10 text-center md:text-left">
        <Link
          to="/admin/notification-list"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-all mb-4 group"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back to repository
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
          <div className="w-16 h-16 rounded-3xl bg-foreground text-background flex items-center justify-center shadow-2xl shadow-foreground/10">
            <Edit className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-4xl font-bold text-foreground uppercase tracking-tighter leading-none">
              Edit Broadcast
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
              MODIFY AND RE-BROADCAST NOTIFICATION
            </p>
          </div>
        </div>
      </div>

      <div
        key={notification?._id}
        className="bg-background border border-border/50 rounded-[3rem] p-10 shadow-2xl shadow-foreground/[0.02]"
      >
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block">
                      NOTIFICATION TITLE
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Maintenance Update"
                        {...field}
                        className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:border-foreground focus:bg-background transition-all font-bold px-6"
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block">
                      DISTRIBUTION CATEGORY
                    </FormLabel>
                    <Select
                      key={field.value}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-14 rounded-2xl bg-muted/20 border-border/40 focus:border-foreground focus:bg-background transition-all font-bold px-6 capitalize">
                          <SelectValue placeholder="Select target category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-2xl border-border/40 shadow-xl p-2">
                        {SubscriptionsCategories.map((cat) => (
                          <SelectItem
                            key={cat}
                            value={cat}
                            className="rounded-xl capitalize cursor-pointer focus:bg-muted font-bold py-3 px-4"
                          >
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block">
                      BROADCAST MESSAGE
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter modified message..."
                        className="min-h-[150px] rounded-2xl bg-muted/20 border-border/40 focus:border-foreground focus:bg-background transition-all resize-none font-bold p-6 leading-relaxed"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px] font-bold" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(dirtyFields).length === 0}
              className="w-full h-16 rounded-3xl font-bold uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-foreground/10"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {Object.keys(dirtyFields).length === 0
                ? "No Changes"
                : "Save and Re-broadcast"}
            </Button>
          </form>
        </Form>
      </div>

      {/* Info Card */}
      <div className="mt-8 p-6 bg-muted/20 rounded-3xl border border-dashed border-border/60">
        <p className="text-[10px] font-bold text-muted-foreground text-center uppercase tracking-widest leading-relaxed">
          Saving changes will automatically update the notification in all
          subscriber feeds and reset their "Unread" status indicators.
        </p>
      </div>
    </div>
  );
};
