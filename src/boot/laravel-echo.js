import Echo from "laravel-echo";

window.Pusher = require("pusher-js");

const echo = new Echo({
  broadcaster: "pusher",
  key: "f06035394d71e9714092",
  cluster: "ap1",
  encrypted: false
});

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$echo = echo;
};
