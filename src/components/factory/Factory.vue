<template>
    <div>
        <v-card>
      <v-card-title>
        <h2 v-html="msg" class="mr-5"></h2>
        </v-card-title>
          <v-card-title class="pa-1">
      <v-select
              :items="listOfTypes"
              item-text="title"
              item-disabled="not_used"
              v-model="currentType"
              label="Тип поля"
               class="mx-3"
            ></v-select>
      <v-btn @click.stop="addField()" color="success" dark class="mx-3">Добавить поле</v-btn>
      <v-btn @click.stop="updateItem(factory, true)" color="amber darken-4" dark class="mx-3">Сохранить</v-btn>
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
        ref = "factoryDataTable"
      :headers="headers"
      :items="factory.data.fields"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
      item-key="index"
    >
    <template slot="items" slot-scope="props">
    <tr @click="props.expanded = !props.expanded">
      <td>{{ props.item.type_title }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.title }}</td>
      <td class="px-1">
        <v-tooltip top>
      <v-btn @click.stop="showDeleteModal(props.index)" slot="activator" icon class="pink--text"><v-icon>mdi-delete-variant</v-icon></v-btn>
      <span>Удалить</span>
    </v-tooltip>
        </td>
    </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat class="mx-5">
        <v-form  class="v-card-form mx-5">
          <vue-form-generator :schema="generateFormSchema(props.item, updateProperty)" :model="props.item" :options="formOptions">
          </vue-form-generator>
        </v-form>
      </v-card>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./factoryJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./factory.css"></style>
