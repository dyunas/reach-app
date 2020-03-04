<template>
  <q-page class="q-pa-sm">
    <h6 class="pageHeader">Comments and Rating</h6>

    <div class="text-center">
      <q-rating
        v-model="overAllRating"
        size="3em"
        readonly
      />
    </div>

    <br />

    <q-card class="my-card">
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
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      rating: '',
      overAllRating: 0
    }
  },

  created () {
    this.$store.dispatch('dasherCommentsModule/getDasherRating', {
      dasher_id: this.$route.params.id
    })
      .then(response => {
        this.rating = response.data

        var total = 0

        response.data.data.forEach(item => {
          total += item.rating
        })

        this.overAllRating = total / response.data.data.length
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>