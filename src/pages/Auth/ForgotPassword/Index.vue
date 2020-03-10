<template>
  <q-page class="flex flex-center full-width full-height">
    <div class="row">
      <div class="q-pa-md">
        <q-card
          class="my-card"
          style="min-width: 320px"
        >
          <q-card-section>
            <q-banner
              v-if="serverError"
              inline-actions
              class="text-white bg-red"
            >
              {{ serverError.message }}
            </q-banner>
          </q-card-section>
          <q-card-section>
            <q-form
              @submit="onSubmit"
              class="q-gutter-md"
            >
              <q-input
                dense
                v-model="email"
                type="email"
                label="E-mail"
                debounce="1000"
                :loading="searching"
                :rules="[ val => val && val.length > 0 || 'Please type your e-mail', isValidEmail ]"
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Reset password"
                  type="submit"
                  color="primary"
                  outline
                  size="md"
                  :loading="submitting"
                  :disable="disabled"
                >
                  <template v-slot:loading>
                    <q-spinner-bars />
                  </template>
                </q-btn>
              </div>
            </q-form>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <router-link
              :to="{ path: '/' }"
              class="text-caption text-weight-light"
            >
              Click here to sign-in
            </router-link>
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
      email: '',
      isPwd: true,
      serverError: '',
      submitting: false,
      searching: false,
      disabled: false
    }
  },

  methods: {
    isValidEmail (val) {
      return new Promise((resolve, reject) => {
        var regex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

        if (!regex.test(val)) {
          resolve('Please enter a valid email address')
        } else {
          resolve(true)
        }
      })
    },

    onSubmit () {
      this.submitting = true
      this.disabled = true

      this.$store.dispatch('userRegisterModule/resetPassword', {
        email: this.email
      })
        .then(response => {
          const dialog = this.$q.dialog({
            title: 'Password reset',
            message: 'We will send an e-mail to you containing resetted password once we validate the e-mail you presented exists in our system'
          }).onOk(() => {
            this.$router.push({ path: '/' })
            dialog.hide()
          })
          this.submitting = false
          this.disabled = false
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
