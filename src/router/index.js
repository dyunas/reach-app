/* eslint-disable prettier/prettier */
import Vue from "vue"
import VueRouter from "vue-router"

import routes from "./routes"

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (!store.getters['loginModule/authState']) {
        next('/')
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
      if (store.getters['loginModule/authState']) {
        const userLevel = store.getters['loginModule/userLevel']
        if (userLevel === 'admin') {
          next('/admin/dashboard')
        } else if (userLevel === 'merchant') {
          next('/merchant/dashboard')
        } else if (userLevel === 'dasher') {
          next('/dasher/dashboard')
        } else {
          next('/user/dashboard')
        }
      } else {
        next()
      }
    } else {
      next() // make sure to always call next()!
    }
  })

  return Router
}
