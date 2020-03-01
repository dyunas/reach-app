<template>
  <q-page padding>
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
        v-for="(item) in content"
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
            {{ 'Php ' + getSubTotal() }}
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label class="text-weight-bold text-uppercase">
            Delivery Fee:
            <span caption>{{ distance + 'KM' }}</span>
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
            {{ 'Php ' + calculateDeliveryFee() }}
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
            {{ 'Php ' + getGrandTotal() }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-card class="my-card q-mt-md">
      <q-card-section>
        <div class="text-subtitle2">Special instructions:</div>
        <q-input
          v-model="instructions"
          dense
          filled
          type="textarea"
        />
      </q-card-section>
    </q-card>
    <q-card class="my-card q-mt-md">
      <q-card-section>
        <div class="text-subtitle2">Mode of payment:</div>
        <q-radio
          v-model="paymentMode"
          val="COD"
          label="Cash on Delivery"
        />
      </q-card-section>
    </q-card>
    <q-card class="my-card q-mt-md">
      <q-card-section>
        <div class="text-subtitle2">
          Deliver to: {{ this.location }}
        </div>
      </q-card-section>
    </q-card>
    <div class="row justify-end">
      <q-btn
        type="button"
        label="Back"
        class="q-mt-md q-mr-md"
        color="warning"
        text-color="white"
        icon="arrow_back"
        :to="{ path: '/user/my_cart' }"
      />
      <q-btn
        type="button"
        label="Place Order"
        class="q-mt-md"
        color="white"
        text-color="black"
        icon="done"
        @click="submitForm()"
      />
    </div>
  </q-page>
</template>

<script>
export default {
  props: {
    cart: {
      type: Array,
      required: true
    },

    location: {
      type: String,
      required: true
    }
  },

  mounted () {
    this.fillCart()

    this.$store.dispatch('userStoresModule/getStoreDistance')
      .then(response => {
        this.distance = response.data[0].distance
      })
      .catch(error => {
        console.log(error)
      })
  },

  data () {
    return {
      content: [],
      deliveryFee: 35,
      distance: 0,
      totalDeliveryFee: 0,
      subTotal: 0,
      total: 0,
      instructions: '',
      paymentMode: 'COD',
    }
  },

  methods: {
    fillCart () {
      this.cart.forEach(item => {
        this.content.push(item)
      })
    },

    qtyTotal (price, qty) {
      return (parseFloat(price) * parseInt(qty)).toFixed(2)
    },

    calculateDeliveryFee () {
      const totalDeliveryFee = (this.distance > 1.99) ? (parseFloat(this.deliveryFee) + ((this.distance - 1) * 4)).toFixed(2) : parseFloat(this.deliveryFee).toFixed(2)
      this.totalDeliveryFee = totalDeliveryFee
      return totalDeliveryFee
    },

    getSubTotal () {
      let initialValue = 0
      let subTotal = this.content.reduce((total, cart) => total + (cart.price * cart.qty), initialValue)

      this.subTotal = parseFloat(subTotal).toFixed(2)
      return this.subTotal
    },

    getGrandTotal () {
      this.total = (parseFloat(this.subTotal) + parseFloat(this.deliveryFee)).toFixed(2)
      return this.total
    },

    submitForm () {
      this.$emit('checkOutNow', {
        cart: this.content,
        instruction: this.instructions,
        location: this.location,
        subTotal: this.subTotal,
        distance: this.distance,
        deliveryFee: this.totalDeliveryFee,
        total: this.total,
        paymentMode: this.paymentMode
      })
    }
  }
}
</script>
