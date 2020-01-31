const routes = [
  {
    path: "/",
    component: () => import("layouts/Login/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Auth/LoginPage/Index.vue") }
    ],
    meta: { requiresVisitor: true }
  },
  // {
  //   path: "/admin/dashboard",
  //   component: () => import("layouts/Master/MasterLayout.vue"),
  //   children: [
  //     { path: "", component: () => import("pages/DashboardPage/Index.vue") }
  //   ],
  //   meta: { requiresAuth: true }
  // },

  // Merchant links
  {
    path: "/merchant/dashboard",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Merchant/DashboardPage/Index.vue") }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: "/merchant/my_products/",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Merchant/ProductsPage/Index.vue") },
      { path: "create", component: () => import("pages/Merchant/ProductsPage/Create.vue") }
    ],
    meta: { requiresAuth: true }
  },
  {
    path: "/merchant/settings",
    component: () => import("layouts/Master/MasterLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Merchant/SettingsPage/Index.vue") }
    ],
    meta: { requiresAuth: true }
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
