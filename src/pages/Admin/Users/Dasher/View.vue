<template>
  <q-page class="q-pa-sm">
    <h4 class="pageHeader">Dasher</h4>

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
                  <td class="text-subtitle2 text-weight-normal">Name: {{ record.fname + ' ' + record.lname }}</td>
                  <td class="text-subtitle2 text-weight-normal">Account Type: {{ record.user.account_type }}</td>
                  <td class="text-subtitle2 text-weight-normal">Status: {{ record.account_status }}</td>
                </tr>
                <tr>
                  <td class="text-subtitle2 text-weight-normal">E-mail: {{ record.user.email }}</td>
                  <td class="text-subtitle2 text-weight-normal">Contact Number: {{ record.contact_number }}</td>
                  <td class="text-subtitle2 text-weight-normal">Member Since: <timeago
                      :datetime="record.user.created_at"
                      :auto-update="60"
                    ></timeago>
                  </td>
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
      doneFetching: false
    }
  },

  created () {
    this.getDasherRecord()
    this.getDasherRating()
  },

  methods: {
    getDasherRecord () {
      this.fetching = true

      this.$store.dispatch('adminDasherModule/getDasherDetails', {
        dasher_id: this.$route.params.id
      })
        .then(response => {
          this.record = response.data

          this.fetching = false
          this.doneFetching = true
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
