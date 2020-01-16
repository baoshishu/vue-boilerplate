import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import RouterView from '@/components/RouterView'
import store from '@/store'
import Login from '@/views/Login'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    redirect: '/sys1',
    component: Home,
    children: [
      {
        component: RouterView,
        path: '/sys1',
        children: [
          {
            path: 'mod1',
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
                path: 'child2',
                name: 'mod1-2',
                title: 'mod1-child2',
                component: () => import('@/views/mod1/Mod'),
              },
              {
                name: 'create_mod1',
                path: 'new',
                props: true,
                component: () => import('@/views/mod1/Create'),
              },
            ],
          },
          {
            path: 'mod2',
            icon: 'person',
            component: RouterView,
            title: 'mod2',
            children: [
              {
                path: '',
                name: 'mod2_list',
                title: 'mod2-child',
                component: () => import('@/views/mod2/List'),
              },
              {
                path: 'child2',
                name: 'mod2-2',
                title: 'mod2-child2',
                component: () => import('@/views/mod2/Mod'),
              },
              {
                name: 'create_mod1',
                path: 'new',
                props: true,
                component: () => import('@/views/mod2/Create'),
              },
            ],
          },
        ],
      },
      {
        component: RouterView,
        path: '/sys2',
        children: [
          {
            path: 'mod2',
            icon: 'person',
            component: RouterView,
            title: 'mod2',
            children: [
              {
                path: '',
                name: 'mod2_list',
                title: 'mod2-child',
                component: () => import('@/views/mod2/List'),
              },
              {
                path: 'child2',
                name: 'mod2-2',
                title: 'mod2-child2',
                component: () => import('@/views/mod2/Mod'),
              },
              {
                name: 'create_mod1',
                path: 'new',
                props: true,
                component: () => import('@/views/mod2/Create'),
              },
            ],
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
