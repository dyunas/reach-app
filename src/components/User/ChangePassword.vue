<template>
  <q-page class="q-pa-sm">
    <q-list bordered>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                :type="isPwd ? 'password' : 'text'"
                outlined
                v-model="oldPword"
                label="Old Password"
                dense
                :rules="[ val => val && val.length > 0 || 'Field is required']"
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
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                :type="isPwd ? 'password' : 'text'"
                outlined
                v-model="newPword"
                label="New Password"
                dense
                :rules="[
                  val => val && val.length > 0 || 'Field is required',
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
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                :type="isPwd ? 'password' : 'text'"
                outlined
                v-model="confirmNewPword"
                label="Confirm Password"
                dense
                :rules="[
                  val => val && val.length > 0 || 'Field is required',
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
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <div>
            <q-btn
              label="Save"
              type="submit"
              color="primary"
              :loading="loading"
              :disable="disabled"
            />
            <q-btn
              label="Reset"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </div>
        </q-item>
      </q-form>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      oldPword: '',
      newPword: '',
      confirmNewPword: '',
      isPwd: true,
      loading: false,
      disabled: false
    }
  },

  methods: {
    passConfirm (val) {
      return new Promise((resolve, reject) => {
        resolve(this.newPword === val || 'Password and Confirm password doest not match')
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

    onSubmit () {
      this.loading = true
      this.disabled = true

      this.$store.dispatch('userSettingsModule/changePassword', {
        oldPword: this.oldPword,
        newPword: this.newPword
      })
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: response.message,
            position: 'top',
            timeout: 2000
          })

          this.loading = false
          this.disabled = false
        })
        .catch(error => {
          this.$q.notify({
            color: 'red-9',
            textColor: 'white',
            icon: 'far fa-times-circle',
            message: error.message,
            position: 'top',
            timeout: 2000
          })

          this.oldPword = ''
          this.newPword = ''
          this.confirmNewPword = ''

          this.loading = false
          this.disabled = false
        })
    },

    onReset () {
      this.oldPword = ''
      this.newPword = ''
      this.confirmNewPword = ''
    }
  }
}
</script>