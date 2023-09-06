import { createSlice, isAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { googleLogout } from '@react-oauth/google';
import { Role } from '../../common/data/userDummyData';

export interface AuthState {
	user: {
		id: string;
		name: string;
		lastname: string;
		email: string;
		password?: string;
		src: string;
		role: Role ;
		teamMember?: string;
		country?: string;
		company?: string;
		state?: string;
		contact?: number;
		about?: { type?: string; exp?: string; FeieldActivity?: string };
	};
}
const savedValue = localStorage?.getItem('user');
const localUser = savedValue ? JSON.parse(savedValue) : null;
const initialState: AuthState = {
	user: {
		id: '',
		name: '',
		lastname: '',
		email: '',
		password: '',
		src: '',
		role: localUser && Number(localUser?.role),
		teamMember: '',
		country: '',
		company: '',
		state: '',
		contact: 0,
		about: { type: '', exp: '', FeieldActivity: '' },
	},
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		signup: (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user;
		},
		login: (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user;
		},
		logout: (state) => {
			state.user = initialState.user;
			localStorage.removeItem('user');
			googleLogout();
		},
		update: (state, action: PayloadAction<AuthState>) => {
			state.user = action.payload.user;
		},
	},
	extraReducers: (builder) => {},
});

export const { signup, logout, login, update } = authSlice.actions;

export default authSlice.reducer;
