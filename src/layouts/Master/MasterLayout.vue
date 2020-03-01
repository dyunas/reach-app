<template>
  <q-layout
    view="hHh lpR fFf"
    :style="bgStyle"
  >
    <q-header
      elevated
      class="bg-white text-grey-8"
      height-hint="64"
    >
      <q-toolbar
        class="GPL__toolbar"
        style="height: 64px"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
          class="q-mx-md"
        />

        <q-toolbar-title
          v-if="$q.screen.gt.sm"
          shrink
          class="row items-center no-wrap"
        >
          <img src="https://cdn.quasar.dev/img/layout-gallery/logo-google.svg" />
          <!-- <img
            alt="REACH Logo"
            src="~assets/reach-logo-low.png"
          /> -->
        </q-toolbar-title>

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn
            round
            dense
            flat
            color="grey-8"
            icon="notifications"
            v-if="this.userType !== 'dasher'"
          >
            <div v-if="this.userType === 'customer'">
              <q-badge
                color="red"
                text-color="white"
                floating
                v-if="userOrderUpdateCount > 0"
              >
                {{ userOrderUpdateCount }}
              </q-badge>
              <q-tooltip>Notifications</q-tooltip>
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                v-if="userOrderUpdateCount > 0"
              >
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(update, index) in userOrderUpdates"
                    v-bind:key="index"
                    clickable
                    :to="{ path: '/user/my_orders/' + update.notify.path }"
                    @click="removeItemFromUserNotification(index)"
                  >
                    <q-item-section>
                      <span class="text-caption text-weight-bold">
                        {{ update.notify.header }}
                      </span>
                      <span class="text-caption text-weight-normal">
                        {{ update.notify.message }}
                      </span>
                      <span class="text-caption text-weight-light">
                        <timeago
                          :datetime="update.notify.date"
                          :auto-update="60"
                        ></timeago>
                      </span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                v-else
              >
                <q-list style="min-width: 100px">
                  <q-item>
                    <q-item-section>
                      NO NEW NOTIFICATION
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
            <div v-if="this.userType === 'merchant'">
              <q-badge
                color="red"
                text-color="white"
                floating
                v-if="merchantOrderUpdateCount > 0"
              >
                {{ merchantOrderUpdateCount }}
              </q-badge>
              <q-tooltip>Notifications</q-tooltip>
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                v-if="merchantOrderUpdates.length > 0"
              >
                <q-list style="min-width: 100px">
                  <q-item
                    v-for="(update, index) in merchantOrderUpdates"
                    v-bind:key="index"
                    clickable
                    :to="{ path: '/merchant/orders/' + update.notify.path }"
                    @click="removeItemFromMerchantNotification(index)"
                  >
                    <q-item-section>
                      <span class="text-caption text-weight-bold">
                        {{ update.notify.header }}
                      </span>
                      <span class="text-caption text-weight-normal">
                        {{ update.notify.message }}
                      </span>
                      <span class="text-caption text-weight-light">
                        <timeago
                          :datetime="update.notify.date"
                          :auto-update="60"
                        ></timeago>
                      </span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
              <q-menu
                transition-show="jump-down"
                transition-hide="jump-up"
                v-else
              >
                <q-list style="min-width: 100px">
                  <q-item>
                    <q-item-section>
                      NO NEW NOTIFICATION
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </q-btn>
          <q-btn
            round
            flat
          >
            <q-avatar size="26px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
            <q-tooltip>Account</q-tooltip>
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column items-center avatar_menu">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">{{ this.owner }}</div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    size="sm"
                    v-close-popup
                    @click="logout"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      show-if-above
      content-class="bg-white"
    >
      <q-scroll-area class="fit">
        <q-toolbar
          v-if="$q.platform.is.mobile"
          class="GPL__toolbar"
        >
          <q-toolbar-title class="row items-center text-grey-8">
            <!-- <img
              class="q-pl-md"
              src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_clr_74x24px.svg"
            /> -->
            <!-- <img
              alt="REACH Logo"
              src="~assets/reach-logo-low.png"
            /> -->
            <!-- <span class="q-ml-sm">Photos</span> -->
          </q-toolbar-title>
        </q-toolbar>

        <q-list padding>
          <q-item-label header>Navigation</q-item-label>
          <div v-if="this.userType === 'admin'">
            <admin-links></admin-links>
          </div>
          <div v-if="this.userType === 'merchant'">
            <q-item
              v-for="link in merchantLinks"
              :key="link.text"
              clickable
              class="q-router"
              v-ripple
              exact
              :to="link.path"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ link.text }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div v-if="this.userType === 'customer'">
            <q-item
              v-for="link in customerLinks"
              :key="link.text"
              clickable
              class="q-router"
              v-ripple
              exact
              :to="link.path"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ link.text }}
                  <span
                    v-if="link.icon === 'shopping_cart' && orderCount > 0"
                    class="badge badge__primary"
                  >{{ orderCount }}</span>
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <div v-if="this.userType === 'dasher'">
            <q-item
              v-for="link in dasherLinks"
              :key="link.text"
              clickable
              class="q-router"
              v-ripple
              exact
              :to="link.path"
            >
              <q-item-section avatar>
                <q-icon :name="link.icon" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ link.text }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </div>
          <q-separator />

          <div class="q-py-md q-px-md text-grey-9">
            <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
              <a
                v-for="button in buttons2"
                :key="button.text"
                class="GPL__drawer-footer-link"
                href="javascript:void(0)"
              >{{ button.text }}</a>
            </div>
          </div>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="GPL__page-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { QSpinnerBars } from 'quasar'
import { LocalStorage } from 'quasar'
import AdminLinks from "components/Navigation/AdminLinks";

