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
    getNotificationById: builder.query({
      query: (id: string) => ({
        url: `/notification/${id}`,
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      providesTags: ["Notifications"],
    }),
    deleteNotification: builder.mutation({
      query: (id: string) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetUserNotificationQuery,
  useMarkAsReadMutation,
  useGetAllNotificationQuery,
  useGetNotificationByIdQuery,
  useDeleteNotificationMutation,
} = notificationApi;
