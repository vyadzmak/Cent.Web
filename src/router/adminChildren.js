import Users from '@/components/administration/users/Users.vue'
import Companies from '@/components/administration/companies/Companies.vue'
import Settings from '@/components/administration/settings/Settings.vue'
import Log from '@/components/administration/log/Log.vue'
import Reports from '@/components/administration/reports/Reports.vue'
import Events from '@/components/administration/events/Events.vue'
import Company from '@/components/administration/company/Company.vue'

import companyChildren from './adminCompanyChildren'

const adminChildren = [
  {
    path: 'log',
    name: 'administration.log',
    component: Log
  },
  {
    path: 'companies',
    name: 'administration.companies',
    component: Companies
  },
  {
    path: 'users',
    name: 'administration.users',
    component: Users
  },
  {
    path: 'settings',
    name: 'administration.settings',
    component: Settings
  },
  {
    path: 'reports',
    name: 'administration.reports',
    component: Reports
  },
  {
    path: 'events',
    name: 'administration.events',
    component: Events
  },
  {
    path: 'company',
    name: 'administration.company',
    component: Company,
    redirect: to => {
      return {name: 'administration.company.general'}
    },
    children: companyChildren
  }]

export default adminChildren
