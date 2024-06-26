import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoggedUser, UserCredentials } from '../../features/auth/types/logged-user.type';
import { EditTheme, NewTheme, Theme } from '@/features/admin/types/theme.types';
import { RootState } from '../store';
import { CustomPaginationParams, PaginatedResponse, NotPaginationParams } from '@/types/pagination.types';
import { EditRegion, NewRegion, Region } from '@/features/admin/types/region.types';
import { Country } from '@/features/admin/types/country.types';
import {
  CreateWorkshop,
  EditWorkshop,
  Workshop,
  GetOneWorkshop,
  WorkshopWithBooking,
} from '@/features/admin/types/workshop.types';
import { EditOrganisation, NewOrganisation, Organisation } from '@/features/admin/types/organisation.types';
import { EditWine, NewWine, Wine } from '@/features/admin/types/wine.types';
import { CalendarParams } from '@/types/calendarParams.types';
import { Booking, CreateBooking } from '@/features/admin/types/booking.types';

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Themes', 'Regions', 'Countries', 'Organisations', 'Workshop', 'Booking', 'Wine'],
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
    getThemes: builder.query<PaginatedResponse<Theme>, NotPaginationParams>({
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
        url: `workshops?limit=3&dateStart=${new Date}&orderBy=dateStart&orderByDirection=ASC&status=booking`,
        method: 'GET',
      }),
      providesTags: ['Workshop'],
    }),
    getWorkshopsOpened: builder.query<PaginatedResponse<Workshop>, void>({
      query: () => ({
        url: `workshops?dateStart=${new Date}&orderBy=dateStart&orderByDirection=ASC&status=booking`,
        method: 'GET',
      }),
      providesTags: ['Workshop'],
    }),
    getOneWorkshop: builder.query<WorkshopWithBooking, string>({
      query: (id) => ({
        url: `workshops/${id}`,
        method: 'GET',
      }),
      providesTags: ['Workshop', 'Booking'],
    }),
    createWorkshop: builder.mutation<Workshop, CreateWorkshop>({
      query: (body) => ({
        url: 'workshops',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Workshop'],
    }),
    editWorkshop: builder.mutation<Workshop, EditWorkshop>({
      query: (body) => {
        const { id, ...rest } = body;
        return {
          url: `workshops/${id}`,
          method: 'PUT',
          body: rest,
        };
      },
      invalidatesTags: ['Workshop'],
    }),
    deleteWorkshop: builder.mutation<void, string>({
      query: (id) => ({
        url: `workshops/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workshop'],
    }),
    finishWorkshop: builder.mutation<void, number>({
      query: (id) => ({
        url: `workshops/${id}/finished`,
        method: 'POST',
      }),
      invalidatesTags: ['Workshop'],
    }),
    cancelWorkshop: builder.mutation<void, number>({
      query: (id) => ({
        url: `workshops/${id}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: ['Workshop'],
    }),
    openWorkshop: builder.mutation<void, number>({
      query: (id) => ({
        url: `workshops/${id}/open`,
        method: 'POST',
      }),
      invalidatesTags: ['Workshop'],
    }),
    getCountries: builder.query<Country[], void>({
      query: () => ({
        url: 'countries',
        method: 'GET',
      }),
      providesTags: ['Countries'],
    }),
    getRegions: builder.query<PaginatedResponse<Region>, NotPaginationParams>({
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
    getWines: builder.query<PaginatedResponse<Wine>, NotPaginationParams>({
      query: (params) => ({
        url: 'wines',
        method: 'GET',
        params,
      }),
      providesTags: ['Regions', 'Wine'],
    }),
    createWine: builder.mutation<Wine, NewWine>({
      query: (body) => ({
        url: 'wines',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Wine'],
    }),
    editWine: builder.mutation<Wine, EditWine>({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `wines/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Regions', 'Wine'],
    }),
    editWineQuantity: builder.mutation<Wine, { id: number; quantity: number }>({
      query: (data) => {
        const { id, quantity } = data;
        return {
          url: `wines/${id}`,
          method: 'PUT',
          body: { quantity },
        };
      },
      invalidatesTags: ['Wine'],
    }),
    getOneWine: builder.query<Wine, number>({
      query: (id) => ({
        url: `wines/${id}`,
        method: 'GET',
      }),
      providesTags: ['Regions'],
    }),
    deleteWine: builder.mutation<void, number>({
      query: (id) => ({
        url: `wines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Regions'],
    }),
    getOrganisations: builder.query<PaginatedResponse<Organisation>, NotPaginationParams>({
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
    validateBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `bookings/${id}/validate`,
        method: 'POST',
      }),
      invalidatesTags: ['Booking'],
    }),
    cancelBooking: builder.mutation<void, number>({
      query: (id) => ({
        url: `bookings/${id}/cancel`,
        method: 'POST',
      }),
      invalidatesTags: ['Booking'],
    }),
    getWorkshopsForCalendar: builder.query<Workshop[], CalendarParams>({
      query: (params) => ({
        url: `workshops/calendar`,
        method: 'GET',
        params,
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
  useDeleteWorkshopMutation,
  useFinishWorkshopMutation,
  useCancelWorkshopMutation,
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
  useGetWinesQuery,
  useCreateWineMutation,
  useEditWineMutation,
  useGetOneWineQuery,
  useDeleteWineMutation,
  useGetWorkshopsOpenedQuery,
  useGetOneWorkshopQuery,
  useCreateBookingMutation,
  useGetWorkshopsForCalendarQuery,
  useCreateWorkshopMutation,
  useEditWorkshopMutation,
  useValidateBookingMutation,
  useCancelBookingMutation,
  useOpenWorkshopMutation,
  useEditWineQuantityMutation,
} = apiSlice;
