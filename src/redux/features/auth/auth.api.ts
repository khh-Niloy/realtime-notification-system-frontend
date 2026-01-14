import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/auth/getMe",
        method: "GET",
      }),
      transformResponse: (response: any) => response.data,
      // providesTags: ["USER"]
    }),
    useLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      // invalidatesTags: ["USER"],
    }),
  }),
});

export const { useLoginMutation, useUserInfoQuery, useUseLogoutMutation } =
  authApi;
