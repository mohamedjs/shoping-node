import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Cookie from 'js-cookie'
import axios from "../axios.js"


export const signIn = createAsyncThunk(
    'signin',
    async (credentials, thunkApi) => {
        try {
            const response = await axios.post(`/auth/login`, credentials);
            return response.data
        } catch (err) {
            if (!err.response) {
                return thunkApi.rejectWithValue( err )
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        load: false
    },
    reducers: {
        
    },
    extraReducers:  {
        [signIn.pending]: (state, action) => {
            state.load = true
        },
        [signIn.fulfilled]: (state, action) => {
            state.user = action.payload
            Cookie.set("user", JSON.stringify(action.payload))
            console.log(state.user);
            state.load = false
        },
        [signIn.rejected]: (state, action) => {
            console.log(action.payload);

        }
    }
})

export default authSlice.reducer