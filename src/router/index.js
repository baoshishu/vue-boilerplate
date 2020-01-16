import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import routes from './routes'

Vue.use(VueRouter)

function authGuard(router, isLogged) {
  router.beforeEach((to, from, next) => {
    if (
      to.matched.some(record => record.path === '*') ||
      ['/login'].includes(to.path) ||
      isLogged()
    ) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    }
  })
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})
authGuard(router, () => store.state.isLogin)

export default router
