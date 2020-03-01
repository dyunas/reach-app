<template>
  <q-page>
    <q-card class="my-card q-pa-md">
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-h6">Order ID: {{ this.details[0].order_id }}</div>
        </div>
      </div>
      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Customer Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Customer Name: {{ this.details[0].customer.fname +' '+ this.details[0].customer.lname }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Contact Number: {{ '+63' + this.details[0].customer.contact_number  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Location: {{ this.details[0].location  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Status: {{ this.details[0].status  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Payment Mode: {{ this.details[0].paymentMode  }}</div>
        </div>
      </div>

      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Dasher Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Dasher: {{ this.details[0].rider.fname +" "+ this.details[0].rider.lname }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Contact Number: {{ "+63" + this.details[0].rider.contact_number }}</div>
        </div>
      </div>
    </q-card>

    <br />
    <div class="row">
      <q-btn
        class="full-width"
        color="primary"
        label="Update Order Status"
        @click="orderStatusDialog = true"
        v-if="this.details[0].status !== 'Delivery on the way' && this.details[0].status !== 'Delivered'"
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
      v-model="orderStatusDialog"
      ref="statusDialog"
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
            <div class="text-subtitle1 text-weight-bold">Order Status:</div>

            <q-select
              dense
              outlined
              v-model="currentOrderStatus"
              :options="this.orderStatus"
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
    },

    orderStatus: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      orderStatusDialog: false,
      currentOrderStatus: this.details[0].status,
      submitting: false
    }
  },

  methods: {
    qtyTotal (price, qty) {
      return (parseFloat(price) * parseInt(qty)).toFixed(2)
    },

    onSubmit () {
      this.submitting = true

      this.$store.dispatch('merchantOrdersModule/updateOrderStatus', {
        id: this.details[0].id,
        status: this.currentOrderStatus
      })
        .then(response => {
          this.$emit('updateOrderStatus', {
            orderStatus: this.currentOrderStatus
          })

          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'far fa-check-circle',
            message: response.data.message,
            position: 'top',
            timeout: 3000,
          })

          this.submitting = false
          this.$refs.statusDialog.hide()
        })
        .catch(error => {
          console.log(error.data)
          this.$q.notify({
            color: 'red-9',
            textColor: 'white',
            icon: 'far fa-times-circle',
            message: 'Something went wrong while updating! Try again.',
            position: 'top',
            timeout: 3000,
          })

          this.submitting = false
          this.$refs.statusDialog.hide()
        })
    },

    onReset () {
      this.currentOrderStatus = this.details[0].status
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 5px 0px 10px 0px
</style>
