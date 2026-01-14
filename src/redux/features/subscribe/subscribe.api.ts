import { baseApi } from "@/redux/baseApi";

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    subscribe: builder.mutation({
      query: (data: { category: string }) => ({
        url: "/subscription/subscribe",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    unsubscribe: builder.mutation({
      query: (data: { category: string }) => ({
        url: "/subscription/unsubscribe",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Subscriptions"],
    }),
    getSubscriptions: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Subscriptions"],
    }),
  }),
});

export const {
  useSubscribeMutation,
  useUnsubscribeMutation,
  useGetSubscriptionsQuery,
} = subscriptionsApi;
