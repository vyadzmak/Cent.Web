import questionDialog from '../questionDialog/QuestionDialog.vue'
import updateModal from './updateModal/UpdateModal.vue'
import { ModalService } from 'vue-modal-dialog'
import {admin, entities, settings} from '@/router/routeNames'

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
      title: 'Cent Fusion',
      fab: false
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    items () {
      return [
        { icon: 'dashboard',
          title: 'Объекты',
          path: '/dashboard/name',
          visible: this.$router.requireAuth({name: 'main'}, this.userData.user_role_id),
          isActive: _.includes(entities, this.$route.name)
        },
        { icon: 'web',
          title: 'Настройки данных',
          path: '/dataSettings',
          visible: this.$router.requireAuth({name: 'dataSettings'}, this.userData.user_role_id),
          isActive: _.includes(settings, this.$route.name)
        },
        { icon: 'mdi-worker',
          title: 'Администрирование',
          path: '/administration',
          visible: this.$router.requireAuth({name: 'administration'}, this.userData.user_role_id),
          isActive: _.includes(admin, this.$route.name)
        }
      ]
    },
    appliedMiniVariant () {
      switch (this.$vuetify.breakpoint.name) {
        case 'lg': return this.miniVariant
        case 'xl': return this.miniVariant
        default: return false
      }
    },
    messages () {
      return [
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams1', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams2', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams3', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams4', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams5', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
      ]
    },
    notifications () {
      return [
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer1', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams1', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen2', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt3', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra 4', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen5', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt6', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
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
          this.$store.dispatch('logout', null)
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
    },
    goToMessages: function (item) { console.log(item) },
    goToNotifications: function (item) { console.log(item) }
  }
}
