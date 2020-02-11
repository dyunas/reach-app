<template>
  <q-page>
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

        <q-item-section>
          <span class="text-caption text-weight-bold text-uppercase">Action</span>
        </q-item-section>
      </q-item>
      <q-separator spaced />
      <q-item
        v-for="(item, n) in content"
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
          <q-input
            v-model.number="content[n].qty"
            :value="item.qty"
            type="number"
            dense
            style="max-width: 45px"
            :rules="[ checkQty ]"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-grey-8 text-uppercase">
            {{ qtyTotal(item.price, item.qty) }}
          </q-item-label>
        </q-item-section>

        <q-item-section>
          <div class="text-grey-8">
            <q-btn
              color="red-10"
              size="12px"
              flat
              dense
              round
              icon="delete"
              @click="removeItem(n)"
            />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <div class="row justify-end">
      <q-btn
        type="button"
        label="Update Cart"
        class="q-mt-md q-mr-md"
        color="warning"
        text-color="white"
        icon="refresh"
        @click="updateCart()"
      />
      <q-btn
        type="button"
        label="Checkout"
        class="q-mt-md"
        color="white"
        text-color="black"
        icon="fas fa-shopping-bag"
        :to="{ path: '/user/my_cart/checkout' }"
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
    }
  },

  data () {
    return {
      content: [],
    }
  },

  mounted () {
    this.fillCart()
  },

  methods: {
    fillCart () {
      this.cart.forEach(item => {
        this.content.push(item)
      })
    },

    checkQty (val) {
      return new Promise((resolve, reject) => {
        if (val < 1 || val > 99) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    },

    qtyTotal (price, qty) {
      return (parseFloat(price) * parseInt(qty)).toFixed(2)
    },

    updateCart () {
      this.$store.dispatch('userStoresModule/updateCart', {
        cart: this.content
      })
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Cart updated',
            position: 'top',
            timeout: 1500,
          })
        })
    },

    removeItem (index) {
      this.content.splice(index, 1)
      this.$store.dispatch('userStoresModule/removeItemFromCart', {
        'index': index
      })
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Removed from cart',
            position: 'top',
            timeout: 1500,
          })
        })
    }
  }
}
</script>
