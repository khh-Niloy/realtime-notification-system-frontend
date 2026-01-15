import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SubscriptionsCategories } from "@/constant/constValues";
import toast from "react-hot-toast";
import { ArrowLeft, BellRing } from "lucide-react";
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
import { socket } from "@/lib/socket";

const notificationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  category: z.string().min(1, "Please select a category"),
});

type NotificationSchema = z.infer<typeof notificationSchema>;

export const CreateNotification = () => {
  const navigate = useNavigate();

  const form = useForm<NotificationSchema>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      title: "",
      message: "",
      category: "",
    },
  });

  const onSubmit = async (data: NotificationSchema) => {
    try {
      // console.log(data);
      socket.emit("send-notification", data);
      toast.success("Notification sent successfully!");
      navigate("/admin/notification-list");
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to send notification");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10">
      <div className="space-y-1 mb-10">
        <Link
          to="/admin/notification-list"
          className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to List
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-foreground/5 flex items-center justify-center">
            <BellRing className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Create Notification
            </h2>
            <p className="text-sm text-muted-foreground">
              Broadcast a new message to your subscribers
            </p>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    NOTIFICATION TITLE
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Maintenance Update"
                      {...field}
                      className="rounded-xl bg-background border-border/50 focus:border-foreground transition-all"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    CATEGORY
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl bg-background border-border/50 focus:border-foreground transition-all capitalize">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-xl">
                      {SubscriptionsCategories.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="capitalize cursor-pointer"
                        >
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase tracking-wider font-bold text-muted-foreground">
                    MESSAGE CONTENT
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the details of your notification..."
                      className="min-h-[150px] rounded-xl bg-background border-border/50 focus:border-foreground transition-all resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-6 rounded-2xl font-semibold bg-foreground text-background hover:bg-foreground/90 transition-all active:scale-[0.98] flex items-center gap-2 cursor-pointer"
            >
              Send Notification
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
