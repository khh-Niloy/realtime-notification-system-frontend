import { Bell, Megaphone, ListTodo } from "lucide-react";

export const SubscriptionsCategories = ["system", "task", "announcement"];

export const Role = {
  admin: "admin",
  user: "user",
};
export type TRole = "admin" | "user";

export const categoryIcons: Record<string, any> = {
  system: Bell,
  task: ListTodo,
  announcement: Megaphone,
};

export const categoryColors: Record<string, string> = {
  system: "bg-blue-50/80 dark:bg-blue-950/30",
  task: "bg-purple-50/80 dark:bg-purple-950/30",
  announcement: "bg-orange-50/80 dark:bg-orange-950/30",
};

export const categoryIconColors: Record<string, string> = {
  system: "text-blue-500",
  task: "text-purple-500",
  announcement: "text-orange-500",
};
