
export default {
  name: 'dataSettings',
  data () {
    return {
      msg: 'Настройки данных'
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
      }
    }
  },
  created () {
  },
  mounted () {
  }
}
