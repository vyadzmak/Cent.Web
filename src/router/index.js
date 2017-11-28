import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard'
import Login from '@/components/login/Login'
import Users from '@/components/users/Users'
import Companies from '@/components/companies/Companies'
import Factories from '@/components/factories/Factories'
import Entities from '@/components/entities/Entities'
import Entity from '@/components/entity/Entity'
import Settings from '@/components/settings/Settings'
import Log from '@/components/log/Log'
import store from '../store/index'

Vue.use(Router)

function requireAuth (to, from, next) {
  let found = false
  if (store.state.userData) {
    let userRoutes = []
    switch (store.state.userData.user_role_id) {
      case 1: userRoutes = ['Dashboard', 'Users', 'Companies', 'Factories', 'Entities', 'Settings', 'Log', 'Entity']
        break
      case 2:
      case 3: userRoutes = ['Dashboard', 'Users', 'Companies', 'Factories', 'Entities', 'Entity']
        break
      default: break
    }
    found = userRoutes.indexOf(to.name) !== -1
  }
  return found
}

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    redirect: to => {
      let rPath = ''
      let switcher = store.state.userData ? store.state.userData.user_role_id : 0
      switch (switcher) {
        case 1:
        case 2:
        case 3:
          rPath = '/entities'
          break
        default:
          rPath = '/login'
          break
      }
      return {path: rPath}
    },
    children: [{
      path: '/users/:id',
      name: 'Users',
      component: Users
    },
    {
      path: '/companies',
      name: 'Companies',
      component: Companies
    },
    {
      path: '/factories',
      name: 'Factories',
      component: Factories
    },
    {
      path: '/entities',
      name: 'Entities',
      component: Entities
    },
    {
      path: '/entity/:id',
      name: 'Entity',
      component: Entity
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/log',
      name: 'Log',
      component: Log
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    redirect: {path: '/'}
  }]
})

router.beforeEach((to, from, next) => {
  if (requireAuth(to, from, next) || to.name === 'Login') {
    next()
  } else {
    next({ path: '/login' })
  }
})

export default router