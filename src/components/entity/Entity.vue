<template>
<v-tabs dark grow>
    <v-toolbar color="cyan" dark>
      <v-toolbar-title>{{msg}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs-bar class="cyan" slot="extension">
        <v-tabs-slider color="yellow"></v-tabs-slider>
        <v-tabs-item
          v-for="item in tabs"
          :key="item.id"
          :href="'#' + item.id"
        >
          {{ item.name }}
        </v-tabs-item>
      </v-tabs-bar>
    </v-toolbar>
    <v-tabs-items>
      <v-tabs-content id="tab-1">
        <v-card flat>
          
        </v-card>
      </v-tabs-content>
      <!-- dataTable start -->
      <v-tabs-content id="tab-2">
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
        ref = "entityDataTable"
      :headers="entities.headers"
      :items="entities.items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr  @click="goToEntity(props.item.id)">
      <td v-for="h in entities.headers" :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
      </v-tabs-content>

      <v-tabs-content id="tab-3">
        <v-card flat>
          
        </v-card>
      </v-tabs-content>
      <v-tabs-content id="tab-4">
        <v-card flat>
          
        </v-card>
      </v-tabs-content>
      <v-tabs-content id="tab-5">
        <v-card flat>
          
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>       
</template>

<script src="./entityJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./entity.css"></style>
