import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Order } from "../../app/models/order";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const ordersAdapter = createEntityAdapter<Order>();

export const fetchOrdersAsync = createAsyncThunk<Order[]>(
    'orders/fetchOrdersAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Orders.list();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchOrderAsync = createAsyncThunk<Order, number>(
    'orders/fetchOrderAsync',
    async (orderId, thunkAPI) => {
        try {
            return await agent.Orders.fetch(orderId)
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: ordersAdapter.getInitialState({
        ordersLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    extraReducers: (builder => {
        builder.addCase(fetchOrdersAsync.pending, (state) => {
            state.status = 'pendingFetchOrders';
        });
        builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
            ordersAdapter.setAll(state, action.payload);
            state.status = 'idle'
            state.ordersLoaded = true
        });
        builder.addCase(fetchOrdersAsync.rejected, (state) => {
            state.status = 'idle'
        });
        builder.addCase(fetchOrderAsync.pending, (state) => {
            state.status = 'pendingFetchOrder';
        });
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            ordersAdapter.upsertOne(state, action.payload)
            state.status = 'idle'
            state.ordersLoaded = true
        });
        builder.addCase(fetchOrderAsync.rejected, (state) => {
            state.status = 'idle'
        });
    })
})

export const orderSelectors = ordersAdapter.getSelectors((state: RootState) => state.orders);