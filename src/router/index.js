import Vue from 'vue'
import Router from 'vue-router'

import dashboard from './dashboard'

import Login from '@/components/login/Login.vue'

import store from '../store/index'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    redirect: {path: '/'}
  }]
routes.push(dashboard)
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: routes
})

router.requireAuth = function (to, userRoleId) {
  let found = false
  let userRoutes = []
  switch (userRoleId) {
    case 1: userRoutes = [
      'dashboard',
      'main', 'entities',
      'entity', 'entity.access', 'entity.calendar', 'entity.card',
      'entity.documents', 'entity.events', 'entity.gallery', 'entity.groups',
      'entity.history', 'entity.map', 'entity.objects', 'entity.relations',
      'entity.reports', 'entity.settings', 'entity.subjects',
      'administration', 'administration.log', 'administration.companies',
      'administration.users', 'administration.settings', 'administration.company',
      'administration.reports', 'administration.events',
      'administration.company.general', 'administration.company.groups', 'administration.company.manage',
      'administration.company.privacy', 'administration.company.stats', 'administration.company.users',
      'dataSettings',
      'factories', 'factory', 'catalogs']
      break
    case 2:userRoutes = ['dashboard', 'factories', 'factory', 'entities', 'entity', 'dataSettings', 'catalogs']
      break
    case 3: userRoutes = ['dashboard', 'entities', 'entity']
      break
    case 7: userRoutes = ['dashboard']
      break
    default: break
  }
  found = _.includes(userRoutes, to.name)
  return found
}

router.beforeEach((to, from, next) => {
  let userRoleId = _.get(store, 'state.loginUser.userData.user_role_id')
  if (userRoleId) {
    if (router.requireAuth(to, userRoleId)) {
      next()
    } else {
      next({path: '/'})
    }
  } else {
    if (to.name === 'login') {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
