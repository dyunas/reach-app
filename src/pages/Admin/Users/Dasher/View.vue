<template>
  <q-page class="q-pa-sm">
    <h4 class="pageHeader">Dasher</h4>

    <div class="row">
      <div class="col col-md-12 col-lg-12">
        <q-card class="my-card q-pa-sm col">
          <q-markup-table
            bordered
            square
          >
            <tbody>
              <tr>
                <td class="text-subtitle2 text-weight-normal">Name: {{ record.fname + ' ' + record.mi + ' ' + record.lname }}</td>
                <td class="text-subtitle2 text-weight-normal">Account Type: {{ record.user.account_type }}</td>
                <td class="text-subtitle2 text-weight-normal">Status: {{ record.account_status }}</td>
              </tr>
              <tr>
                <td class="text-subtitle2 text-weight-normal">E-mail: {{ record.user.email }}</td>
                <td class="text-subtitle2 text-weight-normal">Contact Number: {{ record.contact_number }}</td>
                <td class="text-subtitle2 text-weight-normal">Member Since: {{ record.user.created_at }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </div>
    </div>

    <br />

    <div class="row">
      <q-card class="my-card q-pa-sm col">
        <div class="text-subtitle2 text-uppercase q-pa-sm">Feedbacks:</div>

        <q-list>
          <q-item
            v-for="(rating, n) in rating.data"
            v-bind:key="n"
          >
            <q-item-section>
              <q-item-label class="text-italic">"{{ rating.comment }}"</q-item-label>
              <q-item-label caption>{{ rating.customer.fname+" "+rating.customer.lname }}</q-item-label>
            </q-item-section>

            <q-item-section
              side
              top
            >
              <q-item-label caption>
                <timeago
                  :datetime="rating.created_at"
                  :auto-update="60"
                ></timeago>
              </q-item-label>
              <div class="text-orange">
                <q-rating
                  v-model="rating.rating"
                  size="1.5em"
                  readonly
                ></q-rating>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      record: '',
      rating: ''
    }
  },

  created () {
    this.getDasherRecord()
    this.getDasherRating()
  },

  methods: {
    getDasherRecord () {
      this.$store.dispatch('adminDasherModule/getDasherDetails', {
        dasher_id: this.$route.params.id
      })
        .then(response => {
          this.record = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    getDasherRating () {
      this.$store.dispatch('adminDasherModule/getDasherRating', {
        dasher_id: this.$route.params.id
      })
        .then(response => {
          this.rating = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
