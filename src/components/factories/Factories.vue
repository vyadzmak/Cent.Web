<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="showUpdateModal({})" color="success" dark>Добавить объект</v-btn>
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
        ref = "factoriesDataTable"
      :headers="headers"
      :items="factories"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr @click="goToFactory(props.item)">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.description }}</td>
      <td>{{ props.item.creation_date | moment('DD.MM.YYYY') }}</td>
      <td>{{ props.item.is_catalog?'каталог':'объект' }}</td>      
      <td>{{ props.item.user_id }}</td>
      <td class="px-1">
         <v-tooltip top>
      <v-btn @click.stop="showUpdateModal(props.item)"  slot="activator" icon class="indigo--text"><v-icon>fa-pencil-square-o</v-icon></v-btn>
      <span>Редактировать</span>
    </v-tooltip>        
        </td>
      <td class="px-1">
        <v-tooltip top>
      <v-btn @click.stop="showDeleteModal(props.item.id)"  slot="activator" icon class="pink--text"><v-icon>fa-trash</v-icon></v-btn>
      <span>Удалить</span>
    </v-tooltip>
        </td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./factoriesJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./factories.css"></style>
