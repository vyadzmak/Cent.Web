
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
  },
  created () {
  },
  mounted () {
  }
}
