import { SubscriptionsCategories } from "@/constant/subscriptionArr";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetSubscriptionsQuery } from "@/redux/features/subscribe/subscribe.api";
import { CategoryCard } from "@/components/CategoryCard";
import { Link } from "react-router-dom";
import { ArrowLeft, Inbox } from "lucide-react";

export const MySubscriptions = () => {
  const { data: me } = useUserInfoQuery(undefined);
  const { data: subscriptions, isLoading } =
    useGetSubscriptionsQuery(undefined);

  const activeSubscriptions = SubscriptionsCategories.filter((category) =>
    subscriptions?.includes(category)
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">
          Loading subscriptions...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="space-y-1">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Home
          </Link>
          <h2 className="text-3xl font-bold text-foreground">
            My Subscriptions
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage the categories you are currently following
          </p>
        </div>
      </div>

      {activeSubscriptions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeSubscriptions.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              isSubscribed={true}
              isAuthenticated={!!me}
            />
          ))}
        </div>
      ) : (
        <div className="bg-muted/30 rounded-3xl p-12 text-center space-y-4 border border-dashed border-muted">
          <div className="w-12 h-12 bg-muted rounded-2xl flex items-center justify-center mx-auto text-muted-foreground">
            <Inbox className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-lg font-semibold text-foreground">
              No active subscriptions
            </p>
            <p className="text-sm text-muted-foreground">
              You haven't subscribed to any notification categories yet.
            </p>
          </div>
          <Link
            to="/"
            className="inline-block bg-foreground text-background text-xs font-medium px-6 py-2.5 rounded-full hover:bg-foreground/90 transition-all active:scale-95"
          >
            Explore Categories
          </Link>
        </div>
      )}
    </div>
  );
};
