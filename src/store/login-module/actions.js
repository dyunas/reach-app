/* import axios */
import axios from "axios";
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from "quasar";

axios.defaults.baseURL = "http://192.168.0.10:8000/api";

export const login = (context, payload) => {
  return new Promise((resolve, reject) => {
    axios
      .post("/login", {
        data: {
          email: payload.email,
          password: payload.password
        },
        _method: "POST"
      })
      .then(response => {
        const token = "Bearer " + response.data.token;
        const type = response.data.account_type;
        const owner = response.data.owner;
        const ownerID = response.data.owner_id;

        LocalStorage.set("token", token);
        LocalStorage.set("type", type);
        LocalStorage.set("owner", owner);
        LocalStorage.set("ownerID", ownerID);

        context.commit("setCredentials", {
          token: token,
          type: type,
          owner: owner
        });

        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const logout = context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    if (LocalStorage.has("token")) {
      axios
        .post("/logout")
        .then(response => {
          LocalStorage.remove("token");
          LocalStorage.remove("type");
          LocalStorage.remove("owner");
          LocalStorage.remove("cart");
          LocalStorage.remove("cartCount");
          LocalStorage.remove("lat");
          LocalStorage.remove("long");
          LocalStorage.remove("merchantID");
          LocalStorage.remove("ownerID");
          context.commit("destroyToken");
          resolve(response.result);
        })
        .catch(error => {
          LocalStorage.remove("token");
          LocalStorage.remove("type");
          LocalStorage.remove("owner");
          LocalStorage.remove("cart");
          LocalStorage.remove("cartCount");
          LocalStorage.remove("lat");
          LocalStorage.remove("long");
          LocalStorage.remove("merchantID");
          LocalStorage.remove("ownerID");
          context.commit("destroyToken");
          reject(error);
        });
    }
  });
};

export const setCurrentLocation = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  if (LocalStorage.getItem("type") === "dasher") {
    // console.log(payload)
    return new Promise((resolve, reject) => {
      axios
        .post("/dasher_status", {
          lat: payload.lat,
          long: payload.long
        })
        .then(response => {
          LocalStorage.set("lat", payload.lat);
          LocalStorage.set("long", payload.long);
        })
        .catch(error => {
          reject(error);
        });
    });
  } else {
    LocalStorage.set("lat", payload.lat);
    LocalStorage.set("long", payload.long);
  }
};
