import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RouterView from '@/components/RouterView'
import store from '@/store'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/mod1',
    component: Home,
    children: [
      {
        path: '/mod1',
        icon: 'person',
        component: RouterView,
        title: 'mod1',
        children: [
          {
            path: '',
            name: 'mod1_list',
            title: 'mod1-child',
            component: () => import('@/views/mod1/List'),
          },
          {
            name: 'create_mod1',
            path: 'new',
            props: true,
            component: () => import('@/views/mod1/Create'),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: {
      render() {
        return <Login title="Admin" description="Login to Admin" />
      },
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/NotFound.vue'),
  },
  {
    path: '*',
    redirect: {
      name: '404',
    },
  },
]

export const MENU_MODULES = routes[0].children

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
