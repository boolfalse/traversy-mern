
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import authService from "./authService";

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// initial state
const initialState = {
    user: user ? user : null, // user
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

// register the user
// we'll import and use this in Register.jsx
export const register = createAsyncThunk(
    'auth/register', // action name
    async (
        // the first argument is the payload.
        // we'll dispatch "register" action in somewhere (in our case in register component),
        // and this (user) will be passed to the thunk from the action creator (dispatcher)
        user,
        // the second argument is the thunk API.
        thunkAPI
    ) => { // async function to call
        try {
            // we'll use this below to dispatch the "success" action (case: fulfilled)
            return await authService.register(user);
        } catch (err) {
            const message = (err.response && err.response.data.message) || err.message || err.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// user logout
export const logout = createAsyncThunk('auth/logout', async (user, thunkAPI) => {
    try {
        return await authService.logout(); // no need to pass user
    } catch (err) {
        const message = (err.response && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// login the user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user);
    } catch (err) {
        const message = (err.response && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // synchronous actions in 'reducers'
        // dispatch this action after register and reset it back to initial state
        reset: (state) => { // we'll import and use this in Register.jsx
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        // asynchronous actions in 'extraReducers'
        builder
            // what to set the state in case when register action is dispatched
            .addCase(register.pending, (state, action) => {
                state.isLoading = true;
            })
            // what to set the state in case when register action is resolved and data gets returned
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload; // from createAsyncThunk (from "try" body)
            })
            // what to set the state in case when register action is rejected
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload; // from createAsyncThunk rejectWithValue (from "catch" body)
                state.user = null;
            })
            .addCase(login.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.user = null;
            })
    }
});

// for exporting the reducer functions
// so with this way we can dispatch that into some component
export const { reset } = authSlice.actions;
export default authSlice.reducer;
