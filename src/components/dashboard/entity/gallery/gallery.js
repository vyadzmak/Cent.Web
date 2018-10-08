export default {
  name: 'entityGallery',
  data () {
    return {
      rowsPerPageItems: [6, 9, 12],
      pagination: {
        rowsPerPage: 6
      }
    }
  },
  computed: {
    userData: function () {
      return this.$store.getters.userData
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
