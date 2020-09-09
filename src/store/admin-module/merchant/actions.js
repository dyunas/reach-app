/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from "quasar";

/* import axios */
import axios from "axios";

axios.defaults.baseURL = "http://18.162.210.50/api";

export const createNewMerchant = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/merchant", {
        merchantName: payload.merchantName,
        email: payload.email,
        contactNumber: payload.contactNumber,
        brgyClearance: payload.brgyClearance,
        busPerm: payload.busPerm,
        dtiSec: payload.dtiSec,
        leaseTitle: payload.leaseTitle
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};

export const updateAccountStatus = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/update_merchant_account_status/" + payload.id, {
        data: {
          status: payload.status
        },
        _method: "PATCH"
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};

export const getMerchantList = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get(
        "/admin/merchant?startRow=" +
          payload.startRow +
          "&fetchCount=" +
          payload.fetchCount +
          "&filter=" +
          payload.filter +
          "&sortBy=" +
          payload.sortBy +
          "&desc=" +
          payload.descending
      )
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getMerchantListCount = context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/getMerchantCount")
      .then(response => {
        context.commit("setMerchantCount", response.data);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getMerchantDetails = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/merchant/" + payload.merchant_id)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
