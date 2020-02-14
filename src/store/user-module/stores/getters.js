export const getOrderCount = state => {
  return state.cartCount
}

export const getCartContents = state => {
  return state.cart
}

export const isThereMerchant = state => {
  return state.merchantID
}