
export default {
  name: 'dataSettings',
  data () {
    return {
      avatarPath: 'https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg',
      msg: 'Настройки данных',
      items: [{id: 1,
        icon: 'fas fa-home',
        name: 'Недвижимость',
        sIcons: [
          {icon: 'fas fa-user', badge: 12},
          {icon: 'fas fa-bell', badge: 14},
          {icon: 'fas fa-calendar', badge: 14},
          {icon: 'fas fa-link', badge: 14},
          {icon: 'fas fa-comment', badge: 14},
          {icon: 'fas fa-users', badge: 14},
          {icon: 'fas fa-share-alt', badge: 14}
        ]},
      {id: 2,
        icon: 'fas fa-car',
        name: 'Транспорт',
        sIcons: [
          {icon: 'fas fa-user', badge: 12},
          {icon: 'fas fa-bell', badge: 14},
          {icon: 'fas fa-calendar', badge: 14},
          {icon: 'fas fa-link', badge: 14},
          {icon: 'fas fa-comment', badge: 14},
          {icon: 'fas fa-users', badge: 14},
          {icon: 'fas fa-share-alt', badge: 14}
        ]},
      {id: 3,
        icon: 'fas fa-plane',
        name: 'Самолет',
        sIcons: [
          {icon: 'fas fa-user', badge: 12},
          {icon: 'fas fa-bell', badge: 14},
          {icon: 'fas fa-calendar', badge: 14},
          {icon: 'fas fa-link', badge: 14},
          {icon: 'fas fa-comment', badge: 14},
          {icon: 'fas fa-users', badge: 14},
          {icon: 'fas fa-share-alt', badge: 14}
        ]},
      {id: 4,
        icon: 'mdi-human-handsup',
        name: 'Субъекты',
        sIcons: [
          {icon: 'fas fa-user', badge: 12},
          {icon: 'fas fa-bell', badge: 14},
          {icon: 'fas fa-calendar', badge: 14},
          {icon: 'fas fa-link', badge: 14},
          {icon: 'fas fa-comment', badge: 14},
          {icon: 'fas fa-users', badge: 14},
          {icon: 'fas fa-share-alt', badge: 14}
        ]},
      {id: 5,
        icon: 'fas fa-plane',
        name: 'Самолет',
        sIcons: [
          {icon: 'fas fa-user', badge: 12},
          {icon: 'fas fa-bell', badge: 14},
          {icon: 'fas fa-calendar', badge: 14},
          {icon: 'fas fa-link', badge: 14},
          {icon: 'fas fa-comment', badge: 14},
          {icon: 'fas fa-users', badge: 14},
          {icon: 'fas fa-share-alt', badge: 14}
        ]},
      {id: 6,
        icon: 'mdi-human-handsup',
        name: 'Субъекты',
        sIcons: [
          {icon: 'fas fa-user', badge: 12},
          {icon: 'fas fa-bell', badge: 14},
          {icon: 'fas fa-calendar', badge: 14},
          {icon: 'fas fa-link', badge: 14},
          {icon: 'fas fa-comment', badge: 14},
          {icon: 'fas fa-users', badge: 14},
          {icon: 'fas fa-share-alt', badge: 14}
        ]}],
      contacts: [
        { title: 'Jason Oner', avatar: this.avatarPath },
        { title: 'Ranee Carlson', avatar: this.avatarPath },
        { title: 'Cindy Baker', avatar: this.avatarPath },
        { title: 'Ali Connors', avatar: this.avatarPath }
      ],
      news: [
        { title: 'Jason Oner', avatar: this.avatarPath, subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
        { title: 'Ranee Carlson', avatar: this.avatarPath, subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
        { title: 'Cindy Baker', avatar: this.avatarPath, subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' },
        { title: 'Ali Connors', avatar: this.avatarPath, subtitle: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.' }
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
          this.$router.push({name: 'Entities'})
          break
        case 2:
          this.$router.push({name: 'Entities'})
          break
        default: this.$store.commit('showSnackbar', {text: 'На данный момент функция недоступна, появится в ближайшее время', snackbar: true, context: 'success'})
          break
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
