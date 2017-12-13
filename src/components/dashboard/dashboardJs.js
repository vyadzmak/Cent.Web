import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dashboard',
  data () {
    console.log(this.$router)
    console.log(this.$route)
    return {
      msg: 'this is dashboard',
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Cent Fusion',
      fabSettings: {
        direction: 'bottom',
        fab: false,
        fling: false,
        hover: false,
        tabs: null,
        top: false,
        right: true,
        bottom: false,
        left: false,
        transition: 'slide-y-reverse-transition'
      }
    }
  },
  computed: {
    userData: function () {
      return this.$store.state.userData
    },
    items: function () {
      return [
        { icon: 'dashboard', title: 'Объекты', path: '/entities', visible: this.$router.requireAuth({name: 'Entities'}) },
        { icon: 'web', title: 'Настройки данных', path: '/dataSettings', visible: this.$router.requireAuth({name: 'DataSettings'}) },
        { icon: 'mdi-domain', title: 'Компании', path: '/companies', visible: this.$router.requireAuth({name: 'Companies'}) },
        { icon: 'supervisor_account', title: 'Пользователи', path: '/users/'+this.userData.client_id, visible: this.$router.requireAuth({name: 'Users'}) && this.userData.user_role_id === 2 },
        { icon: 'settings', title: 'Системные настройки', path: '/settings', visible: this.$router.requireAuth({name: 'Settings'}) },
        { icon: 'mdi-information-outline', title: 'Лог', path: '/log', visible: this.$router.requireAuth({name: 'Log'}) }
      ]
    }
  },
  methods: {
    logOut: function () {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите выйти?',
          title: 'Выход',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => {
          this.$store.commit('deleteUserData')
          this.$router.push({path: '/login'})
        },
        modalCancel => {}
    ).catch(
      err => {
        console.log(err)
      }
    )
    },
    showUpdateModal: function () {
      let item = _.cloneDeep(this.userData)
      let isUpdate = true
      let modalConfig = {
        size: 'lg',
        data: {
          title: (isUpdate ? 'Обновление' : 'Добавление') + ' пользователя',
          isClosable: true,
          item: isUpdate ? Object.assign({}, item) : item
        }
      }
      ModalService.open(updateModal, modalConfig).then(
          modalSubmit => {
            // this.updateItem(modalSubmit, isUpdate)
          },
          modalCancel => { console.log(modalCancel) }
      ).catch(err => { console.log(err) })
    }
  }
}
