
export default {
  name: 'dataSettings',
  data () {
    return {
      msg: 'Настройки данных',
      items: [{id: 1, icon: 'mdi-information-outline', name: 'Лог', route: '/administration/log'},
        {id: 2, icon: 'mdi-domain', name: 'Компании', route: '/administration/companies'},
        {id: 3, icon: 'mdi-box-shadow', name: 'Компания', route: '/administration/company'},
        {id: 4, icon: 'mdi-account-multiple', name: 'Пользователи', route: '/administration/users/'},
        {id: 5, icon: 'mdi-settings', name: 'Системные настройки', route: '/administration/settings'},
        {id: 6, icon: 'mdi-file-chart', name: 'Отчеты', route: '/administration/reports'},
        {id: 7, icon: 'mdi-calendar-check', name: 'Системные события', route: '/administration/events'}]
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    }
  },
  methods: {},
  created () {
  },
  mounted () {
  }
}
