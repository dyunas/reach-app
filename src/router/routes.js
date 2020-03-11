import { LocalStorage } from "quasar"

const routes = [
  {
    path: "/",
    component: () => import("layouts/Login/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Auth/LoginPage/Index.vue") }
    ],
    meta: { requiresVisitor: true }
  },

  // Register links
  {
    path: "/register",
    component: () => import("layouts/Login/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Auth/RegisterPage/Index.vue") },
      { path: "success", component: () => import("pages/Auth/RegisterPage/Success.vue") },
      { path: "/validation/:id/:token", component: () => import("pages/Auth/RegisterPage/VerifyRegistration.vue") }
    ],
    meta: { requiresVisitor: true }
  },

  // Forgot password links
  {
    path: "/forgot-password",
    component: () => import("layouts/Login/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Auth/ForgotPassword/Index.vue") },
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
      { path: "users/customer/view/:id", component: () => import("pages/Admin/Users/Customer/View.vue") },

      { path: "users/merchant", component: () => import("pages/Admin/Users/Merchant/Index.vue") },
      { path: "users/merchant/register", component: () => import("pages/Admin/Users/Merchant/Create.vue") },
      { path: "users/merchant/view/:id", component: () => import("pages/Admin/Users/Merchant/View.vue") },

      { path: "users/dasher", component: () => import("pages/Admin/Users/Dasher/Index.vue") },
      { path: "users/dasher/register", component: () => import("pages/Admin/Users/Dasher/Create.vue") },
      { path: "users/dasher/view/:id", component: () => import("pages/Admin/Users/Dasher/View.vue") },

      { path: "reports/transaction", component: () => import("pages/Admin/Reports/Transaction/Index.vue") },
      { path: "reports/revenue", component: () => import("pages/Admin/Reports/Revenue/Index.vue") },
    ],
    beforeEnter (to, from, next) {
      if (LocalStorage.getItem('type') !== 'admin') {
        next(false)
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
    beforeEnter (to, from, next) {
      if (LocalStorage.getItem('type') !== 'merchant') {
        next(false)
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
      { path: "deliveries/:id", component: () => import("pages/Dasher/Deliveries/View.vue") },

      { path: "comments", component: () => import("pages/Dasher/Comments/Index.vue") },
    ],
    beforeEnter (to, from, next) {
      if (LocalStorage.getItem('type') !== 'dasher') {
        next(false)
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

      { path: "settings", component: () => import("pages/User/Settings/Index.vue") },
    ],
    beforeEnter (to, from, next) {
      if (LocalStorage.getItem('type') !== 'customer') {
        next(false)
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
