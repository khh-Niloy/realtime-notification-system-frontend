import { SubscriptionsCategories } from "@/constant/subscriptionArr";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { useGetSubscriptionsQuery } from "@/redux/features/subscribe/subscribe.api";
import { CategoryCard } from "./CategoryCard";

export const SubscriptionCards = () => {
  const { data: me } = useUserInfoQuery(undefined);
  const { data: subscriptions } = useGetSubscriptionsQuery(undefined);

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Notification Categories
        </h2>
        <p className="text-sm text-muted-foreground">
          Subscribe to categories that matter to you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SubscriptionsCategories.map((category) => (
          <CategoryCard
            key={category}
            category={category}
            isSubscribed={subscriptions?.includes(category) || false}
            isAuthenticated={!!me}
          />
        ))}
      </div>

      {!me && (
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            <a
              href="/login"
              className="font-medium text-foreground hover:underline"
            >
              Login
            </a>{" "}
            to manage subscriptions
          </p>
        </div>
      )}
    </div>
  );
};
