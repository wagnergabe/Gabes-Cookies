import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = {
    cartItems: [],
    totalPrice: 0,
};


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((x) => x._id === item._id);

            // Ensure price and qty are numbers


            if (existingItem) {
                state.cartItems = state.cartItems.map(x => x._id === existingItem._id ? item : x);
            } else {
                state.cartItems = [...state.cartItems, item];
            }

          //debugging
         
            return updateCart(state);

        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);

            
        }
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
