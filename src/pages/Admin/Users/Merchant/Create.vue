<template>
  <q-page class="q-pa-sm">
    <q-list
      bordered
      class="rounded-borders"
    >
      <q-item-label header>Merchant Information</q-item-label>

      <q-form
        @submit="onSubmit"
        @reset="onReset"
      >
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="merchantName"
                label="Merchant"
                dense
                :rules="[ val => val && val.length > 0 || 'Merchant name is required']"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="email"
                label="E-mail Address"
                debounce="1000"
                dense
                :rules="[ val => val && val.length > 0 || 'E-mail is required', isValidEmail, checkEmail ]"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                outlined
                v-model="contactNumber"
                label="Contact Number"
                dense
                :rules="[
                  val => val && val.length > 0 || 'Contact number is required',
                  validNumbers 
                ]"
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label class="text-subtitle2 text-weight-bold">Requirements:</q-item-label>

            <br />

            <div class="row q-gutter-md">
              <q-field
                ref="toggle"
                :value="dtiSec"
                :rules="[checkRequirements]"
                borderless
                dense
              >
                <template v-slot:control>
                  <q-checkbox
                    v-model="dtiSec"
                    label="DTI or SEC Registration"
                    color="yellow"
                    size="xl"
                  />
                </template>
              </q-field>
              <q-field
                ref="toggle"
                :value="leaseTitle"
                :rules="[checkRequirements]"
                borderless
                dense
              >
                <template v-slot:control>
                  <q-checkbox
                    v-model="leaseTitle"
                    label="Lease contract/Title"
                    color="yellow"
                    size="xl"
                  />
                </template>
              </q-field>
              <q-field
                ref="toggle"
                :value="busPerm"
                :rules="[checkRequirements]"
                borderless
                dense
              >
                <template v-slot:control>
                  <q-checkbox
                    v-model="busPerm"
                    label="Business Permit"
                    color="yellow"
                    size="xl"
                  />
                </template>
              </q-field>
              <q-field
                ref="toggle"
                :value="brgyClearance"
                :rules="[checkRequirements]"
                borderless
                dense
              >
                <template v-slot:control>
                  <q-checkbox
                    v-model="brgyClearance"
                    label="Baranggay Clearance"
                    color="yellow"
                    size="xl"
                  />
                </template>
              </q-field>
            </div>
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
      merchantName: '',
      email: '',
      contactNumber: '',
      loading: false,
      disabled: false,
      brgyClearance: false,
      busPerm: false,
      dtiSec: false,
      leaseTitle: false
    }
  },

  methods: {
    validNumbers (val) {
      return new Promise((resolve) => {
        var regex = new RegExp(/^[0-9\s]*$/)

        if (!regex.test(val)) {
          resolve('Please input valid numbers')
        } else {
          resolve(true)
        }
      })
    },

    isValidEmail (val) {
      return new Promise((resolve) => {
        var regex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)

        if (!regex.test(val)) {
          resolve('Please enter a valid email address')
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

    checkRequirements (val) {
      return new Promise((resolve, reject) => {
        if (val === false) {
          resolve('Required')
        } else {
          resolve(true)
        }
      })
    },

    onSubmit () {
      this.loading = true
      this.disabled = true

      this.$store.dispatch('adminMerchantModule/createNewMerchant', {
        merchantName: this.merchantName,
        email: this.email,
        contactNumber: this.contactNumber,
        brgyClearance: (this.brgyClearance) ? 1 : 0,
        busPerm: (this.busPerm) ? 1 : 0,
        dtiSec: (this.dtiSec) ? 1 : 0,
        leaseTitle: (this.leaseTitle) ? 1 : 0
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

          this.$router.push({ path: '/admin/users/merchant' })

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

          this.loading = false
          this.disabled = false
        })
    },

    onReset () {
      this.merchantName = ''
      this.email = ''
      this.contactNumber = ''
      this.loading = false
      this.brgyClearance = false
      this.busPerm = false
      this.dtiSec = false
      this.leaseTitle = false
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 10px 0px
</style>
