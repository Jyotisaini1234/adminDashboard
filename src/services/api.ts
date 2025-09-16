import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TourPackage, SightTour, CarType, Hotels, Activity } from '../types/types';

const API_BASE_URL = 'http://ec2-65-0-103-101.ap-south-1.compute.amazonaws.com:8081';

export const apiService = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  tagTypes: ['Package', 'SightTour', 'CarType', 'Hotel','Activity'],
  endpoints: (builder) => ({
    getPackages: builder.query<TourPackage[], void>({
      query: () => '/packages',
      providesTags: ['Package'],
    }),
    getPackageById: builder.query<TourPackage, string | number>({
      query: (id) => `/packages/${id}`,
      providesTags: ['Package'],
    }),
    createPackage: builder.mutation<TourPackage, Partial<TourPackage>>({
      query: (newPackage) => ({
        url: '/packages',
        method: 'POST',
        body: newPackage,
      }),
      invalidatesTags: ['Package'],
    }),
    updatePackage: builder.mutation<TourPackage, { id: string | number; data: Partial<TourPackage> }>({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Package'],
    }),
    deletePackage: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Package'],
    }),

    getSightTours: builder.query<SightTour[], void>({
      query: () => '/sight-tours',
      providesTags: ['SightTour'],
    }),
    getSightTourById: builder.query<SightTour, string | number>({
      query: (id) => `/sight-tours/${id}`,
      providesTags: ['SightTour'],
    }),
    createSightTour: builder.mutation<SightTour, Partial<SightTour>>({
      query: (newSightTour) => ({
        url: '/sight-tours',
        method: 'POST',
        body: newSightTour,
      }),
      invalidatesTags: ['SightTour'],
    }),
    updateSightTour: builder.mutation<SightTour, { id: string | number; data: Partial<SightTour> }>({
      query: ({ id, data }) => ({
        url: `/sight-tours/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SightTour'],
    }),
    deleteSightTour: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/sight-tours/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SightTour'],
    }),

    getCarTypes: builder.query<CarType[], void>({
      query: () => '/car-types',
      providesTags: ['CarType'],
    }),
    getCarTypeById: builder.query<CarType, string | number>({
      query: (id) => `/car-types/${id}`,
      providesTags: ['CarType'],
    }),
    createCarType: builder.mutation<CarType, Partial<CarType>>({
      query: (newCarType) => ({
        url: '/car-types',
        method: 'POST',
        body: newCarType,
      }),
      invalidatesTags: ['CarType'],
    }),
    updateCarType: builder.mutation<CarType, { id: string | number; data: Partial<CarType> }>({
      query: ({ id, data }) => ({
        url: `/car-types/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CarType'],
    }),
    deleteCarType: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/car-types/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CarType'],
    }),

    getHotels: builder.query<Hotels[], void>({
      query: () => '/hotels',
      providesTags: ['Hotel'],
    }),
    getHotelById: builder.query<Hotels, string | number>({
      query: (id) => `/hotels/${id}`,
      providesTags: ['Hotel'],
    }),
    createHotel: builder.mutation<Hotels, Partial<Hotels>>({
      query: (newHotel) => ({
        url: '/hotels',
        method: 'POST',
        body: newHotel,
      }),
      invalidatesTags: ['Hotel'],
    }),
    updateHotel: builder.mutation<Hotels, { id: string | number; data: Partial<Hotels> }>({
      query: ({ id, data }) => ({
        url: `/hotels/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Hotel'],
    }),
    deleteHotel: builder.mutation<void, string | number>({
      query: (id) => ({
        url: `/hotels/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Hotel'],
    }),
    getActivities: builder.query<Activity[], void>({
      query: () => '/activities',
      providesTags: ['Activity'],
    }),
    
    getActivitiesBySight: builder.query<Activity[], string>({
      query: (sightCode) => `/activities/by-sight/${sightCode}`,
      providesTags: ['Activity'],
    }),
    
    getActivityById: builder.query<Activity, string>({
      query: (id) => `/activities/${id}`,
      providesTags: ['Activity'],
    }),
    
    createActivity: builder.mutation<Activity, Partial<Activity>>({
      query: (activity) => ({
        url: '/activities',
        method: 'POST',
        body: activity,
      }),
      invalidatesTags: ['Activity'],
    }),
    
    updateActivity: builder.mutation<Activity, { id: string; data: Partial<Activity> }>({
      query: ({ id, data }) => ({
        url: `/activities/${id}`,
        method: 'PUT', 
        body: data,
      }),
      invalidatesTags: ['Activity'],
    }),
    
    deleteActivity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Activity'],
    }),
    
  }),
});

export const {
  // Packages hooks
  useGetPackagesQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  
  // Sight Tours hooks
  useGetSightToursQuery,
  useGetSightTourByIdQuery,
  useCreateSightTourMutation,
  useUpdateSightTourMutation,
  useDeleteSightTourMutation,
  
  // Car Types hooks
  useGetCarTypesQuery,
  useGetCarTypeByIdQuery,
  useCreateCarTypeMutation,
  useUpdateCarTypeMutation,
  useDeleteCarTypeMutation,
  
  // Hotels hooks
  useGetHotelsQuery,
  useGetHotelByIdQuery,
  useCreateHotelMutation,
  useUpdateHotelMutation,
  useDeleteHotelMutation,

  ////activities
  useGetActivitiesQuery,
  useGetActivitiesBySightQuery,
  useGetActivityByIdQuery,
  useCreateActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,

} = apiService;