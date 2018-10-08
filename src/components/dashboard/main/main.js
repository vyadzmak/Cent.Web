const generateItems = function () {
  let marks = [{id: 1, icon: 'fas fa-home', name: 'Недвижимость'},
    {id: 2, icon: 'fas fa-car', name: 'Транспорт'},
    {id: 3, icon: 'fas fa-plane', name: 'Авиатранспорт'},
    {id: 4, icon: 'mdi-human-handsup', name: 'Субъекты'},
    {id: 5, icon: 'fas fa-plane', name: 'Авиатранспорт'},
    {id: 6, icon: 'mdi-human-handsup', name: 'Субъекты'}]
  let badges = [ 'fas fa-user', 'fas fa-bell', 'fas fa-calendar', 'fas fa-link', 'fas fa-comment',
    'fas fa-users', 'fas fa-share-alt']
  for (let i = 0; i < marks.length; i++) {
    marks[i].sIcons = []
    _.forEach(badges, badge => {
      marks[i].sIcons.push({icon: badge, badge: Math.floor(Math.random() * 20)})
    })
  }
  return marks
}

export default {
  name: 'dataSettings',
  data () {
    return {
      avatarPath: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg',
      msg: 'Настройки данных',
      items: generateItems(),
      contacts: [
        { title: 'Jason Oner', avatar: this.avatarPath },
        { title: 'Ranee Carlson', avatar: this.avatarPath },
        { title: 'Cindy Baker', avatar: this.avatarPath },
        { title: 'Ali Connors', avatar: this.avatarPath }
      ],
      news: [
        { title: 'Jason Oner', avatar: this.avatarPath, subtitle: 'Изменен объект Автомобиль' },
        { title: 'Ranee Carlson', avatar: this.avatarPath, subtitle: 'Изменен объект Пример недвижимого имущества' },
        { title: 'Cindy Baker', avatar: this.avatarPath, subtitle: 'Изменен субъект Иванов И.И.' },
        { title: 'Ali Connors', avatar: this.avatarPath, subtitle: 'Создан объект Автомобиль' }
      ],
      lastEntities: []
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
    goToItem (item) {
      switch (item.id) {
        case 1:
          this.$router.push({name: 'entities'})
          break
        case 2:
          this.$router.push({name: 'entities'})
          break
        default: this.$store.commit('showSnackbar', {text: 'На данный момент функция недоступна, появится в ближайшее время', snackbar: true, context: 'success'})
          break
      }
    },
    goToContact (item) { console.log(item) },
    goToNews (item) { console.log(item) },
    goToRecent (item) { console.log(item) }
  },
  created () {
  },
  mounted () {
  }
}
