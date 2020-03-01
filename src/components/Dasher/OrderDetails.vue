<template>
  <q-page>
    <q-card class="my-card q-pa-md">
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-h6">Order ID: {{ this.order[0].order_id }}</div>
        </div>
      </div>
      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Customer Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Customer Name: {{ this.order[0].customer.fname +' '+ this.order[0].customer.lname }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Contact Number: {{ '+63' + this.order[0].customer.contact_number  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Location: {{ this.order[0].location  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Status: {{ this.order[0].status  }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Payment Mode: {{ this.order[0].paymentMode  }}</div>
        </div>
      </div>

      <br />

      <h6 class="text-body1 pageHeader text-weight-bold">Merchant Info:</h6>
      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Merchant: {{ this.order[0].merchant.merchant_name }}</div>
        </div>
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">Location: {{ this.order[0].merchant.location }}</div>
        </div>
      </div>
    </q-card>

    <br />
    <div class="row">
      <q-btn
        class="full-width"
        color="primary"
        icon="directions"
        label="Get directions to merchant"
        @click="getMapDirectionsToMerchant"
        v-if="this.order[0].status !== 'Delivery on the way' && this.order[0].status !== 'Delivered'"
      />

      <q-btn
        class="full-width q-mt-md"
        color="primary"
        icon="directions"
        label="Get directions to customer"
        @click="getMapDirectionsToCustomer"
        v-if="this.order[0].status === 'Delivery on the way' && this.order[0].status !== 'Delivered'"
      />
    </div>
    <br />

    <q-card class="my-card q-pa-md">
      <h6 class="text-body1 pageHeader text-weight-bold">Order:</h6>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-item>
          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">Product</span>
          </q-item-section>

          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">Price</span>
          </q-item-section>

          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">Qty.</span>
          </q-item-section>

          <q-item-section>
            <span class="text-caption text-weight-bold text-uppercase">TOTAL</span>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item
          v-for="item in this.order[0].items"
          :key="item.id"
        >
          <q-item-section>
            <q-item-label>
              <span class="text-caption text-uppercase">{{ item.name }}</span>
            </q-item-label>

          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ parseFloat(item.price).toFixed(2) }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ item.qty }}
            </q-item-label>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ qtyTotal(item.price, item.qty) }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Subtotal:
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ 'Php ' + this.order[0].subTotal }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Delivery Fee:
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-grey-8 text-uppercase">
              Php 35.00
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-weight-bold text-uppercase">
              Total:
            </q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-grey-8 text-uppercase">
              {{ 'Php ' + this.order[0].total }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <br />

    <q-card class="my-card q-pa-md">
      <h6 class="text-body1 pageHeader text-weight-bold">Instruction:</h6>

      <div class="row">
        <div class="col col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div class="text-body2">{{ this.order[0].instruction }}</div>
        </div>
      </div>
    </q-card>

    <q-btn
      class="full-width q-mt-md"
      color="primary"
      label="Pick up delivery"
      @click="updateOrderStatus('Delivery on the way')"
      v-if="this.order[0].status === 'Ready for delivery'"
    />

    <q-btn
      class="full-width q-mt-md"
      color="primary"
      label="Delivered/Drop off"
      @click="updateOrderStatus('Delivered')"
      v-if="this.order[0].status === 'Delivery on the way'"
    />

    <q-dialog
      v-model="dialog"
      persistent
      ref="destinationDialog"
      :maximized="maximizedToggle"
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-bar>
          <q-space />
          <q-btn
            dense
            flat
            icon="close"
            @click="closeDestinationDialog()"
          >
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Direction to: {{ destinationHeader }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
          >
            <div v-show="showReturnData">
              <div class="map-container">
                <div id="map"></div>
              </div>
            </div>
          </transition>
        </q-card-section>

        <q-inner-loading :showing="visible">
          <q-spinner-puff
            size="120px"
            :thickness="2"
            color="primary"
          />
          <div class="text-body2">Getting directions</div>
        </q-inner-loading>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'

export default {
  props: {
    order: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      dialog: false,
      maximizedToggle: true,
      visible: false,
      showReturnData: false,
      watchID: '',
      destinationHeader: ''
    }
  },

  mounted () {
    this.$echo.channel('rider-order-tracker-' + LocalStorage.getItem('ownerID'))
      .listen('UpdateOrder', (notify) => {
        this.getUpdatedOrderDetails(notify)
      })
  },

  destroy () {
    navigator.geolocation.clearWatch(this.watchID);
  },

  methods: {
    qtyTotal (price, qty) {
      return (parseFloat(price) * parseInt(qty)).toFixed(2)
    },

    getMapDirectionsToMerchant () {
      this.destinationHeader = this.order[0].merchant.merchant_name

      this.dialog = true
      this.visible = true
      this.showReturnData = false

      setTimeout(() => {
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();

        var mapOptions = {
          // center: new google.maps.LatLng(lat, long),
          zoom: 19,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions)

        directionsRenderer.setMap(map)

        this.watchID = navigator.geolocation.watchPosition(
          (position) => {
            var lat = position.coords.latitude.toFixed(7)
            var long = position.coords.longitude.toFixed(7)

            var merchLat = this.order[0].merchLat
            var merchLong = this.order[0].merchLong

            var request = {
              // travelMode: google.maps.DirectionsTravelMode.DRIVING,
              origin: new google.maps.LatLng(lat, long),
              destination: new google.maps.LatLng(merchLat, merchLong),
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC,
              provideRouteAlternatives: true,
            };

            directionsService.route(request, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response)
              } else
                alert('failed to get directions')
            })
          },
          this.onLocationError,
          {
            enableHighAccuracy: true,
            maximumAge: 0
          }
        )

        this.visible = false
        this.showReturnData = true
      }, 2000)
    },

    getMapDirectionsToCustomer () {
      this.destinationHeader = this.order[0].customer.fname + ' ' + this.order[0].customer.lname

      this.dialog = true
      this.visible = true
      this.showReturnData = false

      setTimeout(() => {
        var directionsService = new google.maps.DirectionsService();
        var directionsRenderer = new google.maps.DirectionsRenderer();

        var mapOptions = {
          // center: new google.maps.LatLng(lat, long),
          zoom: 19,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(document.getElementById("map"), mapOptions)

        directionsRenderer.setMap(map)

        this.watchID = navigator.geolocation.watchPosition(
          (position) => {
            var lat = position.coords.latitude.toFixed(7)
            var long = position.coords.longitude.toFixed(7)

            var custLat = this.order[0].custLat
            var custLong = this.order[0].custLong

            var request = {
              // travelMode: google.maps.DirectionsTravelMode.DRIVING,
              origin: new google.maps.LatLng(lat, long),
              destination: new google.maps.LatLng(custLat, custLong),
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC,
              provideRouteAlternatives: true,
            };

            directionsService.route(request, function (response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(response)
              } else
                alert('failed to get directions')
            })
          },
          this.onLocationError,
          {
            enableHighAccuracy: true,
            maximumAge: 0
          }
        )

        this.visible = false
        this.showReturnData = true
      }, 2000)
    },

    closeDestinationDialog () {
      navigator.geolocation.clearWatch(this.watchID);
      this.$refs.destinationDialog.hide()
    },

    onLocationError (error) {
      console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n')
    },

    getUpdatedOrderDetails (notify) {
      this.order[0].status = notify.notify.message
    },

    updateOrderStatus (status) {
      this.$store.dispatch('dasherDeliveryModule/updateOrderStatus', {
        id: this.order[0].id,
        status: status
      })
        .then(response => {
          this.order[0].status = status
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
  margin: 5px 0px 10px 0px

.map-container
  width: 100%
  height: 500px

#map
 height: 100%  
</style>
