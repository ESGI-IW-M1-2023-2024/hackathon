import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoggedUser, UserCredentials } from '../../features/auth/types/logged-user.type';
import { Theme } from '@/features/admin/types/theme.types';
import { RootState } from '../store';
import { CustomPaginationParams, PaginatedResponse } from '@/types/pagination.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Themes'],
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
      query: (body) => ({
        url: 'login',
        method: 'POST',
        body,
      }),
    }),
    getThemes: builder.query<PaginatedResponse<Theme>, CustomPaginationParams>({
      query: (params) => ({
        url: 'themes',
        method: 'GET',
        params,
      }),
      providesTags: ['Themes'],
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useLoginUserMutation, useGetThemesQuery } = apiSlice;
