export const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
}

export const updateCart = (state) => {
    state.itemPrice = addDecimals(state.cartItems.reduce((a, b) => a + b.price * b.qty, 0));
            //Shipping ($10 should do it)
            state.shippingPrice = Number(10)
            //Tax MN = 6.875%
            state.taxPrice = addDecimals(Number((0.06875 * state.itemPrice).toFixed(2)));
            //Total
            state.totalPrice = (
                Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)
            ).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state))

            return state
        }

