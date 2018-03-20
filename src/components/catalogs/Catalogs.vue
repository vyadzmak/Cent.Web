<template>
  <div>
    <v-card>
      <v-card-title>
        <v-select
          v-model="currentSchema"
          :items="catalogSchemas"
          item-text="title"
          label="Тип"
        />
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal()">Добавить объект справочника</v-btn>
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
        />
      </v-card-title>
      <v-data-table
        ref = "catalogsDataTable"
        :headers="headers"
        :items="catalogs.items"
        :search="search"
        :rows-per-page-items="tableRowsShown"
        :rows-per-page-text="rowsPerPageText"
        :no-results-text="noResultsText"
        :no-data-text="noDataText"
      >
        <template
          slot="items"
          slot-scope="props">
          <tr>
            <td
              v-for="h in catalogs.headers"
              :key="h.value">{{ _.get(props.item, h.value) }}</td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  class="info--text"
                  @click.stop="showUpdateModal(props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                <span>Редактировать</span>
              </v-tooltip>
            </td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  class="error--text"
                  @click.stop="showDeleteModal(props.item.g_id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
                <span>Удалить</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script src="./catalogsJs.js"></script>

<style scoped></style>
