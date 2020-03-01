<!-- eslint-disable prettier/prettier -->
<template>
  <q-page>
    <h4 class="pageHeader">Settings</h4>

    <div class="q-pa-md row q-gutter-md">
      <div class="col col-md-12 col-lg-12">
        <q-card
          flat
          bordered
          class="my-card"
        >
          <q-tabs
            v-model="tab"
            class="text-primary shadow-2"
            align="left"
            inline-label
          >
            <q-tab
              icon="face"
              label="Profile"
              name="profile"
            />
            <q-tab
              icon="create"
              label="Edit Profile"
              name="editProfile"
            />
            <q-tab
              icon="lock_open"
              label="Change Password"
              name="changePass"
            />
          </q-tabs>

          <q-separator />

          <q-tab-panels
            v-model="tab"
            animated
          >
            <q-tab-panel name="profile">
              <my-profile :profile="this.profile"></my-profile>
            </q-tab-panel>
            <q-tab-panel name="editProfile">
              <edit-profile
                :profile="this.profile"
                v-on:submitting="submitted"
                :loading="loading"
              ></edit-profile>
            </q-tab-panel>
            <q-tab-panel name="changePass"></q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import MyProfile from "components/Merchant/MyProfile"
import EditProfile from "components/Merchant/EditProfile"

export default {
  components: {
    MyProfile,
    EditProfile
  },

  data () {
    return {
      isDesktop: true,
      tab: 'profile',
      loading: false
    };
  },

  computed: {
    profile () {
      return this.$store.getters['merchantSettingsModule/profileDetails']
    }
  },

  created () {
    this.getProfileDetails()
  },

  methods: {
    getProfileDetails () {
      this.$store.dispatch('merchantSettingsModule/getProfileDetails')
    },

    submitted (payload) {
      this.loading = true

      this.$store.dispatch('merchantSettingsModule/updateProfile', {
        merchantName: payload.merchantName,
        openingTime: payload.openingTime,
        closingTime: payload.closingTime,
        email: payload.email,
        contactNumber: payload.contactNumber,
        location: payload.location,
        lat: payload.lat,
        long: payload.long,
        id: this.profile.id
      })
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Profile updated successfully!',
            position: 'top',
            timeout: 3000
          })

          this.loading = false
        })
        .catch(error => {
          console.log(error.data)
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.pageHeader
  margin: 15px 0px 5px 15px

.map-container
  width: 100%
  height: 300px

#map
 height: 100%
</style>
