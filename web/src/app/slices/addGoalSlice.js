import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
// import useAuth from '../../hooks/useAuth';
import { axiosForm } from '../../api/axios';

const initialState = {
    sent: false,
    error: ''
}

export const addGoal = createAsyncThunk('user/addGoal', async(formData) => {
    const response = await axiosForm.post('/goals', formData);
    return response.data;
})

const addGoalSlice = createSlice({
    name: 'addGoal',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addGoal.pending, (state, action) => {
            state.sent = false;
        });
        builder.addCase(addGoal.fulfilled, (state, action) => {
            state.sent = true;
            state.error = '';
        });
        builder.addCase(addGoal.rejected, (state, action) => {
            state.sent = false;
            state.error = action.error.message;
        });
    }
})