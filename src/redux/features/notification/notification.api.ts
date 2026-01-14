import { baseApi } from "@/redux/baseApi";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserNotification: builder.query({
      query: () => ({
        url: "/user-notification",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Notifications"],
    }),
    markAsRead: builder.mutation({
      query: (id: string) => ({
        url: `/user-notification/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications"],
    }),
    getAllNotification: builder.query({
      query: () => ({
        url: "/notification",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetUserNotificationQuery,
  useMarkAsReadMutation,
  useGetAllNotificationQuery,
} = notificationApi;
