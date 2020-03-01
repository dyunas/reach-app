<template>
  <div>
    <q-item
      clickable
      class="q-router"
      v-ripple
      exact
      :to="{ path: '/admin/dashboard'}"
    >
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Dashboard
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-expansion-item
      expand-separator
      icon="person"
      label="Users"
      :default-opened="defaultOpened"
      :content-inset-level="0.5"
    >
      <q-item
        clickable
        class="q-router"
        v-ripple
        exact
        :to="{ path: '/admin/users/customer'}"
      >
        <q-item-section avatar>
          <q-icon name="face" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Customer
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        class="q-router"
        v-ripple
        exact
        :to="{ path: '/admin/users/merchant'}"
      >
        <q-item-section avatar>
          <q-icon name="store" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Merchant
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        class="q-router"
        v-ripple
        exact
        :to="{ path: '/admin/users/dasher'}"
      >
        <q-item-section avatar>
          <q-icon name="motorcycle" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Dasher
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-expansion-item
      expand-separator
      icon="folder"
      label="Reports"
      :default-opened="defaultOpened"
      :content-inset-level="0.5"
    >
      <q-item
        clickable
        class="q-router"
        v-ripple
        exact
        :to="{ path: '/admin/reports/transaction'}"
      >
        <q-item-section avatar>
          <q-icon name="show_chart" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Transaction
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        class="q-router"
        v-ripple
        exact
        :to="{ path: '/admin/reports/revenue'}"
      >
        <q-item-section avatar>
          <q-icon name="money" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            Revenue
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-expansion-item>

    <q-item
      clickable
      class="q-router"
      v-ripple
      exact
      :to="{ path: '/admin/feedback'}"
    >
      <q-item-section avatar>
        <q-icon name="feedback" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Feedback
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item
      clickable
      class="q-router"
      v-ripple
      exact
      :to="{ path: '/admin/settings'}"
    >
      <q-item-section avatar>
        <q-icon name="build" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          Settings
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultOpened: false
    }
  }
}
</script>
