
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

// get user from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// initial state
const initialState = {
    user: user ?? null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

// register user

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // dispatch this action after register and reset it back to initial state
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        }
    },
    extraReducers: builder => {}
});

// for exporting the reducer functions
// so with this way we can dispatch that to some component
export const { reset } = authSlice.actions;
export default authSlice.reducer;
