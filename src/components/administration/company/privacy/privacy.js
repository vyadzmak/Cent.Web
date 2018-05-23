export default {
  name: 'companyGeneral',
  data () {
    return {
      items: ['Наименование организации', 'Учетный номер', 'Тип организации', 'Юридический адрес организации',
        'Фактический адрес организации', 'Номер телефона', 'Дополнительный номер телефона',
        'Адрес сайта', 'Адрес электронной почты', 'Основная информация об организации',
        'Доп. информация об организации', 'Координаты', 'Почтовый индекс (ZIP-code)',
        'Skype', 'WhatsApp', 'Viber', 'VK', 'Facebook', 'OK', 'Telegram', 'Instagram', 'Twitter']
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
