import Vue from "vue";
import Vuex from "vuex";

import loginModule from "./login-module";

import adminCustomerModule from "./admin-module/customer";
import adminMerchantModule from "./admin-module/merchant";
import adminDasherModule from "./admin-module/dasher";
import adminTransactionModule from "./admin-module/transaction";
import adminRevenueModule from "./admin-module/revenue";

import merchantDashboardModule from "./merchant-module/dashboard";
import merchantProductsModule from "./merchant-module/products";
import merchantOrdersModule from "./merchant-module/orders";
import merchantSettingsModule from "./merchant-module/settings";

import dasherDeliveryModule from "./dasher-module/deliveries";
import dasherCommentsModule from "./dasher-module/comments";

import userDashboardModule from "./user-module/dashboard";
import userStoresModule from "./user-module/stores";
import userOrdersModule from "./user-module/orders";
import userRegisterModule from "./user-module/register";
import userSettingsModule from "./user-module/settings";

Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      loginModule,

      // admin
      adminCustomerModule,
      adminMerchantModule,
      adminDasherModule,
      adminTransactionModule,
      adminRevenueModule,

      // merchant
      merchantDashboardModule,
      merchantProductsModule,
      merchantOrdersModule,
      merchantSettingsModule,

      // dasher
      dasherDeliveryModule,
      dasherCommentsModule,

      // user
      userDashboardModule,
      userStoresModule,
      userOrdersModule,
      userRegisterModule,
      userSettingsModule
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });

  if (process.env.DEV && module.hot) {
    module.hot.accept(["./login-module"], () => {
      const newLoginModule = require("./login-module").default;

      const newAdminCustomerModule = require("./admin-module/customer").default;
      const newAdminMerchantModule = require("./admin-module/merchant").default;
      const newAdminDasherModule = require("./admin-module/dasher").default;
      const newAdminTransactionModule = require("./admin-module/transaction")
        .default;
      const newAdminRevenueModule = require("./admin-module/revenue").default;

      const newMerchantDashboardModule = require("./merchant-module/dashboard")
        .default;
      const newMerchantProductsModule = require("./merchant-module/products")
        .default;
      const newMerchantOrdersModule = require("./merchant-module/orders")
        .default;
      const newMerchantSettingsModule = require("./merchant-module/settings")
        .default;

      const newDasherDeliveryModule = require("./dasher-module/deliveries")
        .default;
      const newDasherCommentsModule = require("./dasher-module/comments")
        .default;

      const newUserDashboardModule = require("./user-module/dashboard").default;
      const newUserStoresModule = require("./user-module/stores").default;
      const newUserOrdersModule = require("./user-module/orders").default;
      const newUserRegisterModule = require("./user-module/register").default;
      const newUserSettingsModule = require("./user-module/settings").default;

      Store.hotUpdate({
        modules: {
          loginModule: newLoginModule,

          adminCustomerModule: newAdminCustomerModule,
          adminMerchantModule: newAdminMerchantModule,
          adminDasherModule: newAdminDasherModule,
          adminTransactionModule: newAdminTransactionModule,
          adminRevenueModule: newAdminRevenueModule,

          merchantDashboardModule: newMerchantDashboardModule,
          merchantProductsModule: newMerchantProductsModule,
          merchantOrdersModule: newMerchantOrdersModule,
          merchantSettingsModule: newMerchantSettingsModule,

          dasherDeliveryModule: newDasherDeliveryModule,
          dasherCommentsModule: newDasherCommentsModule,

          userDashboardModule: newUserDashboardModule,
          userStoresModule: newUserStoresModule,
          userOrdersModule: newUserOrdersModule,
          userRegisterModule: newUserRegisterModule,
          userSettingsModule: newUserSettingsModule
        }
      });
    });
  }

  return Store;
}
