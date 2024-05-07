import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from './slices/userSlice';
import userGoalsReducer from './slices/goalSlice';
import { user } from '../data';
import userRefreshReducer from './slices/refreshSlice';


const store = configureStore({
    reducer: {
        user: userAuthReducer,
        userGoals: userGoalsReducer,
        auth: userRefreshReducer,
    },
})

export default store;