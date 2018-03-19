export default {
  name: 'login',
  data () {
    return {
      msg: 'Авторизация',
      fixed: true,
      loginData: {Login: '', Password: ''},
      valid: false,
      rememberMe: false,
      controlsDisabled: false,
      passwordRules: [
        (v) => !!v || 'Введите пароль',
        (v) => v.length > 3 || 'Пароль должен быть больше 3-х символов',
        (v) => v.length <= 10 || 'Пароль должен быть не более 10-и символов'
      ],
      emailRules: [
        (v) => !!v || 'Введите логин',
        (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Введите валидный е-mail'
      ],
      errors: []
    }
  },
  computed: {
  },
  methods: {
    loginUser: function () {
      if (this.valid) {
        this.controlsDisabled = true
        this.$store.commit('showSpinner', true)
        this.$http.post('login',
          {login: this.loginData.Login, password: this.loginData.Password},
          {timeout: 30000})
          .then(response => {
            this.$store.commit('showSpinner', false)
            let responseData = response.data
            if (responseData.user_data.lock_state) {
              this.controlsDisabled = false
              this.$store.commit('showSnackbar', {text: 'Пользователь заблокирован. Обратитесь к администратору', snackbar: true, context: 'warning'})
            } else {
              let savedUser = responseData.user_data
              savedUser.login_data = {}
              savedUser.login_data.login = responseData.login
              savedUser.login_data.password = responseData.password
              if (this.rememberMe) {
                this.$store.commit('addRUserData', savedUser)
              } else {
                this.$store.commit('addUserData', savedUser)
              }
              this.$router.push({ path: '/' })
            }
          })
          .catch(e => {
            this.controlsDisabled = false
            this.errors.push(e)
            let text = 'Авторизация не удалась. Превышено время ожидания'
            if (e.response) {
              text = e.response.status === 403 ? 'Пользователь не найден. Введите верный логин и пароль' : 'Ошибка авторизации, обратитесь к администратору.'
            }
            this.$store.commit('showSnackbar', {text, snackbar: true, context: 'error'})
            this.$store.commit('showSpinner', false)
          })
      }
    }
  }
}
