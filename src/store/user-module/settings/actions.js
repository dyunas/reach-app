/* import axios */
import axios from "axios";
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from "quasar";

axios.defaults.baseURL = "http://18.162.210.50/api";

export const getProfileDetails = context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/customer/" + LocalStorage.getItem("ownerID"))
      .then(response => {
        context.commit("setProfile", response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const updateProfile = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .post("/customer/" + LocalStorage.getItem("ownerID"), {
        data: {
          fname: payload.fname,
          lname: payload.lname,
          cnum: payload.cnum
        },
        _method: "PATCH"
      })
      .then(response => {
        context.commit("setProfile", response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const changePassword = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .post("/customer_changepassword", {
        data: {
          old_pword: payload.oldPword,
          new_pword: payload.newPword
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
