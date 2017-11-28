<template>
    <div>

          <v-card flat>
            <v-card-title>
      
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Поиск"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>
        <v-data-table ref="entityDataTable"
      :headers="headers"
      :items="documents"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" scope="props">
    <tr>
      <td>{{props.item.id}}</td>
      <td>{{props.item.file_name}}</td>
      <td>{{_.round(props.item.file_size/1000000,2)}}</td>
      <td>{{props.item.created_date | moment("DD.MM.YYYY HH:mm")}}</td>
      <td>{{props.item.user_data.last_name + ' ' + props.item.user_data.first_name}}</td>
      <td>{{props.item.document_state.name}}</td>
      <td class="px-1">
         <v-tooltip top>
      <v-btn @click.stop="updatePressed(props.item)"  slot="activator" icon class="indigo--text"><v-icon>fa-pencil-square-o</v-icon></v-btn>
      <span>Редактировать</span>
    </v-tooltip>        
        </td>
      <!-- <td class="px-1">
        <v-tooltip top>
      <v-btn @click.stop="showDeleteModal(props.item.id)"  slot="activator" icon class="pink--text"><v-icon>fa-trash</v-icon></v-btn>
      <span>Удалить</span>
    </v-tooltip>
        </td> -->
    </tr>
    </template>
  </v-data-table>
          </v-card>
       
    </div>
</template>

<script src="./entityJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./entity.css"></style>
