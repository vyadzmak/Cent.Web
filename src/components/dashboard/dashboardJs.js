import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'dashboard',
  data () {
    return {
      msg: 'this is dashboard',
      clipped: true,
      drawer: true,
      fixed: true,
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'Landau',
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
        { icon: 'developer_board', title: 'Проекты', path: '/projects', visible: this.userData.user_role_id !== 4 },
        { icon: 'perm_contact_calendar', title: 'Компании', path: '/companies', visible: this.userData.user_role_id !== 4 },
        { icon: 'settings', title: 'Настройки', path: '/settings', visible: this.userData.user_role_id === 1 },
        { icon: 'history', title: 'Лог', path: '/log', visible: this.userData.user_role_id === 1 }
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
