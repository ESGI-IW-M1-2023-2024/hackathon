import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoggedUser, UserCredentials } from '../../features/auth/types/logged-user.type';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoggedUser, UserCredentials>({
      query: (body: UserCredentials) => ({
        url: 'login',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginUserMutation } = apiSlice;
