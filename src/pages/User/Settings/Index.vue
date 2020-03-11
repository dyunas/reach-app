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
              <my-profile :profile="this.profile" />
            </q-tab-panel>
            <q-tab-panel name="editProfile">
              <edit-profile
                :profile="this.profile"
                v-on:submitting="submitted"
                :loading="loading"
                :disabled="disabled"
              />
            </q-tab-panel>
            <q-tab-panel name="changePass">
              <change-password />
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import MyProfile from "components/User/MyProfile"
import EditProfile from "components/User/EditProfile"
import ChangePassword from "components/User/ChangePassword"

export default {
  components: {
    MyProfile,
    EditProfile,
    ChangePassword
  },

  data () {
    return {
      isDesktop: true,
      tab: 'profile',
      loading: false,
      disabled: false
    };
  },

  computed: {
    profile () {
      return this.$store.getters['userSettingsModule/profileDetails']
    }
  },

  created () {
    this.$store.dispatch('userSettingsModule/getProfileDetails')
  },

  methods: {
    submitted (payload) {
      this.loading = true
      this.disabled = true

      this.$store.dispatch('userSettingsModule/updateProfile', {
        fname: payload.fname,
        lname: payload.lname,
        cnum: payload.contactNumber
      })
        .then(response => {
          this.$q.notify({
            color: 'green-9',
            textColor: 'white',
            icon: 'fas fa-check-circle',
            message: 'Profile updated successfully!',
            position: 'top',
            timeout: 2000
          })

          this.loading = false
          this.disabled = false
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
</style>
