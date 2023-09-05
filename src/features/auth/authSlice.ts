import { createSlice, isAction } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { googleLogout } from '@react-oauth/google';

export interface AuthState {
	user: {
		id: string;
		username: string;
		name: string;
		surname: string;
		email: string;
		isAdmin: boolean;
		src: string;
		srcSet?: string;
		fullImage?: string;
		role?: string;
		company?: string;
		noOfTeam?: string;
		country?: string;
		state?: string;
		phoneNo?: number;
	};
}

const initialState: AuthState = {
	user: {
		id: '',
		username: '',
		name: '',
		surname: '',
		role: '',
		email: '',
		isAdmin: false,
		src: '',
		srcSet: '',
		fullImage: '',
		company: '',
		noOfTeam: '',
		country: '',
		state: '',
		phoneNo: 0,
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
