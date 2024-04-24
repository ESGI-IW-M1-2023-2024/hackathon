import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoggedUser, UserCredentials } from '../../features/auth/types/logged-user.type';
import { EditTheme, NewTheme, Theme } from '@/features/admin/types/theme.types';
import { RootState } from '../store';
import { CustomPaginationParams, PaginatedResponse } from '@/types/pagination.types';
import { Workshop } from '@/features/admin/types/workshop.types';

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
    createTheme: builder.mutation<Theme, NewTheme>({
      query: (body) => ({
        url: 'themes/',
        method: 'POST',
        body,
      }),
    }),
    editTheme: builder.mutation<Theme, EditTheme>({
      query: (body) => ({
        url: `themes/${body.id}`,
        method: 'PUT',
        body: {
          label: body.label,
          content: body.content,
          subtitle: body.subtitle,
          file: body.file,
        },
      }),
    }),
    deleteTheme: builder.mutation<void, number>({
      query: (id) => ({
        url: `themes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Themes'],
    }),
    getWorkshops: builder.query<PaginatedResponse<Workshop>, void>({
      query: () => ({
        url: 'workshops',
        method: 'GET',
      }),
    }),
    getOneTheme: builder.query<Theme, number>({
      query: (id) => ({
        url: `themes/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const {
  useLoginUserMutation,
  useGetThemesQuery,
  useCreateThemeMutation,
  useEditThemeMutation,
  useDeleteThemeMutation,
  useGetWorkshopsQuery,
  useGetOneThemeQuery,
} = apiSlice;
