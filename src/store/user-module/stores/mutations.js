export const setCart = (state, cart) => {
  state.cart = cart
}

export const setCartCount = (state, count) => {
  state.cartCount = count
}

export const setMerchantID = (state, merchantID) => {
  state.merchantID = merchantID
}

export const undoCart = state => {
  state.cart = [],
    state.cartCount = 0,
    state.merchantID = ''
}