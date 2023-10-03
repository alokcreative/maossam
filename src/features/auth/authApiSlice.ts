import apiSlice from './apiSlice';
import apiEndpoints from '../../utiles/ApiRoute';

interface IPayload {
	email: string;
	loginPassword: string;
}

interface PPayload {
	id: string;
	first_name: string;
	last_name: string;
	email: string;
	src: string;
	gender: string;
	role: string;
	// teamMember: string;
	country: string;
	company: string;
	state: string;
	phone_number: string;
}
export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Previous Dummy API
		getUser: builder.mutation({
			query: (payload: IPayload) => ({
				url: apiEndpoints.login,
				method: 'POST',
				body: payload,
				headers: {
					'X-RapidAPI-Key': '5d8641db9fmsh04c1a1beb6e16e6p157d76jsn553e9f6dbc5a',
					'Content-Type': 'application/json',
					'X-RapidAPI-Host': 'logintesting.p.rapidapi.com',
				},
			}),
		}),

		// Profile
		getProfile: builder.query({
			query: (id) => ({
				url: apiEndpoints.profile + id,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzQ4OTUxLCJpYXQiOjE2OTYzMjczNTEsImp0aSI6Ijk4YzU3OGQxMzc0ZjQ1ZTdiNTA2YmEwNGIwYWM1OTZmIiwidXNlcl9pZCI6MTAxfQ.vK8AvI3GHQOQN0LRCoNahaFBB7JYsl-sztNAjMEQJKM`,
				},
			}),
		}),

		// Create Profile
		createProfile: builder.mutation({
			query: (payload: PPayload) => ({
				url: apiEndpoints.profile,
				method: 'POST',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Profile Update
		updateProfile: builder.mutation({
			query: (payload: PPayload) => ({
				url: `${apiEndpoints.profile}${payload.id}/`,
				method: 'PATCH',
				body: payload,
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzQ4OTUxLCJpYXQiOjE2OTYzMjczNTEsImp0aSI6Ijk4YzU3OGQxMzc0ZjQ1ZTdiNTA2YmEwNGIwYWM1OTZmIiwidXNlcl9pZCI6MTAxfQ.vK8AvI3GHQOQN0LRCoNahaFBB7JYsl-sztNAjMEQJKM`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),

		// Get Profile
		deleteProfile: builder.mutation({
			query: ({ id, ...rest }: PPayload) => ({
				url: apiEndpoints.profile + id,
				method: 'DELETE',
				body: rest,
				headers: {
					'Content-Type': 'application/json',
					// Authorization: `Bearer ${localStorage.getItem('access_token')}`,
					Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MzQ4OTUxLCJpYXQiOjE2OTYzMjczNTEsImp0aSI6Ijk4YzU3OGQxMzc0ZjQ1ZTdiNTA2YmEwNGIwYWM1OTZmIiwidXNlcl9pZCI6MTAxfQ.vK8AvI3GHQOQN0LRCoNahaFBB7JYsl-sztNAjMEQJKM`,
				},
			}),
			invalidatesTags: [`Profile`],
		}),
	}),
});

export const {
	useGetUserMutation,
	useGetProfileQuery,
	useCreateProfileMutation,
	useUpdateProfileMutation,
	useDeleteProfileMutation,
} = productsApiSlice;
