import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoggedUser, UserCredentials } from '../../features/auth/types/logged-user.type';
import { EditTheme, NewTheme, Theme } from '@/features/admin/types/theme.types';
import { RootState } from '../store';
import { CustomPaginationParams, PaginatedResponse } from '@/types/pagination.types';
import { EditRegion, NewRegion, Region } from '@/features/admin/types/region.types';
import { Country } from '@/features/admin/types/country.types';
import { Workshop } from '@/features/admin/types/workshop.types';
import { EditOrganisation, NewOrganisation, Organisation } from '@/features/admin/types/organisation.types';
import { Booking, CreateBooking } from '@/features/admin/types/booking.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Themes', 'Regions', 'Countries', 'Organisations', 'Workshop', 'Booking'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, api) => {
      const loggedUser = (api.getState() as RootState).user;
      if (loggedUser) {
        headers.set('Authorization', `Bearer ${loggedUser.token}`);
      }
    },
    fetchFn: async (url, options) => {
      try {
        const response = await fetch(url, options);
        if (response.status === 401) {
          window.location.href = '/login';
        }
        return response;
      } catch (error) {
        throw error;
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
    getOneTheme: builder.query<Theme, number>({
      query: (id) => ({
        url: `themes/${id}`,
        method: 'GET',
      }),
    }),
    createTheme: builder.mutation<Theme, NewTheme>({
      query: (body) => ({
        url: 'themes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Themes'],
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
      invalidatesTags: ['Themes'],
    }),
    deleteTheme: builder.mutation<void, number>({
      query: (id) => ({
        url: `themes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Themes'],
    }),
    getWorkshops: builder.query<PaginatedResponse<Workshop>, CustomPaginationParams>({
      query: (params) => ({
        url: 'workshops',
        method: 'GET',
        params,
      }),
      providesTags: ['Workshop'],
    }),
    getThreeLastWorkshops: builder.query<PaginatedResponse<Workshop>, void>({
      query: () => ({
        url: 'workshops?limit=3&dateStart=2024-04-25&orderBy=dateStart&orderByDirection=ASC',
        method: 'GET',
      }),
      providesTags: ['Workshop'],
    }),
    getOneWorkshop: builder.query<Workshop, string>({
      query: (id) => ({
        url: `workshops/${id}`,
        method: 'GET',
      }),
      providesTags: ['Workshop'],
    }),
    getCountries: builder.query<Country[], void>({
      query: () => ({
        url: 'countries',
        method: 'GET',
      }),
      providesTags: ['Countries'],
    }),
    getRegions: builder.query<PaginatedResponse<Region>, CustomPaginationParams>({
      query: (params) => ({
        url: 'regions',
        method: 'GET',
        params,
      }),
      providesTags: ['Regions'],
    }),
    createRegion: builder.mutation<Region, NewRegion>({
      query: (body) => ({
        url: 'regions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Regions'],
    }),
    editRegion: builder.mutation<Region, EditRegion>({
      query: (body) => ({
        url: `regions/${body.id}`,
        method: 'PUT',
        body: {
          label: body.label,
          country: body.country,
        },
      }),
      invalidatesTags: ['Regions'],
    }),
    getOneRegion: builder.query<Region, number>({
      query: (id) => ({
        url: `regions/${id}`,
        method: 'GET',
      }),
      providesTags: ['Regions'],
    }),
    deleteRegion: builder.mutation<void, number>({
      query: (id) => ({
        url: `regions/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Regions'],
    }),
    getOrganisations: builder.query<PaginatedResponse<Organisation>, CustomPaginationParams>({
      query: (params) => ({
        url: 'organisations',
        method: 'GET',
        params,
      }),
      providesTags: ['Organisations'],
    }),
    createOrganisation: builder.mutation<Organisation, NewOrganisation>({
      query: (body) => ({
        url: 'organisations',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Organisations'],
    }),
    editOrganisation: builder.mutation<Organisation, EditOrganisation>({
      query: (body) => ({
        url: `organisations/${body.id}`,
        method: 'PUT',
        body: {
          label: body.label,
          file: body.logoFile,
        },
      }),
      invalidatesTags: ['Organisations'],
    }),
    getOneOrganisation: builder.query<Organisation, number>({
      query: (id) => ({
        url: `organisations/${id}`,
        method: 'GET',
      }),
      providesTags: ['Organisations'],
    }),
    deleteOrganisation: builder.mutation<void, number>({
      query: (id) => ({
        url: `organisations/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Organisations'],
    }),
    createBooking: builder.mutation<Booking, CreateBooking>({
      query: (body) => ({
        url: 'bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Booking'],
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
  useGetRegionsQuery,
  useGetOneRegionQuery,
  useCreateRegionMutation,
  useEditRegionMutation,
  useDeleteRegionMutation,
  useGetCountriesQuery,
  useCreateOrganisationMutation,
  useDeleteOrganisationMutation,
  useGetOneOrganisationQuery,
  useGetOrganisationsQuery,
  useEditOrganisationMutation,
  useGetThreeLastWorkshopsQuery,
  useGetOneWorkshopQuery,
  useCreateBookingMutation,
} = apiSlice;
