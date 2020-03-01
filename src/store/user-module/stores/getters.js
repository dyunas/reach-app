export const getOrderCount = state => {
  return state.cartCount
}

export const getCartContents = state => {
  return JSON.parse(state.cart)
}

export const isThereMerchant = state => {
  return state.merchantID
}
