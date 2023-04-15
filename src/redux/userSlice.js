import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {server} from '../index'

const initialState = {
    user: '',
    token: '',
    loading: false,
    error: '',
};

export const signupUser = createAsyncThunk('user/signupUser', async (body) => {
    try {
        const res = await axios.post(`${server}/auth/signup`, body);
        return res.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

export const loginUser = createAsyncThunk('user/loginUser', async (body) => {
    try {
        const res = await axios.post(`${server}/auth/signin`, body);
        return res.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = '';
            state.token = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { updateUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
