<template>
  <div>
    <q-card class="my-card">
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-item-label header>Deliveries</q-item-label>

        <q-item
          v-for="delivery in deliveries"
          v-bind:key="delivery.id"
          clickable
          v-ripple
          :to="{ path: '/dasher/deliveries/' + delivery.id }"
        >
          <q-item-section>
            <q-item-label lines="1">{{ delivery.order_id }}</q-item-label>
            <q-item-label
              caption
              lines="2"
            >
              <span class="text-gray">{{ delivery.status +' - '+ delivery.paymentMode}}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section
            side
            bottom
          >
            <timeago
              :datetime="delivery.updated_at"
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
    deliveries: {
      type: Array,
      required: true
    }
  },

  data () {
    return {}
  }
}
</script>
