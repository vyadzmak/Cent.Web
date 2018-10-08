export const admin = ['administration', 'administration.log', 'administration.companies',
  'administration.users', 'administration.settings', 'administration.company',
  'administration.reports', 'administration.events',
  'administration.company.general', 'administration.company.groups', 'administration.company.manage',
  'administration.company.privacy', 'administration.company.stats', 'administration.company.users']
export const entities = ['main', 'entities',
  'entity', 'entity.access', 'entity.calendar', 'entity.card',
  'entity.documents', 'entity.events', 'entity.gallery', 'entity.groups',
  'entity.history', 'entity.map', 'entity.objects', 'entity.relations',
  'entity.reports', 'entity.settings', 'entity.subjects']
export const settings = ['dataSettings', 'factories', 'factory', 'catalogs']

export const getRoutes = function (types) {
  let names = []
  if (types.entity_route_access) {
    names = names.concat(entities)
  }
  if (types.admin_route_access) {
    names = names.concat(admin)
  }
  if (types.data_settings_route_access) {
    names = names.concat(settings)
  }
  names.push('dashboard')
  return names
}
