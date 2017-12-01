<template>
    <div>
        <v-card>
      <v-card-title>
        <v-select
              :items="catalogSchemas"
              item-text="title"
              v-model="currentSchema"
              label="Тип"
            ></v-select>
      <v-btn @click.stop="showUpdateModal()" color="success" dark>Добавить объект справочника</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
        <v-data-table
        ref = "catalogsDataTable"
      :headers="catalogs.headers"
      :items="catalogs.items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr>
      <td v-for="h in catalogs.headers" :key="h.value">{{ _.get(props.item, h.value) }}</td>
      <td class="px-1">
         <v-tooltip top>
      <v-btn @click.stop="showUpdateModal(props.item)"  slot="activator" icon class="indigo--text"><v-icon>mdi-pen</v-icon></v-btn>
      <span>Редактировать</span>
    </v-tooltip>        
        </td>
      <td class="px-1">
        <v-tooltip top>
      <v-btn @click.stop="showDeleteModal(props.item.g_id)"  slot="activator" icon class="pink--text"><v-icon>mdi-delete-variant</v-icon></v-btn>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./catalogs.css"></style>
