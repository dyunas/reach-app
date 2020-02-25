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
          :to="{ path: '/user/orders/' + order.id }"
        >
          <q-item-section>
            <q-item-label lines="1">{{ order.order_id }}</q-item-label>
            <q-item-label
              caption
              lines="2"
            >
              <span>{{ order.status +' - '+ order.paymentMode}}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            bottom
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
