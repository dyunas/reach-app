<template>
  <div>
    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.desktop"
    >
      <q-item-label header>My Information</q-item-label>

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
          <q-item-section>
            <q-item-label>
              <q-input
                v-model="openingTime"
                dense
                outlined
                mask="time"
                :rules="['time']"
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="openingTime" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </q-item-label>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-input
                v-model="closingTime"
                dense
                outlined
                mask="time"
                :rules="['timeOrFulltime']"
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="closingTime" />
                    </q-popup-proxy>
                  </q-icon>
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
                outlined
                v-model="contactNumber"
                label="Contact Number"
                dense
                :rules="[ val => val || 'Contact number is required']"
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
                v-model="location"
                label="Location"
                dense
                :loading="loadingState"
                :rules="[ val => val && val.length > 0 || 'Location is required']"
              >
                <template v-slot:append>
                  <q-icon
                    name="location_searching"
                    class="cursor-pointer"
                    @click="getCurrentLocation()"
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
              :loading="this.loading"
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

    <q-list
      bordered
      class="rounded-borders"
      v-if="$q.platform.is.mobile"
    >
      <q-item-label header>My Information</q-item-label>

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
              />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section>
            <q-item-label>
              <q-input
                v-model="openingTime"
                dense
                outlined
                mask="time"
                :rules="['time']"
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="openingTime" />
                    </q-popup-proxy>
                  </q-icon>
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
                v-model="closingTime"
                dense
                outlined
                mask="time"
                :rules="['timeOrFulltime']"
              >
                <template v-slot:append>
                  <q-icon
                    name="access_time"
                    class="cursor-pointer"
                  >
                    <q-popup-proxy
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-time v-model="closingTime" />
                    </q-popup-proxy>
                  </q-icon>
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
                outlined
                v-model="email"
                label="E-mail"
                dense
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
                v-model="location"
                label="Location"
                dense
                :loading="loadingState"
              >
                <template v-slot:append>
                  <q-icon
                    name="location_searching"
                    class="cursor-pointer"
                    @click="getCurrentLocation()"
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
              :loading="this.loading"
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

    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    profile: {
      type: Object,
      requried: true
    },

    loading: {
      type: Boolean,
      required: true
    }
  },

  data () {
    return {
      merchantName: this.profile.merchant_name,
      openingTime: this.profile.opening,
      closingTime: this.profile.closing,
      contactNumber: this.profile.contact_num,
      accountType: this.profile.account_type,
      location: this.profile.location,
      lat: this.profile.lat,
      long: this.profile.long,
      loadingState: false
    }
  },

  methods: {
    getCurrentLocation () {
      this.loadingState = true
      navigator.geolocation.getCurrentPosition(
        (position) => {
          var latitude = position.coords.latitude
          var longitude = position.coords.longitude

          this.$store.dispatch('merchantSettingsModule/getCurrentLocation', {
            lat: latitude,
            long: longitude
          })
            .then(response => {
              this.loadingState = false
              this.location = response.data.results[0].formatted_address
              this.lat = latitude
              this.long = longitude
            })
            .catch(error => {
              console.log(error)
            })
        },
        (error) => {
          alert('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
        },
        {
          enableHighAccuracy: true
        }
      )
    },

    onSubmit () {
      this.$emit('submitting', {
        merchantName: this.merchantName,
        openingTime: this.openingTime,
        closingTime: this.closingTime,
        contactNumber: this.contactNumber,
        location: this.location,
        lat: this.lat.toFixed(7),
        long: this.long.toFixed(7)
      })
    },

    onReset () {
      this.merchantName = this.profile.merchant_name
      this.openingTime = this.profile.opening
      this.closingTime = this.profile.closing
      this.contactNumber = this.profile.contact_num
      this.accountType = this.profile.account_type
      this.location = this.profile.location
    }
  }
}
</script>
