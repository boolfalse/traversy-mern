
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import goalService from "./goalService";

// initial state
const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: '',
}

export const createGoal = createAsyncThunk('goals/create', async (goal, thunkAPI) => {
    try {
        // we can use thunkAPI to get any state from the store
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.create(goal, token);
    } catch (err) {
        const message = (err.response && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateGoal = createAsyncThunk('goals/update', async (goal, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.update(goal, token);
    } catch (err) {
        const message = (err.response && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const deleteGoal = createAsyncThunk('goals/delete', async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.delete(goalId, token);
    } catch (err) {
        const message = (err.response && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const getGoals = createAsyncThunk('goals/all', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await goalService.all(token);
    } catch (err) {
        const message = (err.response && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        // synchronous actions in 'reducers'
        reset: (state) => {
            return initialState; // instead of below block
            // state.goals = [];
            // state.isLoading = false;
            // state.isSuccess = false;
            // state.isError = false;
            // state.message = '';
        },
    },
    extraReducers: (builder) => {
        // asynchronous actions in 'extraReducers'
        builder
            .addCase(createGoal.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                // state.goals = [...state.goals, action.payload];
                state.goals.push(action.payload);
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getGoals.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = action.payload;
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteGoal.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.goals = state.goals.filter((goal) => {
                    return goal.id !== action.payload.id;
                });
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
            // .addCase(updateGoal.pending, (state, action) => {
            //     state.isLoading = true;
            // })
            // .addCase(updateGoal.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.goals = state.goals.map(goal => {
            //         if (goal.id === action.payload.id) {
            //             return action.payload;
            //         }
            //         return goal;
            //     }).filter(goal => goal.id !== action.payload.id);
            // })
            // .addCase(updateGoal.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // })
    }
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
