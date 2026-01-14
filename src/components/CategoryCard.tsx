import { Bell, Megaphone, ListTodo } from "lucide-react";
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "@/redux/features/subscribe/subscribe.api";

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

interface CategoryCardProps {
  category: string;
  isSubscribed: boolean;
  isAuthenticated: boolean;
}

export const CategoryCard = ({
  category,
  isSubscribed,
  isAuthenticated,
}: CategoryCardProps) => {
  const [subscribe, { isLoading: isSubLoading }] = useSubscribeMutation();
  const [unsubscribe, { isLoading: isUnsubLoading }] = useUnsubscribeMutation();

  const handleToggleSubscription = async () => {
    try {
      if (isSubscribed) {
        await unsubscribe({ category }).unwrap();
      } else {
        await subscribe({ category }).unwrap();
      }
    } catch (error) {
      console.error("Mutation failed:", error);
    }
  };

  const Icon = categoryIcons[category] || Bell;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl ${categoryColors[category]} p-6 transition-all duration-200 hover:scale-[1.02]`}
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className={`w-6 h-6 ${categoryIconColors[category]}`} />
        <h3 className="text-lg font-semibold text-foreground capitalize">
          {category}
        </h3>
      </div>

      <button
        onClick={handleToggleSubscription}
        disabled={isSubLoading || isUnsubLoading || !isAuthenticated}
        className={`text-xs cursor-pointer font-medium px-4 py-2 rounded-full transition-all duration-200 ${
          isSubscribed
            ? "bg-foreground/10 text-foreground/60 hover:bg-foreground/15"
            : "bg-foreground/90 text-background hover:bg-foreground"
        } disabled:opacity-40 disabled:cursor-not-allowed`}
      >
        {isSubLoading || isUnsubLoading
          ? "..."
          : isSubscribed
          ? "Unsubscribe"
          : "Subscribe"}
      </button>
    </div>
  );
};
