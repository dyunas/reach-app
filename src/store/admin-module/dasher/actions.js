/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from "quasar";

/* import axios */
import axios from "axios";

axios.defaults.baseURL = "http://192.168.0.10:8000/api";

export const createNewDasher = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .post("/admin/dasher", {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        contactNumber: payload.contactNumber,
        nbiClearance: payload.nbiClearance,
        tin: payload.tin,
        driverLicense: payload.driverLicense,
        or_cr: payload.or_cr
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
      .post("/admin/update_dasher_account_status/" + payload.id, {
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

export const getDasherList = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get(
        "/admin/dasher?startRow=" +
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

export const getDasherListCount = context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/getDasherCount")
      .then(response => {
        context.commit("setDasherCount", response.data);
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getDasherDetails = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/dasher/" + payload.dasher_id)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getDasherRating = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/admin/getDasherRating?id=" + payload.dasher_id)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
