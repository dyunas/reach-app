/* import axios */
import axios from "axios";
/* import LocalStorage plugin for storing data in browser localstorage */
import { LocalStorage } from "quasar";

axios.defaults.baseURL = "http://18.162.210.50/api";

export const getDailyRevenue = async context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;

  const dailyRevenue = await new Promise((resolve, reject) => {
    axios
      .get("/merchant/revenue/getDailyRevenue")
      .then(response => {
        resolve(response.data[0].totalRevenue);
      })
      .catch(error => {
        reject(error);
      });
  });

  context.commit(
    "setDailyRevenue",
    dailyRevenue > 0 ? parseFloat(dailyRevenue) : 0
  );
};

export const getMonthlyRevenue = async context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;

  const monthlyRevenue = await new Promise((resolve, reject) => {
    axios
      .get("/merchant/revenue/getMonthlyRevenue")
      .then(response => {
        resolve(response.data[0].totalRevenue);
      })
      .catch(error => {
        reject(error);
      });
  });

  context.commit(
    "setMonthlyRevenue",
    monthlyRevenue > 0 ? parseFloat(monthlyRevenue) : 0
  );
};
