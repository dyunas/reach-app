export const setProfile = (state, profile) => {
  state.profile = {
    'email': profile.email,
    'account_type': profile.account_type,
    'created_at': profile.created_at,
    'fname': profile.customer.fname,
    'lname': profile.customer.lname,
    'contact_number': profile.customer.contact_number,
    'account_status': profile.customer.account_status,
    'id': profile.customer.id
  }
}
