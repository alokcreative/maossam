import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../../utiles/BaseUrls';

const baseQuery = fetchBaseQuery({ baseUrl });
const apiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery,
	tagTypes: ['Register', 'Login', 'User', 'Profile', 'Goal'],
	refetchOnReconnect: true,
	keepUnusedDataFor: 30,
	endpoints: (builder) => ({}),
});

export default apiSlice;
