export const setProfile = (state, payload) => {
  state.profile = {
    'photo': payload.merchant.photo,
    'email': payload.email,
    'account_type': payload.account_type,
    'created_at': payload.created_at,
    'updated_at': payload.updated_at,
    'merchant_name': payload.merchant.merchant_name,
    'location': payload.merchant.location,
    'lat': payload.merchant.lat,
    'lang': payload.merchant.lang,
    'contact_num': payload.merchant.contact_num,
    'status': payload.merchant.status,
    'opening': payload.merchant.opening,
    'closing': payload.merchant.closing,
    'id': payload.merchant.id
  }
}

export const setBanner = (state, banner) => {
  state.profile.photo = banner
}
