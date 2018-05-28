export default {
  name: 'entity.card',
  data () {
    return {
    }
  },
  computed: {
    userData () {
      return this.$store.getters.userData
    },
    entity: function () {
      return this.$store.getters.currentEntity
    },
    generalFields () {
      return this.entity && this.entity.general_section
        ? _.filter(this.entity.general_section.data.fields, item => { return item.output_value })
        : []
    }
  },
  methods: {
  },
  created () {
  },
  mounted () {
  }
}
