<template>
  <q-page>
    <q-card class="my-card q-pa-md">
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-h6">Order ID: {{ this.details[0].order_id }}</div>
        </div>
      </div>
      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Order Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Status: {{ this.details[0].status  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Payment Mode: {{ this.details[0].paymentMode  }}</div>
        </div>
      </div>

      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Merchant Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Merchant: {{ this.details[0].merchant.merchant_name }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Location: {{ this.details[0].merchant.location }}</div>
        </div>
      </div>

      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Dasher Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Dasher: {{ this.details[0].rider.fname+' '+this.details[0].rider.lname }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Contact Number: {{ '+63' + this.details[0].rider.contact_number }}</div>
        </div>
        <div
          v-if="rated"
          class="col col-lg-12 col-md-12 col-sm-12 col-xs-12"
        >
          <div class="text-body2">Rating:
            <q-rating
              readonly
              v-model="this.rate"
              size="1.5em"
              :max="5"
              color="yellow"
            />
          </div>

        </div>
      </div>
    </q-card>

    <br />

    <div class="row justify-center full-height full-width">
      <q-btn
        class="full-width"
        color="primary"
        label="Rate rider"
        @click="riderRating = true"
        v-if="this.details[0].status === 'Delivered' && rated === false"
      />
    </div>

    <br />

    <q-card class="my-card q-pa-md">
      <h6 class="text-body1 pageHeader text-weight-bold">Order:</h6>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-item>
          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">Product</span>
          </q-item-section>

          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">Price</span>
          </q-item-section>

          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">Qty.</span>
          </q-item-section>

          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">TOTAL</span>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item
          v-for="item in this.details[0].items"
          :key="item.id"
        >
          <q-item-section>
            <q-item-label>
              <span class="text-caption text-uppercase">{{ item.name }}</span>
            </q-item-label>

          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ parseFloat(item.price).toFixed(2) }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ item.qty }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ qtyTotal(item.price, item.qty) }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Subtotal:
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ 'Php ' + this.details[0].subTotal }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Delivery Fee:
              <span caption>{{ this.details[0].distance + 'KM' }}</span>
            </q-item-label>
            <q-item-label lines="2">
              <span class="text-caption text-weight-light text-uppercase">Addt'l PHP 4.00 every kilometer</span>
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            top
          >
            <q-item-label class="text-grey-8 text-uppercase">
              {{ 'Php ' + this.details[0].deliveryFee }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Total:
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ 'Php ' + this.details[0].total }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <br />

    <q-card class="my-card q-pa-md">
      <h6 class="text-body1 pageHeader text-weight-bold">Instruction:</h6>

      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">{{ this.details[0].instruction }}</div>
        </div>
      </div>
    </q-card>

    <q-dialog
      v-model="riderRating"
      ref="ratingDialog"
      persistent
    >
      <q-card>
        <q-bar>
          <q-space />

          <q-btn
            dense
            flat
            icon="close"
            v-close-popup
          >
            <q-tooltip>Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
            <div class="text-subtitle1 text-weight-bold">Rating:</div>
            <q-rating
              v-model="rating"
              size="3em"
              :max="5"
              color="yellow"
            />
            <div class="text-subtitle1 text-weight-bold">Comment:</div>
            <q-input
              v-model="comment"
              dense
              outlined
              type="textarea"
            />
            <div>
              <q-btn
                label="Submit"
                type="submit"
                color="primary"
                :loading="submitting"
              >
                <template v-slot:loading>
                  <q-spinner-bars />
                </template>
              </q-btn>
              <q-btn
                label="Reset"
                type="reset"
                color="primary"
                flat
                class="q-ml-sm"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
export default {
  props: {
    details: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      riderRating: false,
      submitting: false,
      rating: 1,
      comment: '',
      submitting: false,
      rated: false,
    }
  },

  computed: {
    rate () {
      return this.$store.getters['userOrdersModule/getRating']
    }
  },

  mounted () {
    this.$store.dispatch('userOrdersModule/getRating', {
      order_id: this.$route.params.id
    }).then(response => {
      this.rated = true
    }).catch(error => {
      console.log(error)
    })
  },

  methods: {
    qtyTotal (price, qty) {
      return (parseFloat(price) * parseInt(qty)).toFixed(2)
    },

    onSubmit () {
      this.submitting = true

      this.$store.dispatch('userOrdersModule/rateDasher', {
        order_id: this.$route.params.id,
        dasher_id: this.details[0].rider.id,
        rating: this.rating,
        comment: this.comment
      })
        .then(response => {
          this.submitting = false
          this.$refs.ratingDialog.hide()
          this.rated = true
        })
        .catch(error => {
          console.log(error.data)
        })
    },

    onReset () {
      this.rating = 1
      this.comment = null
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 5px 0px 10px 0px
</style>
