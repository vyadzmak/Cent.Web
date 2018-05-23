
export default {
  name: 'CompanyAdministration',
  data () {
    return {
      msg: 'Настройки данных',
      items: [{id: 1, name: 'Общее', route: '/administration/company/general'},
        {id: 2, name: 'Пользователи', route: '/administration/company/users'},
        {id: 3, name: 'Группы', route: '/administration/company/groups'},
        {id: 4, name: 'Приватность', route: '/administration/company/privacy'},
        {id: 5, name: 'Статистика', route: '/administration/company/stats'},
        {id: 6, name: 'Управление', route: '/administration/company/manage'}]
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
