import { LocalStorage } from "quasar"

const userLevel = (LocalStorage.has('type')) ? LocalStorage.getItem('type') : null

const routes = [
  {
    path: "/",
    component: () => import("layouts/Login/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Auth/LoginPage/Index.vue") }
    ],
    meta: { requiresVisitor: true }
  },

  // Admin links
  {
    path: "/admin/",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "dashboard", component: () => import("pages/Admin/DashboardPage/Index.vue") },

      { path: "users/customer", component: () => import("pages/Admin/Users/Customer/Index.vue") },
      { path: "users/merchant", component: () => import("pages/Admin/Users/Merchant/Index.vue") },
      { path: "users/dasher", component: () => import("pages/Admin/Users/Dasher/Index.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (userLevel !== null) {
        if (userLevel !== 'admin') {
          next(false)
        } else {
          next()
        }
      } else {
        next()
      }
    },
    meta: { requiresAuth: true }
  },

  // Merchant links
  {
    path: "/merchant/",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "dashboard", component: () => import("pages/Merchant/DashboardPage/Index.vue") },

      { path: "my_products", component: () => import("pages/Merchant/ProductsPage/Index.vue") },
      { path: "my_products/create", component: () => import("pages/Merchant/ProductsPage/Create.vue") },

      { path: "orders", component: () => import("pages/Merchant/Orders/Index.vue") },
      { path: "orders/:id", component: () => import("pages/Merchant/Orders/View.vue") },

      { path: "settings", component: () => import("pages/Merchant/SettingsPage/Index.vue") }
    ],
    beforeEnter: (to, from, next) => {
      if (userLevel !== null) {
        if (userLevel !== 'merchant') {
          next(false)
        } else {
          next()
        }
      } else {
        next()
      }
    },
    meta: { requiresAuth: true }
  },

  // Dasher links
  {
    path: "/dasher/",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "dashboard", component: () => import("pages/Dasher/DashboardPage/Index.vue") },

      { path: "deliveries", component: () => import("pages/Dasher/Deliveries/Index.vue") },
      { path: "deliveries/:id", component: () => import("pages/Dasher/Deliveries/View.vue") }
    ],
    beforeEnter: (to, from, next) => {
      if (userLevel !== null) {
        if (userLevel !== 'dasher') {
          next(false)
        } else {
          next()
        }
      } else {
        next()
      }
    },
    meta: { requiresAuth: true }
  },

  // Customer links
  {
    path: "/user/",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "dashboard", component: () => import("pages/User/DashboardPage/Index.vue") },
      { path: "merchant/:id", component: () => import("pages/User/Stores/View.vue") },

      { path: "my_cart", component: () => import("pages/User/Cart/View.vue") },
      { path: "my_cart/checkout", component: () => import("pages/User/Cart/CheckOut.vue") },
      { path: "my_cart/place_order", component: () => import("pages/User/Cart/PlaceOrder.vue") },

      { path: "orders", component: () => import("pages/User/MyOrders/Index.vue") },
      { path: "orders/:id", component: () => import("pages/User/MyOrders/View.vue") },
    ],
    beforeEnter: (to, from, next) => {
      if (userLevel !== null) {
        if (userLevel !== 'customer') {
          next(false)
        } else {
          next()
        }
      } else {
        next()
      }
    },
    meta: { requiresAuth: true }
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
