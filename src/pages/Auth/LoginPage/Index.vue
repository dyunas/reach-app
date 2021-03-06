<template>
  <q-page
    class="flex flex-center full-width full-height"
    :class="heightSize"
  >
    <div class="row">
      <img
        alt="Reach logo"
        src="~assets/logo-pixel-740x240.png"
        :ratio="16/9"
        style="width: 500px; height: 200px"
        v-if="$q.platform.is.desktop"
      />

      <img
        alt="Reach logo"
        src="~assets/logo-pixel-740x240.png"
        :ratio="16/9"
        style="width: 300px; height: 100px"
        v-if="$q.platform.is.mobile"
      />
    </div>
    <div class="row">
      <div class="q-pa-md">
        <q-card class="my-card">
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
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                dense
                v-model="email"
                type="email"
                label="E-mail"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your e-mail']"
                autofocus
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                dense
                v-model="password"
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                lazy-rules
                :rules="[
                  val => val !== null && val.length > 0 || 'Please type your password',
                ]"
              >
                <template v-slot:prepend>
                  <q-icon name="lock" />
                </template>
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Submit"
                  type="submit"
                  color="primary"
                  outline
                  size="md"
                />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  class="q-ml-sm"
                  outline
                  size="md"
                />
              </div>
            </q-form>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <router-link
              :to="{ path: '/forgot-password' }"
              class="text-caption text-weight-light"
            >
              Forgot your password? Click here
            </router-link>

            <br />

            <router-link
              :to="{ path: '/register' }"
              class="text-caption text-weight-light"
            >
              Don't have an account yet? Click here to register
            </router-link>
          </q-card-section>

          <q-separator />

          <q-card-section>

            <a
            	href="http://reach-app.s3-website.ap-east-1.amazonaws.com/"
							target="_blank"
              class="text-caption text-weight-light"
            >
              Do you want to be part of Reach? Click here to know more.
            </a>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { Platform, QSpinnerBars } from 'quasar'

export default {
  data () {
    return {
      email: '',
      password: '',
      isPwd: true,
      serverError: ''
    }
  },

  computed: {
    heightSize () {
      if (Platform.is.desktop) {
        return 'items-center'
      }
      return ''
    }
  },

  methods: {
    onSubmit () {
      const spinner = typeof QSpinnerBars !== 'undefined'
        ? QSpinnerBars // Non-UMD, imported above
        : Quasar.components.QSpinnerBars // eslint-disable-line
      this.$q.loading.show({
        spinner,
        spinnerColor: 'yellow-9',
        backgroundColor: 'yellow-1',
        message: 'Logging in',
        messageColor: 'yellow-9',
        delay: 400 // ms
      })
      this.$store.dispatch(
        'loginModule/login',
        {
          email: this.email,
          password: this.password
        }
      )
        .then(result => {
          this.$q.loading.hide()
          if (result.data.account_type === 'admin') {
            this.$router.push({ path: '/admin/dashboard' })
          } else if (result.data.account_type === 'merchant') {
            this.$router.push({ path: '/merchant/dashboard' })
          } else if (result.data.account_type === 'dasher') {
            this.$router.push({ path: '/dasher/dashboard' })
          } else {
            this.$router.push({ path: '/user/dashboard' })
          }
        }).catch(error => {
          this.$q.loading.hide()
          this.serverError = error.response.data
          this.password = ''
        })
    },

    onReset () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  min-width: 320px
</style>
