import { createSlice }from '@reduxjs/toolkit';
import { updateCart } from '../src/utils/cartUtils.js'


const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart'))
: {cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };
//Stripe

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((cookie) => cookie._id === item._id);

            if (existItem) {
                // Update the quantity of the existing item directly
                existItem.quantity = item.quantity || 1; // Set quantity to passed value or default to 1
              } else {
                // Add the new item with a quantity of 1 (optional)
                state.cartItems.push({ ...item, quantity: 1 });
              }
          return updateCart(state)
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload)

            return updateCart(state)
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        }
    },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod } = cartSlice.actions;

export default cartSlice.reducer;