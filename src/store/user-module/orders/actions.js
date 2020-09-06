/* import axios */
import axios from "axios";
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from "quasar";

axios.defaults.baseURL = "http://192.168.0.10:8000/api";

export const getOrderList = context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/customer_orders")
      .then(response => {
        context.commit("setOrders", response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getOrderDetails = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/customer_orders/" + payload.id)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const rateDasher = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .post("/ratings", {
        order_id: payload.order_id,
        customer_id: LocalStorage.getItem("ownerID"),
        dasher_id: payload.dasher_id,
        rating: payload.rating,
        comment: payload.comment
      })
      .then(response => {
        context.commit("setRating", response.data.rating);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const getRating = (context, payload) => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/ratings/" + payload.order_id)
      .then(response => {
        context.commit("setRating", response.data);
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
