<template>
  <div>
    <v-card>
      <v-card-title>
        <v-btn
          color="success"
          dark
          @click.stop="showUpdateModal({})">Добавить схему объекта</v-btn>
        <v-spacer/>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Поиск"
          single-line
          hide-details
        />
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
        <template
          slot="items"
          slot-scope="props">
          <tr @click="goToFactory(props.item)">
            <td>{{ props.item.id }}</td>
            <td>{{ props.item.name }}</td>
            <td>{{ props.item.title }}</td>
            <td>{{ props.item.description }}</td>
            <td>{{ props.item.creation_date | moment('DD.MM.YYYY') }}</td>
            <td>{{ getSchemaTypeName(props.item.schema_type_id) }}</td>
            <td>{{ props.item.user_id }}</td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  class="indigo--text"
                  @click.stop="showUpdateModal(props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                <span>Редактировать</span>
              </v-tooltip>
            </td>
            <td class="px-1">
              <v-tooltip top>
                <v-btn
                  slot="activator"
                  icon
                  class="pink--text"
                  @click.stop="showDeleteModal(props.item.id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
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

<style scoped src="./factories.css"></style>
