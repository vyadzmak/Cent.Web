import General from '@/components/administration/company/general/General.vue'
import Groups from '@/components/administration/company/groups/Groups.vue'
import Manage from '@/components/administration/company/manage/Manage.vue'
import Privacy from '@/components/administration/company/privacy/Privacy.vue'
import Stats from '@/components/administration/company/stats/Stats.vue'
import Users from '@/components/administration/company/users/Users.vue'

const adminCompanyChildren = [ {
  path: 'general',
  name: 'administration.company.general',
  component: General
}, {
  path: 'groups',
  name: 'administration.company.groups',
  component: Groups
}, {
  path: 'manage',
  name: 'administration.company.manage',
  component: Manage
}, {
  path: 'privacy',
  name: 'administration.company.privacy',
  component: Privacy
}, {
  path: 'stats',
  name: 'administration.company.stats',
  component: Stats
}, {
  path: 'users',
  name: 'administration.company.users',
  component: Users
} ]

export default adminCompanyChildren
