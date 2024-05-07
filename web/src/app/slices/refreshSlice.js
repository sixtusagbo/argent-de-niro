import { axiosForm } from "../../api/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
    loading: false,
    user: [],
    accessToken: '',
    refreshToken: '',
    error: ''
}

export const refreshToken = createAsyncThunk('auth/refresh', async() => {
    const response = await axiosForm.get('/refresh', {
        headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
})

const userRefreshSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(refreshToken.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.access_token;
            state.refresh = action.payload.refresh_token;
            state.error = '';
        });
        builder.addCase(refreshToken.rejected, (state, action) => {
            state.loading = false;
            state.user = [];
            state.accessToken = '';
            state.refresh = '';
            state.error = action.error.message;
        });
    }
})

export default userRefreshSlice.reducer;
