import questionDialog from '../questionDialog/questionDialog'
import updateModal from './updateModal/updateModal.vue'
import { ModalService } from 'vue-modal-dialog'

export default {
  name: 'entity',
  data () {
    return {
      search: '',
      errors: [],
      activeTab: null,
      tabs: [{id: 'tab-1', name: 'Общая информация'},
       {id: 'tab-2', name: 'Объекты', hidden: true},
       {id: 'tab-3', name: 'Субъекты', hidden: true},
       {id: 'tab-4', name: 'Документы', hidden: true},
       {id: 'tab-5', name: 'Связи', hidden: true},
       {id: 'tab-6', name: 'История'},
       {id: 'tab-7', name: 'Отчеты'}],
      currentTab: 'tab-1',
      headers: [
        { text: 'ID', align: 'left', value: 'id' },
        { text: 'Имя файла', align: 'left', value: 'file_name' },
        { text: 'Размер, MB', align: 'left', value: 'file_size' },
        { text: 'Время загрузки', align: 'left', value: 'created_date' },
        { text: 'Пользователь', align: 'left', value: 'user_data.last_name' },
        { text: 'Состояние', align: 'left', value: 'document_state.name' }
      ],
      tableRowsShown: [10, 20, 50, 100, {text: 'Все', value: -1}],
      rowsPerPageText: 'Строк на странице',
      noDataText: 'Нет данных',
      noResultsText: 'Поиск не дал результатов',
      objsListItem: null,
      objsList: [],
      objsTable: {headers: [], items: []},
      docsListItem: null,
      docsList: [],
      docsTable: {headers: [], items: []},
      relsListItem: null,
      relsList: [],
      relsTable: {headers: [], items: []},
      subsListItem: null,
      subsList: [],
      subsTable: {headers: [], items: []},
      formSchema: {},
      formOptions: {
        validateAfterLoad: true,
        validateAfterChanged: true,
        fieldIdPrefix: 'prefix-'
      }
    }
  },
  computed: {
    userData () {
      return this.$store.state.userData
    },
    entity: function () {
      return this.$store.getters.currentEntity
    },
    documents () {
      return this.$store.getters.currentDocuments
    },
    entityForm () {
      return this.$store.getters.currentEntityForm
    },
    entities: function () {
      return this.$store.getters.entities && this.$store.getters.entities.headers ? this.$store.getters.entities : {headers: [], items: []}
    },
    entitySchemas: function () {
      return this.$store.getters.entitySchemas
    },
    generalFields () {
      return this.entity && this.entity.general_section ? this.entity.general_section.data.fields : []
    },
    msg () { return 'Детали ' + (this.entity && this.entity.general_section ? this.entity.general_section.data.fields[0].output_value : '') }
  },
  watch: {
    objsListItem: function (newValue) {
      if (newValue && newValue.id) {
        this.tabs[1].hidden = false
        this.getEntities(newValue.id)
        .then(resp => { this.objsTable = resp })
        .catch(resp => { this.objsTable = resp })
      } else {
        this.tabs[1].hidden = true
        this.objsTable = {headers: [], items: []}
      }
    },
    docsListItem: function (newValue) {
      if (newValue && newValue.id) {
        this.tabs[3].hidden = false
        this.getEntities(newValue.id)
        .then(resp => { this.docsTable = resp })
        .catch(resp => { this.docsTable = resp })
      } else {
        this.tabs[3].hidden = true
        this.docsTable = {headers: [], items: []}
      }
    },
    relsListItem: function (newValue) {
      if (newValue && newValue.id) {
        this.tabs[4].hidden = false
        this.getEntities(newValue.id)
        .then(resp => { this.relsTable = resp })
        .catch(resp => { this.relsTable = resp })
      } else {
        this.tabs[4].hidden = true
        this.relsTable = {headers: [], items: []}
      }
    },
    subsListItem: function (newValue) {
      if (newValue && newValue.id) {
        this.tabs[2].hidden = false
        this.getEntities(newValue.id)
        .then(resp => { this.subsTable = resp })
        .catch(resp => { this.subsTable = resp })
      } else {
        this.tabs[2].hidden = true
        this.subsTable = {headers: [], items: []}
      }
    },
    entity: function (newValue) {
      if (newValue && newValue.objects_section && newValue.objects_section.items) {
        this.objsList = newValue.objects_section.items
        // if (this.objsList.length > 0) {
        this.objsListItem = this.objsList.length > 0 ? this.objsList[0] : null
        // }
      }
      if (newValue && newValue.documents_section && newValue.documents_section.items) {
        this.docsList = newValue.documents_section.items
        if (this.docsList.length > 0) {
          this.docsListItem = this.docsList[0]
        }
      }
      if (newValue && newValue.relations_section && newValue.relations_section.items) {
        this.relsList = newValue.relations_section.items
        if (this.relsList.length > 0) {
          this.relsListItem = this.relsList[0]
        }
      }
      if (newValue && newValue.subjects_section && newValue.subjects_section.items) {
        this.subsList = newValue.subjects_section.items
        if (this.subsList.length > 0) {
          this.subsListItem = this.subsList[0]
        }
      }
    }
  },
  methods: {
    showDeleteModal: function (varName, schema, itemId) {
      let modalConfig = {
        size: 'md',
        data: {
          message: 'Вы действительно хотите удалить объект?',
          title: 'Удаление объекта',
          isClosable: true
        }
      }
      ModalService.open(questionDialog, modalConfig).then(
        modalSubmit => {
          if (schema.id) {
            this.deleteItem(varName, schema.id, itemId)
          }
        },
        modalCancel => {}
    ).catch(
      err => {
        console.log(err)
      }
    )
    },
    showUpdateModal: function (varName, schema, item) {
      let vum = this
      let isUpdate = false
      let updateItem = {}
      if (item) {
        isUpdate = true
      } else {
        updateItem = {schema_id: schema.id,
          client_id: this.userData.client_id,
          user_id: this.userData.id,
          parent_id: this.$route.params.id}
      }

      if (schema.id) {
        vum.$store.dispatch('getEntitySchema', {http: vum.$http, id: schema.id})
          .then(response => {
            if (isUpdate) {
              vum.$store.dispatch('getUpdateEntity', {http: vum.$http, id: item.g_id})
              .then(response => {
                updateItem = _.cloneDeep(vum.$store.getters.updateEntity)
                updateItem.fields = updateItem.data.fields
                updateItem.data = undefined
                updateItem.parent_id = this.$route.params.id
                let modalConfig = {
                  size: 'lg',
                  data: {
                    title: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта',
                    isClosable: true,
                    item: updateItem
                  }
                }
                ModalService.open(updateModal, modalConfig)
                .then(modalSubmit => { vum.updateItem(schema.id, varName, modalSubmit, isUpdate) }, modalCancel => { console.log(modalCancel) })
                .catch(err => { console.log(err) })
              })
            } else {
              let modalConfig = {
                size: 'lg',
                data: {
                  title: (isUpdate ? 'Обновление' : 'Добавление') + ' объекта',
                  isClosable: true,
                  item: updateItem
                }
              }
              ModalService.open(updateModal, modalConfig)
              .then(modalSubmit => { vum.updateItem(schema.id, varName, modalSubmit, isUpdate) }, modalCancel => { console.log(modalCancel) })
              .catch(err => { console.log(err) })
            }
          })
      }
    },
    deleteItem: function (varName, schemaId, itemId) {
      this.$store.commit('showSpinner', true)
      this.$http.delete('object/' + itemId)
          .then(response => {
            this.getEntities(schemaId)
            .then(resp => { this[varName + 'Table'] = resp })
            .catch(resp => { this[varName + 'Table'] = resp })
            this.$store.commit('showSnackbar', {text: 'Удаление объекта прошло успешно', snackbar: true, context: 'success'})
            this.$store.commit('showSpinner', false)
          })
          .catch(e => {
            this.errors.push(e)
            this.$store.commit('showSpinner', false)
            this.$store.commit('showSnackbar', {text: 'Удаление объекта не удалось. Обратитесь к администратору', snackbar: true, context: 'error'})
          })
    },
    goToFinAnalysis () {
      this.$router.replace({name: 'FinAnalysis', params: {id: this.entity.id}})
    },
    getEntities (id) {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('getEntityTable', {http: this.$http, item: {schema_id: id, parent_id: this.$route.params.id}})
      .then(response => { resolve(response) })
      .catch(response => { reject({headers: [], items: []}) })
      })
    },
    updateItem: function (schemaId, varName, item, isUpdate) {
      this.$store.dispatch('updateEntity', {http: this.$http, isUpdate: isUpdate, item: item})
      .then(response => {
        this.getEntities(schemaId)
        .then(resp => { this[varName + 'Table'] = resp })
        .catch(resp => { this[varName + 'Table'] = resp })
      })
    },
    goToEntity (itemId) {
      this.currentTab = 'tab-1'
      this.$router.push({name: 'Entity', params: {id: itemId}})
    }
  },
  created () {
    this.$store.dispatch('getCurrentEntity', {http: this.$http, id: this.$route.params.id})
  },
  mounted () {
    this.$refs.objsTable.defaultPagination.descending = true
    this.$refs.docsTable.defaultPagination.descending = true
    this.$refs.relsTable.defaultPagination.descending = true
    this.$refs.subsTable.defaultPagination.descending = true
    this.$refs.entityDataTable.defaultPagination.descending = true
  },
  beforeRouteUpdate (to, from, next) {
    if (to.name === from.name) {
      this.$store.dispatch('getCurrentEntity', {http: this.$http, id: to.params.id})
    }
    next()
  }
}
