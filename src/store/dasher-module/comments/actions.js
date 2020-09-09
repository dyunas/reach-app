/* import axios */
import axios from "axios";

axios.defaults.baseURL = "http://18.162.210.50/api";

export const getDasherRating = context => {
  axios.defaults.headers.common["Authorization"] =
    context.rootState.loginModule.token;
  return new Promise((resolve, reject) => {
    axios
      .get("/ratings")
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
