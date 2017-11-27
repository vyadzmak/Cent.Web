<template>
    <div>
        <v-card>
      <v-card-title>
      <v-btn @click.stop="showUpdateModal({})" color="success" dark>Добавить проект</v-btn>
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
        ref = "projectsDataTable"
      :headers="headers"
      :items="projects"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" scope="props">
    <tr  @click="goToProject(props.item)" :class="{'red--text':props.item.state_id===4}">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.creation_date | moment("DD.MM.YYYY HH:mm") }}</td>
      <td>{{props.item.user_data.client.name}}</td>
      <td>{{props.item.user_data.last_name}} {{props.item.user_data.first_name}}</td>
      <td>{{ props.item.project_state.name }}</td>
      <td class="px-1">
  <v-tooltip top>
      <v-btn @click.stop="infoPressed(props.item)"  slot="activator"
      v-show="props.item.state_id===3||props.item.state_id===4||props.item.state_id===5"
      :class="{'green--text':props.item.state_id===3||props.item.state_id===5, 'red--text':props.item.state_id===4}"
      icon><v-icon>fa-info</v-icon></v-btn>
      <span>Информация</span>
    </v-tooltip>
      </td>
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

<script src="./projectsJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./projects.css"></style>
