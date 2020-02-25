<template>
  <div>
    <q-card class="my-card">
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-item-label header>Orders</q-item-label>

        <q-item
          v-for="order in orders"
          v-bind:key="order.id"
          clickable
          v-ripple
          :to="{ path: '/merchant/orders/' + order.id }"
          :class="{'new-order' : order.opened }"
        >
          <q-item-section :class="{'new-order-section' : order.opened}">
            <q-item-label
              lines="1"
              :class="{'new-order-section' : order.opened}"
            >{{ order.order_id }}</q-item-label>
            <q-item-label
              caption
              lines="2"
              :class="{'new-order-section' : order.opened}"
            >
              <span>{{ order.status +' - '+ order.paymentMode}}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            bottom
            :class="{'new-order-section' : order.opened}"
          >
            <timeago
              :datetime="order.created_at"
              :auto-update="60"
            ></timeago>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </div>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.new-order
  background-color: #E5E057

.new-order-section
  color: #000
  font-weight: 900
</style>
