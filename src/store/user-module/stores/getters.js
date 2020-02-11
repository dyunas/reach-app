export const getOrderCount = state => {
  return state.cartCount
}

export const getCartContents = state => {
  return JSON.parse(state.cart)
}
