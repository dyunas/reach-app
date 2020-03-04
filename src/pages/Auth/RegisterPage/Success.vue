<template>
  <q-page class="flex flex-center full-width full-height">
    <div class="row">
      <div class="q-pa-md">
        <q-card
          class="my-card"
          style="min-width: 320px"
        >
          <q-card-section>
            <div class="text-h6">Almost there!</div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle1">An e-mail verification containing a link was sent to your email address.</div>
            <br />
            <q-btn
              color="primary"
              label="Click here to redirect back to sign-in page"
              :to="{ path: '/' }"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      //
    }
  }
}
</script>