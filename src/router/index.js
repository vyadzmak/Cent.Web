import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import Login from '@/components/login/Login.vue'
import Factories from '@/components/factories/Factories.vue'
import Factory from '@/components/factory/Factory.vue'
import Entities from '@/components/entities/Entities.vue'
import Entity from '@/components/entity/Entity.vue'
import DataSettings from '@/components/dataSettings/DataSettings.vue'
import Catalogs from '@/components/catalogs/Catalogs.vue'
import Administration from '@/components/administration/Administration.vue'
import AdminUsers from '@/components/administration/users/Users.vue'
import AdminCompanies from '@/components/administration/companies/Companies.vue'
import AdminSettings from '@/components/administration/settings/Settings.vue'
import AdminLog from '@/components/administration/log/Log.vue'
import AdminReports from '@/components/administration/reports/Reports.vue'
import AdminEvents from '@/components/administration/events/Events.vue'
import AdminCompany from '@/components/administration/company/Company.vue'
import AdminCompanyGeneral from '@/components/administration/company/general/General.vue'
import AdminCompanyGroups from '@/components/administration/company/groups/Groups.vue'
import AdminCompanyManage from '@/components/administration/company/manage/Manage.vue'
import AdminCompanyPrivacy from '@/components/administration/company/privacy/Privacy.vue'
import AdminCompanyStats from '@/components/administration/company/stats/Stats.vue'
import AdminCompanyUsers from '@/components/administration/company/users/Users.vue'
import store from '../store/index'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    exact: true,
    redirect: to => {
      let rPath = ''
      let switcher = store.state.loginUser.userData ? store.state.loginUser.userData.user_role_id : 0
      switch (switcher) {
        case 1:
        case 2:
        case 3:
          rPath = 'Entities'
          break
        default:
          rPath = 'Login'
          break
      }
      return {name: rPath}
    },
    children: [ {
      path: '/factories',
      name: 'Factories',
      component: Factories
    },
    {
      path: '/factory',
      name: 'Factory',
      component: Factory
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
      path: '/dataSettings',
      name: 'DataSettings',
      component: DataSettings
    },
    {
      path: '/catalogs',
      name: 'Catalogs',
      component: Catalogs
    },
    {
      path: '/administration',
      name: 'administration',
      component: Administration,
      redirect: to => {
        return {name: 'administration.log'}
      },
      children: [
        {
          path: '/administration/log',
          name: 'administration.log',
          component: AdminLog
        },
        {
          path: '/administration/companies',
          name: 'administration.companies',
          component: AdminCompanies
        },
        {
          path: '/administration/users',
          name: 'administration.users',
          component: AdminUsers
        },
        {
          path: '/administration/settings',
          name: 'administration.settings',
          component: AdminSettings
        },
        {
          path: '/administration/reports',
          name: 'administration.reports',
          component: AdminReports
        },
        {
          path: '/administration/events',
          name: 'administration.events',
          component: AdminEvents
        },
        {
          path: '/administration/company',
          name: 'administration.company',
          component: AdminCompany,
          redirect: to => {
            return {name: 'administration.company.general'}
          },
          children: [ {
            path: '/administration/company/general',
            name: 'administration.company.general',
            component: AdminCompanyGeneral
          }, {
            path: '/administration/company/groups',
            name: 'administration.company.groups',
            component: AdminCompanyGroups
          }, {
            path: '/administration/company/manage',
            name: 'administration.company.manage',
            component: AdminCompanyManage
          }, {
            path: '/administration/company/privacy',
            name: 'administration.company.privacy',
            component: AdminCompanyPrivacy
          }, {
            path: '/administration/company/stats',
            name: 'administration.company.stats',
            component: AdminCompanyStats
          }, {
            path: '/administration/company/users',
            name: 'administration.company.users',
            component: AdminCompanyUsers
          } ]
        }]
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

router.requireAuth = function (to, userRoleId) {
  let found = false
  let userRoutes = []
  switch (userRoleId) {
    case 1: userRoutes = ['administration', 'administration.log', 'administration.companies',
      'administration.users', 'administration.settings', 'administration.company',
      'administration.reports', 'administration.events',
      'administration.company.general', 'administration.company.groups', 'administration.company.manage',
      'administration.company.privacy', 'administration.company.stats', 'administration.company.users',
      'Dashboard', 'Factories', 'Factory',
      'Entities', 'Entity', 'DataSettings', 'Catalogs']
      break
    case 2:userRoutes = ['Dashboard', 'Factories', 'Factory', 'Entities', 'Entity', 'DataSettings', 'Catalogs']
      break
    case 3: userRoutes = ['Dashboard', 'Entities', 'Entity']
      break
    case 7: userRoutes = ['Dashboard']
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
    if (to.name === 'Login') {
      next()
    } else {
      next({ name: 'Login' })
    }
  }
})

export default router
