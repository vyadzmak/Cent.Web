<template>
<div>
    <v-card>
      <v-card-title>
      <v-btn @click.stop="showUpdateModal({})" color="success" dark>Добавить компанию</v-btn>
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
        <v-data-table ref="companiesDataTable"
      :headers="headers"
      :items="companies"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" scope="props">
    <tr  @click="goToUsers(props.item.id)">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.registration_number }}</td>
      <td>{{ props.item.registration_date | moment("DD.MM.YYYY HH:mm") }}</td>
      <td>{{ props.item.client_type.name }}</td>
      <td class="px-1">
         <v-tooltip top>
      <v-btn @click.stop="updatePressed(props.item)"  slot="activator" icon class="indigo--text"><v-icon>fa-pencil-square-o</v-icon></v-btn>
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

<script src="./companiesJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./companies.css"></style>
