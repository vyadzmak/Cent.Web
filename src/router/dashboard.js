import Dashboard from '@/components/dashboard/Dashboard.vue'
import Main from '@/components/dashboard/main/Main.vue'
import Entity from '@/components/dashboard/entity/Entity.vue'
import Entities from '@/components/entities/Entities.vue'
import Factories from '@/components/factories/Factories.vue'
import Factory from '@/components/factory/Factory.vue'
import DataSettings from '@/components/dataSettings/DataSettings.vue'
import Catalogs from '@/components/catalogs/Catalogs.vue'
import Administration from '@/components/administration/Administration.vue'

import adminChildren from './adminChildren'
import entityChildren from './entityChildren'

const dashboard = {
  path: '/',
  name: 'dashboard',
  component: Dashboard,
  exact: true,
  redirect: to => {
    return {name: 'main'}
  },
  children: [ {
    path: 'main',
    name: 'main',
    component: Main
  },
  {
    path: 'factories',
    name: 'factories',
    component: Factories
  },
  {
    path: 'factory',
    name: 'factory',
    component: Factory
  },
  {
    path: 'entities',
    name: 'entities',
    component: Entities
  },
  {
    path: 'entity/:id',
    name: 'entity',
    component: Entity,
    children: entityChildren,
    redirect: to => {
      return {name: 'entity.card'}
    }
  },
  {
    path: 'dataSettings',
    name: 'dataSettings',
    component: DataSettings
  },
  {
    path: 'catalogs',
    name: 'catalogs',
    component: Catalogs
  },
  {
    path: 'administration',
    name: 'administration',
    component: Administration,
    redirect: to => {
      return {name: 'administration.log'}
    },
    children: adminChildren
  }]
}

export default dashboard
