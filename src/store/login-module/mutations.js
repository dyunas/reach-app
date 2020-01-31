/* eslint-disable prettier/prettier */

/* set the authorization token*/
export const setCredentials = (state, payload) => {
  state.token = payload.token
  state.type = payload.type
  state.owner = payload.owner
}

export const destroyToken = state => {
  state.token = null
  state.type = null
  state.owner = null
}
