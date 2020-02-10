export const getToken = state => {
  return state.token
}

export const authState = state => {
  return state.token != null
}

export const getUserType = state => {
  return state.type
}

export const getOwner = state => {
  return state.owner
}

