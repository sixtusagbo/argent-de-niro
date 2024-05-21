import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState ={
    loading: false,
    userTransactions: [],
    userBudget: [],
    userGoals:[],
    
}
