<template>
<v-tabs dark grow>
    <v-toolbar color="success" dark>
      <v-toolbar-title>{{msg}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs-bar class="success" slot="extension">
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
<!-- GENERAL INFO -->
      <v-tabs-content id="tab-1">
        <v-card flat>
          {{entity|json}}
        </v-card>
      </v-tabs-content>
<!-- OBJECTS -->
      <v-tabs-content id="tab-2">
        <v-card>
      <v-card-title>
        <v-select
              :items="objsList"
              item-text="name"
              v-model="objsListItem"
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
        ref = "objsTable"
      :headers="objsTable.headers"
      :items="objsTable.items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr  @click="goToEntity(props.item.id)">
      <td v-for="h in objsTable.headers" :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
<!-- SUBJECTS -->
      <v-tabs-content id="tab-3">
        <v-card>
      <v-card-title>
        <v-select
              :items="subsList"
              item-text="name"
              v-model="subsListItem"
              label="Тип"
            ></v-select>
      <v-btn @click.stop="showUpdateModal()" color="success" dark>Добавить субъекта</v-btn>
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
        ref = "subsTable"
      :headers="subsTable.headers"
      :items="subsTable.items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr  @click="goToEntity(props.item.id)">
      <td v-for="h in subsTable.headers" :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
<!-- DOCUMENTS -->
      <v-tabs-content id="tab-4">
        <v-card>
      <v-card-title>
        <v-select
              :items="docsList"
              item-text="name"
              v-model="docsListItem"
              label="Тип"
            ></v-select>
      <v-btn @click.stop="showUpdateModal()" color="success" dark>Добавить документ</v-btn>
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
        ref = "docsTable"
      :headers="docsTable.headers"
      :items="docsTable.items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr  @click="goToEntity(props.item.id)">
      <td v-for="h in docsTable.headers" :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
<!-- RELATIONS -->
      <v-tabs-content id="tab-5">
       <v-card>
      <v-card-title>
        <v-select
              :items="relsList"
              item-text="name"
              v-model="relsListItem"
              label="Тип"
            ></v-select>
      <v-btn @click.stop="showUpdateModal()" color="success" dark>Добавить связь</v-btn>
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
        ref = "relsTable"
      :headers="relsTable.headers"
      :items="relsTable.items"
      :search="search"
      :rows-per-page-items="tableRowsShown"
      :rows-per-page-text="rowsPerPageText"
      :no-results-text="noResultsText"
      :no-data-text="noDataText"
    >
    <template slot="items" slot-scope="props">
    <tr  @click="goToEntity(props.item.id)">
      <td v-for="h in relsTable.headers" :key="h.value">{{ _.get(props.item, h.value) }}</td>
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
<!-- HISTORY -->
      <v-tabs-content id="tab-6">
       <v-card>
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
<!-- REPORTS -->
      <v-tabs-content id="tab-7">
        <v-card flat>
          
        </v-card>
      </v-tabs-content>
    </v-tabs-items>
  </v-tabs>       
</template>

<script src="./entityJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./entity.css"></style>