export default {
  components: {
    AdminLinks
  },

  data () {
    return {
      bgStyle: {
        backgroundColor: "#FFFFFF"
      },
      mobileData: false,
      bluetooth: true,
      leftDrawerOpen: false,
      merchantLinks: [
        { icon: 'dashboard', text: 'Dashboard', path: '/merchant/dashboard' },
        { icon: 'store', text: 'My Products', path: '/merchant/my_products' },
        { icon: 'shopping_cart', text: 'Orders', path: '/merchant/orders' },
        { icon: 'build', text: 'Settings', path: '/merchant/settings' }
      ],
      customerLinks: [
        { icon: 'dashboard', text: 'Dashboard', path: '/user/dashboard' },
        { icon: 'shopping_cart', text: 'My Cart', path: '/user/my_cart' },
        { icon: 'receipt', text: 'My Orders', path: '/user/orders' },
        { icon: 'settings', text: 'Account Settings', path: '/user/settings' }
      ],
      dasherLinks: [
        { icon: 'dashboard', text: 'Dashboard', path: '/dasher/dashboard' },
        { icon: 'motorcycle', text: 'Deliveries', path: '/dasher/deliveries' },
        { icon: 'settings', text: 'Account Settings', path: '/dasher/settings' }
      ],
      buttons2: [
        { text: 'Terms & Conditions' }
      ],
      audio: {
        file: new Audio('statics/audios/loud_alarm.mp3'),
        isPlaying: false
      },
      intervalID: '',
      userOrderUpdateCount: 0,
      userOrderUpdates: [],
      merchantOrderUpdateCount: 0,
      merchantOrderUpdates: [],
    }
  },

  computed: {
    userType () {
      return this.$store.getters['loginModule/getUserType']
    },

    owner () {
      return this.$store.getters['loginModule/getOwner']
    },

    orderCount () {
      if (LocalStorage.getItem('type') === 'customer') {
        return this.$store.getters['userStoresModule/getOrderCount']
      }
    }
  },

  beforeDestroy () {
    this.audio.file.pause()
    this.audio.file.currentTime = 0
  },

  mounted () {
    if (LocalStorage.getItem('type') === 'customer') {
      this.$echo.channel('status-order-tracker-' + LocalStorage.getItem('ownerID'))
        .listen('UpdateOrder', (notify) => {
          this.userOrderUpdate(notify)
        })
    }

    if (LocalStorage.getItem('type') === 'merchant') {
      this.$echo.channel('merchant-tracker' + LocalStorage.getItem('ownerID'))
        .listen('PlacedOrder', (notify) => {
          this.merchantOrderUpdate(notify)
          this.audio.isPlaying = true
          this.audio.file.play()
          this.audio.file.loop = true
        })

      this.$echo.channel('merchant-order-tracker-' + LocalStorage.getItem('ownerID'))
        .listen('UpdateOrder', (notify) => {
          this.merchantOrderUpdate(notify)
        })
    }
  },

  methods: {
    logout () {
      const spinner = typeof QSpinnerBars !== 'undefined'
        ? QSpinnerBars // Non-UMD, imported above
        : Quasar.components.QSpinnerBars // eslint-disable-line
      this.$q.loading.show({
        spinner,
        spinnerColor: 'yellow-9',
        backgroundColor: 'yellow-1',
        message: 'Logging out. Please wait...',
        messageColor: 'yellow-9',
        delay: 400 // ms
      })
      this.$store.dispatch('loginModule/logout')
        .then(response => {
          this.$q.loading.hide()
          this.$router.push({ path: '/' })
        })
    },

    userOrderUpdate (notify) {
      this.userOrderUpdates.unshift(notify)
      this.userOrderUpdateCount = this.userOrderUpdates.length
    },

    merchantOrderUpdate (notify) {
      this.merchantOrderUpdates.unshift(notify)
      this.merchantOrderUpdateCount = this.merchantOrderUpdates.length
    },

    removeItemFromUserNotification (index) {
      this.userOrderUpdates.splice(index, 1)
      this.userOrderUpdateCount = this.userOrderUpdateCount - 1
      this.audio.isPlaying = false
      this.audio.file.pause()
      this.audio.file.currentTime = 0
    },

    removeItemFromMerchantNotification (index) {
      this.merchantOrderUpdates.splice(index, 1)
      this.merchantOrderUpdateCount = this.merchantOrderUpdateCount - 1
      this.audio.isPlaying = false
      this.audio.file.pause()
      this.audio.file.currentTime = 0
    }
  }
}
</script>

<style lang="sass">
.avatar_menu
  width: 150px

.GPL
  &__toolbar
    height: 64px
    background-color: #E5E057
  &__toolbar-input
    width: 35%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      color: #000
  &__drawer-item
    line-height: 24px
    border-radius: 0 24px 24px 0
    margin-right: 12px
    .q-item__section--avatar
      padding-left: 12px
      .q-icon
        color: #5f6368
    .q-item__label:not(.q-item__label--caption)
      color: #3c4043
      letter-spacing: .01785714em
      font-size: .875rem
      font-weight: 500
      line-height: 1.25rem
    &--storage
      border-radius: 0
      margin-right: 0
      padding-top: 24px
      padding-bottom: 24px
  &__side-btn
    &__label
      font-size: 12px
      line-height: 24px
      letter-spacing: .01785714em
      font-weight: 500
  @media (min-width: 1024px)
    &__page-container
      padding-left: 94px

.badge 
  padding: 1px 9px 2px
  font-size: 12.025px
  font-weight: bold
  white-space: nowrap
  color: #ffffff
  background-color: #999999
  -webkit-border-radius: 9px
  -moz-border-radius: 9px
  border-radius: 9px
  &__primary
    background-color: #027BE3
</style>
