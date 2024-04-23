import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoggedUser, UserCredentials } from '../../features/auth/types/logged-user.type';
import { Theme } from '@/features/admin/types/theme.types';
import { RootState } from '../store';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, api) => {
      const loggedUser = (api.getState() as RootState).user;
      if (loggedUser) {
        headers.set('Authorization', `Bearer ${loggedUser.token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoggedUser, UserCredentials>({
      query: (body: UserCredentials) => ({
        url: 'login',
        method: 'POST',
        body: body,
      }),
    }),
    getThemes: builder.query<Theme, void>({
      query: () => ({
        url: 'themes',
        method: 'GET',
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginUserMutation, useGetThemesQuery } = apiSlice;
