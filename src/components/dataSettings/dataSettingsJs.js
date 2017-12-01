
export default {
  name: 'dataSettings',
  data () {
    return {
      msg: 'Настройки данных',
      items: [{id: 1, icon: 'mdi-source-merge', name: 'Схемы объектов'},
      {id: 2, icon: 'mdi-format-list-numbers', name: 'Справочники'},
      {id: 3, icon: 'mdi-lock-open-outline', name: 'Настройка доступа'},
      {id: 4, icon: 'mdi-eye', name: 'Настройка Видимости'}]
    }
  },
  computed: {
    userData: function () {
      return this.$store.state.userData
    }
  },
  methods: {
    goToSetting (n) {
      switch (n) {
        case 1:
          this.$router.push({name: 'Factories'})
          break
        case 2:
          this.$router.push({name: 'Catalogs'})
          break
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
