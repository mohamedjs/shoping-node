import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from "../axios.js"


export const getAllProducts = createAsyncThunk(
    'product',
    async (search, thunkApi) => {
        try {
            const response = await (search ? axios.get(`/products/search?q=${search}`) : axios.get(`/products`));
            console.log(response);
            return response.data
        } catch (err) {
            if (!err.response) {
                return thunkApi.rejectWithValue( err )
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const getProductById = createAsyncThunk(
    'getProduct',
    async (id, thunkApi) => {
        try {
            const response = await axios.get(`/products/${id}`)
            return response.data
        } catch (err) {
            if (!err.response) {
                return thunkApi.rejectWithValue( err )
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const getProductByCategoryName = createAsyncThunk(
    'getProductByCategoryName',
    async (categoryName, thunkApi) => {
        try {
            const response = await axios.get(`/products/category/${categoryName}`)
            return response.data
        } catch (err) {
            if (!err.response) {
                return thunkApi.rejectWithValue( err )
            }
            return thunkApi.rejectWithValue(err.response.data)
          }

    }
)

export const productSlice = createSlice({
    name: 'chat',
    initialState: {
        products: [],
        product: {},
        loading: false,
    },
    reducers: {
        
    },
    extraReducers:  {
        [getAllProducts.pending]: (state, action) => {
            state.loading = true
        },
        [getAllProducts.fulfilled]: (state, action) => {
            state.products = action.payload.products
            state.loading = false
        },
        [getAllProducts.rejected]: (state, action) => {
            console.log(action.payload);

        },
        [getProductById.pending]: (state, action) => {
            state.loading = true
        },
        [getProductById.fulfilled]: (state, action) => {
            state.product = action.payload
            state.loading = false
        },
        [getProductById.rejected]: (state, action) => {
            console.log(action.payload);

        },
        [getProductByCategoryName.pending]: (state, action) => {
            state.loading = true
        },
        [getProductByCategoryName.fulfilled]: (state, action) => {
            state.products = action.payload.products
            state.loading = false
        },
        [getProductByCategoryName.rejected]: (state, action) => {
            console.log(action.payload);

        }
    }
})

export default productSlice.reducer