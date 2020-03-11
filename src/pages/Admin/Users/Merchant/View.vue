<template>
  <q-page class="q-pa-sm">
    <h4 class="pageHeader">Merchant</h4>

    <div>
      <q-btn
        color="primary"
        label="Active account"
        v-if="record.account_status === 'pending' || record.account_status === 'deactivated'"
        :loading="loading"
        :disable="disabled"
        @click="updateAccountStatus"
      ></q-btn>
      <q-btn
        color="red"
        label="Deactivate account"
        v-if="record.account_status === 'active'"
        :loading="loading"
        :disable="disabled"
        @click="updateAccountStatus"
      ></q-btn>
    </div>

    <br />

    <div v-if="fetching">
      <q-markup-table>
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
    </div>

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
                  <td class="text-subtitle2 text-weight-normal">Merchant Name: {{ record.merchant_name }}</td>
                  <td class="text-subtitle2 text-weight-normal">Account Type: {{ record.user.account_type }}</td>
                  <td class="text-subtitle2 text-weight-normal">Status: {{ record.account_status }}</td>
                </tr>
                <tr>
                  <td class="text-subtitle2 text-weight-normal">E-mail: {{ record.user.email }}</td>
                  <td class="text-subtitle2 text-weight-normal">Contact Number: {{ record.contact_num }}</td>
                  <td class="text-subtitle2 text-weight-normal">Member Since: <timeago
                      :datetime="record.user.created_at"
                      :auto-update="60"
                    ></timeago>
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-subtitle2 text-weight-normal"
                    colspan="3"
                  >Location: {{ record.location }}</td>
                </tr>
                <tr>
                  <td
                    class="text-subtitle2 text-weight-normal"
                    colspan="3"
                  >Description: {{ record.description }}</td>
                </tr>
              </tbody>
            </q-markup-table>
          </q-card>
        </div>
      </div>

      <br />

      <div class="row">
        <div class="col col-md-12 col-lg-12">
          <q-card class="my-card q-pa-md col">
            <div class="text-subtitle2 text-weight-bold">Requirements:</div>

            <br />

            <div class="q-gutter-md">
              <q-checkbox
                v-model="dtiSec"
                label="DTI or SEC Registration"
                color="yellow"
                size="xl"
                disable
              />
              <q-checkbox
                v-model="leaseTitle"
                label="Lease contract/Title"
                color="yellow"
                size="xl"
                disable
              />
              <q-checkbox
                v-model="busPerm"
                label="Business Permit"
                color="yellow"
                size="xl"
                disable
              />
              <q-checkbox
                v-model="brgyClearance"
                label="Baranggay Clearance"
                color="yellow"
                size="xl"
                disable
              />
            </div>
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
      record: '',
      rating: '',
      fetching: false,
      doneFetching: false,
      loading: false,
      disabled: false,
      brgyClearance: false,
      busPerm: false,
      dtiSec: false,
      leaseTitle: false
    }
  },

  created () {
    this.getMerchantDetails()
  },

  methods: {
    getMerchantDetails () {
      this.fetching = true

      this.$store.dispatch('adminMerchantModule/getMerchantDetails', {
        merchant_id: this.$route.params.id
      })
        .then(response => {
          this.record = response.data
          this.brgyClearance = (response.data.requirements.brgyClearance) ? true : false
          this.busPerm = (response.data.requirements.busPerm) ? true : false
          this.dtiSec = (response.data.requirements.dtiSec) ? true : false
          this.leaseTitle = (response.data.requirements.leaseTitle) ? true : false

          this.fetching = false
          this.doneFetching = true
        })
        .catch(error => {
          console.log(error)
        })
    },

    updateAccountStatus () {
      this.loading = true
      this.disabled = true

      this.$store.dispatch('adminMerchantModule/updateAccountStatus', {
        id: this.$route.params.id,
        status: this.record.account_status
      })
        .then(response => {
          this.loading = false
          this.disabled = false

          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: response.message,
            position: 'top',
            timeout: 2000
          })

          if (this.record.account_status === 'active') {
            this.record.account_status = 'deactivated'
          } else {
            this.record.account_status = 'active'
          }
        })
        .catch(error => {
          this.loading = false
          this.disabled = false
          console.log(error.message)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
