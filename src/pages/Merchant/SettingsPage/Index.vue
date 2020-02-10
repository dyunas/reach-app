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
              <div class="row">
                <div class="col col-lg-12 col-md-12 col-sm-12">
                  <q-card-section>
                    <q-markup-table>
                      <tbody>
                        <tr>
                          <td>Merchant: {{ this.profile.merchant_name }}</td>
                          <td>Store Hours: {{ (this.profile.opening !== '00:00:00' && this.profile.closing !== '00:00:00') ? this.profile.opening+' - '+ this.profile.closing : '24hrs' }}</td>
                          <td>Status: {{ this.profile.status }}</td>
                        </tr>
                        <tr>
                          <td>Email: {{ this.profile.email }}</td>
                          <td>Phone: {{ this.profile.contact_num }}</td>
                          <td>Account type: {{ this.profile.account_type }}</td>
                        </tr>
                        <tr>
                          <td colspan="3">Location: {{ this.profile.location }}</td>
                        </tr>
                        <tr>
                          <td colspan="3">Joined: {{ this.profile.created_at }}</td>
                        </tr>
                      </tbody>
                    </q-markup-table>
                  </q-card-section>
                </div>
                <div class="col col-lg-6 col-md-6 col-sm-6">
                  <q-card-section>
                    <div class="map-container">
                      <div id="map"></div>
                    </div>
                  </q-card-section>
                </div>
              </div>
            </q-tab-panel>
            <q-tab-panel name="editProfile"></q-tab-panel>
            <q-tab-panel name="changePass"></q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      isDesktop: true,
      tab: 'profile'
    };
  },

  computed: {
    profile () {
      return this.$store.getters['merchantSettingsModule/profileDetails']
    }
  },

  created () {
    this.getProfileDetails()
    this.getMap()
  },

  methods: {
    getProfileDetails () {
      this.$store.dispatch('merchantSettingsModule/getProfileDetails')
    },


    getMap () {
      var mapOptions = {
        center: new google.maps.LatLng(14.3472626, 121.0652705),
        zoom: 19,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var map = new google.maps.Map(document.getElementById("map"), mapOptions)

      var latLong = new google.maps.LatLng(14.3472626, 121.0652705)

      var marker = new google.maps.Marker({
        position: latLong
      });

      marker.setMap(map)
      map.setZoom(19)
      map.setCenter(marker.getPosition())
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
