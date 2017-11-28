<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="showDeleteModal({})" color="error" dark>Очистить лог</v-btn>
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
        ref = "logDataTable"
      :headers="headers"
      :items="logs"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr>
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.date | moment("DD.MM.YYYY HH:mm:ss") }}</td>
      <td>{{ props.item.message }}</td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./logJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./log.css"></style>
