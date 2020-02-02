export const setProducts = (state, payload) => {
  state.products = payload.data
}

export const setCategories = (state, payload) => {
  var categories = []

  payload.forEach(item => {
    categories.push({
      'label': item.category,
      'value': item.id
    })
  })

  state.categories = categories
}
