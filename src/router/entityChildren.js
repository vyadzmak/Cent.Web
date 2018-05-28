import Access from '@/components/dashboard/entity/access/Access.vue'
import Calendar from '@/components/dashboard/entity/calendar/Calendar.vue'
import Card from '@/components/dashboard/entity/card/Card.vue'
import Documents from '@/components/dashboard/entity/documents/Documents.vue'
import Events from '@/components/dashboard/entity/events/Events.vue'
import Gallery from '@/components/dashboard/entity/gallery/Gallery.vue'
import Groups from '@/components/dashboard/entity/groups/Groups.vue'
import Ehistory from '@/components/dashboard/entity/history/History.vue'
import Emap from '@/components/dashboard/entity/map/Map.vue'
import Objects from '@/components/dashboard/entity/objects/Objects.vue'
import Relations from '@/components/dashboard/entity/relations/Relations.vue'
import Reports from '@/components/dashboard/entity/reports/Reports.vue'
import Settings from '@/components/dashboard/entity/settings/Settings.vue'
import Subjects from '@/components/dashboard/entity/subjects/Subjects.vue'

const entityChildren = [
  {
    path: 'access',
    name: 'entity.access',
    component: Access
  }, {
    path: 'calendar',
    name: 'entity.calendar',
    component: Calendar
  }, {
    path: 'card',
    name: 'entity.card',
    component: Card
  }, {
    path: 'documents',
    name: 'entity.documents',
    component: Documents
  }, {
    path: 'events',
    name: 'entity.events',
    component: Events
  }, {
    path: 'gallery',
    name: 'entity.gallery',
    component: Gallery
  }, {
    path: 'groups',
    name: 'entity.groups',
    component: Groups
  }, {
    path: 'history',
    name: 'entity.history',
    component: Ehistory
  }, {
    path: 'map',
    name: 'entity.map',
    component: Emap
  }, {
    path: 'objects',
    name: 'entity.objects',
    component: Objects
  }, {
    path: 'relations',
    name: 'entity.relations',
    component: Relations
  }, {
    path: 'reports',
    name: 'entity.reports',
    component: Reports
  }, {
    path: 'settings',
    name: 'entity.settings',
    component: Settings
  }, {
    path: 'subjects',
    name: 'entity.subjects',
    component: Subjects
  }
]

export default entityChildren
