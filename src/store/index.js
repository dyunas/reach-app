import Vue from "vue";
import Vuex from "vuex";

import loginModule from './login-module'

// import adminModule from './admin-module'

import merchantDashboardModule from './merchant-module/dashboard'
import merchantProductsModule from './merchant-module/products'
import merchantSettingsModule from './merchant-module/settings'
import userDashboardModule from './user-module/dashboard'

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      loginModule,

      // admin
      // adminModule,

      // merchant
      merchantDashboardModule,
      merchantProductsModule,
      merchantSettingsModule,

      // user
      userDashboardModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  if (process.env.DEV && module.hot) {
    module.hot.accept(
      [
        './login-module',
      ],
      () => {
        const newLoginModule = require('./login-module').default

        // const newAdminModule = require('./admin-module').default

        const newMerchantDashboardModule = require('./merchant-module/dashboard').default
        const newMerchantProductsModule = require('./merchant-module/products').default
        const newMerchantSettingsModule = require('./merchant-module/settings').default
        const newUserDashboardModule = require('./user-module/dashboard').default

        Store.hotUpdate({
          modules: {
            loginModule: newLoginModule,
            // adminModule: newAdminModule,
            merchantDashboardModule: newMerchantDashboardModule,
            merchantProductsModule: newMerchantProductsModule,
            merchantSettingsModule: newMerchantSettingsModule,
            userDashboardModule: newUserDashboardModule,
          }
        })
      })
  }

  return Store;
}
