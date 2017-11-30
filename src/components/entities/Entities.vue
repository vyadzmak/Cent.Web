<template>
    <div>
        <v-card>
      <v-card-title>
        <v-select
              :items="entitySchemas"
              item-text="title"
              v-model="currentSchema"
              label="Тип"
            ></v-select>
      <v-btn @click.stop="showUpdateModal()" color="success" dark>Добавить объект</v-btn>
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
        ref = "entitiesDataTable"
      :headers="headers"
      :items="entities"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr  @click="goToEntity(props.item)" :class="{'red--text':props.item.state_id===4}">
      <td>{{ props.item.id }}</td>
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
      <v-btn @click.stop="showUpdateModal(props.item)"  slot="activator" icon class="indigo--text"><v-icon>mdi-pen</v-icon></v-btn>
      <span>Редактировать</span>
    </v-tooltip>        
        </td>
      <td class="px-1">
        <v-tooltip top>
      <v-btn @click.stop="showDeleteModal(props.item.id)"  slot="activator" icon class="pink--text"><v-icon>mdi-delete-variant</v-icon></v-btn>
      <span>Удалить</span>
    </v-tooltip>
        </td>
    </tr>
    </template>
  </v-data-table>
  </v-card>
    </div>
</template>

<script src="./entitiesJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./entities.css"></style>
