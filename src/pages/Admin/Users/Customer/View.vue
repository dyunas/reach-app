<template>
  <q-page class="q-pa-sm">
    <h4 class="pageHeader">Customer</h4>

    <q-markup-table v-if="fetching">
      <thead>
        <tr>
          <th
            class="text-left"
            style="width: 150px"
          >
            <q-skeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
            />
          </th>
          <th class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
            />
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="n in 3"
          :key="n"
        >
          <td class="text-left">
            <q-skeleton
              animation="blink"
              type="text"
              width="85px"
            />
          </td>
          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="50px"
            />
          </td>
          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="35px"
            />
          </td>
          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="65px"
            />
          </td>
          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="25px"
            />
          </td>
          <td class="text-right">
            <q-skeleton
              animation="blink"
              type="text"
              width="85px"
            />
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <div v-if="doneFetching">
      <div class="row">
        <div class="col col-md-12 col-lg-12">
          <q-card class="my-card q-pa-sm col">
            <q-markup-table
              bordered
              square
            >
              <tbody>
                <tr>
                  <td class="text-subtitle2 text-weight-normal">Name: {{ profile.fname + ' ' + profile.lname }}</td>
                  <td class="text-subtitle2 text-weight-normal">Account Type: {{ profile.account_type }}</td>
                  <td class="text-subtitle2 text-weight-normal">Status: {{ profile.status }}</td>
                </tr>
                <tr>
                  <td class="text-subtitle2 text-weight-normal">E-mail: {{ profile.email }}</td>
                  <td class="text-subtitle2 text-weight-normal">Contact Number: {{ profile.contact_number }}</td>
                  <td class="text-subtitle2 text-weight-normal">Member Since:
                    <timeago
                      :datetime="profile.created_at"
                      :auto-update="60"
                    ></timeago>
                  </td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      profile: {
        email: '',
        account_type: '',
        created_at: '',
        fname: '',
        lname: '',
        contact_number: '',
        status: '',
        created_at: '',
        id: ''
      },
      fetching: false,
      doneFetching: false,
    }
  },

  created () {
    this.fetching = true

    this.$store.dispatch('adminCustomerModule/getCustomerInformation', {
      id: this.$route.params.id
    })
      .then(response => {
        this.profile = {
          email: response.user.email,
          account_type: response.user.account_type,
          created_at: response.user.created_at,
          fname: response.fname,
          lname: response.lname,
          contact_number: response.contact_number,
          status: response.account_status,
          created_at: response.user.created_at,
          id: response.id
        }

        this.fetching = false
        this.doneFetching = true
      })
      .catch(error => {
        console.log(error.response)
      })
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px
</style>