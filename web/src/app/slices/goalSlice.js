import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={
    loading: false,
    userGoals:[],
    error: '' 
}

export const fetchUserGoals = createAsyncThunk('goals/getGoals', async () => {
    const response = await axios.get('/goals');
    return response.data;
})

export 

const userGoalsSlice = createSlice({
    name: 'goals',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUserGoals.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUserGoals.fulfilled, (state, action) => {
            state.loading = false;
            state.userGoals = action.payload;
            state.error = '';
        });
        builder.addCase(fetchUserGoals.rejected, (state, action) => {
            state.loading = false;
            state.userGoals = [];
            state.error = action.error.message;
        });
    }
})

export default userGoalsSlice.reducer;