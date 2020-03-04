<template>
  <q-page class="flex flex-center full-width full-height">
    <div class="row">
      <div class="q-pa-md">
        <q-card
          class="my-card"
          style="min-width: 320px"
        >
          <div v-if="done">
            <q-card-section>
              <div class="text-h6">{{ header }}</div>
            </q-card-section>

            <q-card-section class="text-center">
              <div class="text-subtitle1">{{ message }}</div>
              <br />
              <q-btn
                color="primary"
                label="Click here to sign-in"
                :to="{ path: '/' }"
              />
            </q-card-section>
          </div>
          <div v-else>
            <q-card-section style="height: 270px">
              <div class="text-h6">Verifying</div>
            </q-card-section>
          </div>

          <q-inner-loading :showing="visible">
            <q-spinner-hourglass
              color="yellow"
              size="4em"
            />
          </q-inner-loading>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      visible: true,
      done: false,
      header: '',
      message: '',
    }
  },

  created () {
    this.$store.dispatch('userRegisterModule/verifyUser', {
      id: this.$route.params.id,
      token: this.$route.params.token
    })
      .then(response => {
        this.visible = false
        this.done = true

        this.header = response.data.header
        this.message = response.data.message
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
