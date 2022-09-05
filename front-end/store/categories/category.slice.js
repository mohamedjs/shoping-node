import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../axios.js"


export const getAllCategories = createAsyncThunk(
    'category',
    async (category, thunkApi) => {
        try {
            const response = await (category ? axios.get(`/products/category/${category}`) : axios.get(`/products/categories`));
            return response.data
        } catch (err) {
            if (!err.response) {
                return thunkApi.rejectWithValue( err )
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const categorySlice = createSlice({
    name: 'chat',
    initialState: {
        categories: [],
        load: false
    },
    reducers: {
        
    },
    extraReducers:  {
        [getAllCategories.pending]: (state, action) => {
            state.load = true
        },
        [getAllCategories.fulfilled]: (state, action) => {
            state.categories = action.payload
            state.load = false
        },
        [getAllCategories.rejected]: (state, action) => {
            console.log(action.payload);

        }
    }
})

export default categorySlice.reducer