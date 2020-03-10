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
              @reset="onReset"
              class="q-gutter-md"
            >
              <q-input
                dense
                v-model="email"
                type="email"
                label="E-mail"
                debounce="1000"
                :loading="searching"
                :rules="[ val => val && val.length > 0 || 'Please type your e-mail', isValidEmail, checkEmail ]"
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
                  val => val !== null || 'Please type your password',
                  val => val.length >= 8 || 'Password should at least be 8 characters long',
                  validatePasswordStrength
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

              <q-input
                dense
                v-model="confirmPassword"
                :type="isPwd ? 'password' : 'text'"
                label="Confirm Password"
                lazy-rules
                :rules="[
                  val => val !== null && val.length > 0 || 'Please confirm your password',
                  passConfirm
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

              <q-input
                dense
                v-model="fname"
                label="Firstname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your Firstname']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                dense
                v-model="lname"
                label="Lastname"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your Lastname']"
              >
                <template v-slot:prepend>
                  <q-icon name="person" />
                </template>
              </q-input>

              <q-input
                dense
                v-model="cnum"
                label="Contact Number"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type your contact number' ]"
              >
                <template v-slot:prepend>
                  <q-icon name="phone" />
                </template>
              </q-input>

              <div>
                <q-btn
                  label="Register"
                  type="submit"
                  color="primary"
                  outline
                  size="md"
                  :loading="submitting"
                >
                  <template v-slot:loading>
                    <q-spinner-bars />
                  </template>
                </q-btn>
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
              :to="{ path: '/' }"
              class="text-caption text-weight-light"
            >
              Already have an account? Click here to sign-in
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
      password: '',
      confirmPassword: '',
      fname: '',
      lname: '',
      cnum: '',
      isPwd: true,
      serverError: '',
      submitting: false,
      searching: false
    }
  },

  methods: {
    passConfirm (val) {
      return new Promise((resolve, reject) => {
        resolve(this.password === val || 'Password and Confirm password doest not match')
      })
    },

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

    validatePasswordStrength (val) {
      return new Promise((resolve, reject) => {
        var regex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/)

        if (!regex.test(val)) {
          resolve('Password must contain at least: 1 Uppercase, 1 Special Character and 1 Number')
        } else {
          resolve(true)
        }
      })
    },

    checkEmail (val) {
      this.searching = true
      return new Promise((resolve, reject) => {
        this.$axios.get('/checkEmail?email=' + val)
          .then(response => {
            this.searching = false
            if (response.data.length > 0) {
              resolve('E-mail already in use')
            } else {
              resolve(true)
            }
          })
          .catch(error => {
            this.searching = false
            reject(error)
          })
      })
    },

    onSubmit () {
      this.submitting = true

      this.$store.dispatch('userRegisterModule/registerUser', {
        email: this.email,
        password: this.password,
        fname: this.fname,
        lname: this.lname,
        cnum: this.cnum
      })
        .then(response => {
          this.submitting = false
          this.$router.push({ path: '/register/success' })
        })
        .catch(error => {
          console.log(error)
          // const dialog = this.$q.dialog({
          //   title: response.header,
          //   message: response.message
          // }).onOk(() => {
          //   dialog.hide()
          // })
          this.submitting = true
        })
    },

    onReset () {
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.fname = ''
      this.lname = ''
      this.cnum = ''
      this.searching = false
      this.submitting = false
    }
  }
}
</script>
