<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="updateItem(factory, true)" color="success" dark>Обновить</v-btn>
      <v-select
              :items="factory.data.var_descritpions.variables"
              item-text="title"
              v-model="currentType"
              label="Тип поля"
            ></v-select>
      <v-btn @click.stop="addField()" color="success" dark>Добавить поле</v-btn>
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
      item-key="name"
    >
    <template slot="items" slot-scope="props">
    <tr @click="props.expanded = !props.expanded">
      <td>{{ props.item.field_type }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.title }}</td>
      <td class="px-1">
        <v-tooltip top>
      <v-btn @click.stop="deleteFieldItem(props.index)" slot="activator" icon class="pink--text"><v-icon>fa-trash</v-icon></v-btn>
      <span>Удалить</span>
    </v-tooltip>
        </td>
    </tr>
    </template>
    <template slot="expand" slot-scope="props">
      <v-card flat>
        <v-form  class="v-card-form">
          <vue-form-generator :schema="generateFormSchema(props.item)" :model="props.item" :options="formOptions">
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
