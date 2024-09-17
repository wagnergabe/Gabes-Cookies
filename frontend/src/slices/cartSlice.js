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
            const existingItem = state.cartItems.find(x => x.id === item.id);

            // Ensure price and qty are numbers
            item.price = parseFloat(item.price);
            item.qty = parseInt(item.qty, 10);

            if (existingItem) {
                existingItem.qty += item.qty;
            } else {
                state.cartItems.push(item);
            }

          //debugging
            console.log('Cart Items:', state.cartItems);
            console.log('Item Price:', item.price);
            console.log('Item Quantity:', item.qty);
            return updateCart(state);

        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
