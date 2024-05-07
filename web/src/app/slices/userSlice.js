/**
 * Fle is the user slice to the Redux store
 * It catures basic user information and access token:
 * Info that will go into the menubar
 * Going to pass login info
 * it will accept the form data and send it the sever
 * by making the axios request
 * it will return user infro and acces token and it will set the auth variable
 */

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import useAuth from '../../hooks/useAuth';
import { axiosForm } from '../../api/axios';


const initialState = {
    loading: false,
    user: [],
    accessToken: '',
    error: ''
}

export const logInUser = createAsyncThunk ('user/logIn', async(formData) => {
    const response = await axiosForm.post('/login', formData);
    return response.data;
})


//https://turbo-space-invention-45rvpv95gx63v9w-5000.app.github.dev/

const userAuthSlice = createSlice({
    name: 'user',
    initialState,
    reducer: {
        logOutUser: (state) => {
            state.user = [];
            state.accessToken = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logInUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logInUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.access_token;
            state.error = '';
        });
        builder.addCase(logInUser.rejected, (state, action) => {
            state.loading = false;
            state.user = [];
            state.accessToken = '';
            state.error = action.error.message;
        });
        
    },
})

export default userAuthSlice.reducer;
export const { logOutUser } = userAuthSlice.actions;