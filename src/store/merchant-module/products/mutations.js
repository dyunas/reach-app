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

export const updateCategory = (state, payload) => {
  state.categories.push({
    'label': payload.category,
    'value': payload.id
  })
}
