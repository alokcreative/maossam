import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseUrl from '../../utiles/BaseUrls';

// import {BASE_URL} from '../constants'
// import { createApi } from '@reduxjs/toolkit/dist/query'
const baseQuery = fetchBaseQuery({ baseUrl });

const apiSlice = createApi({
	reducerPath: 'apiSlice',
	baseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({}),
});

export default apiSlice;
