<template>
  <v-tabs
    v-model="currentTab"
    dark
    grow
    centered
    color="success"
    slider-color="yellow">
    <v-btn disabled>
      <v-tab>{{ msg }}</v-tab>
    </v-btn>
    <v-tab
      v-for="item in tabs"
      v-show="!item.hidden"
      :key="item.id"
      :href="'#' + item.id"
    >
      {{ item.name }}
    </v-tab>
    <!-- GENERAL INFO -->
    <v-tab-item id="tab-1">
      <v-card flat>
        <v-card-title>
          <h3>Общая информация</h3>
        </v-card-title>
        <v-card-text>
          <v-layout
            v-for="item in generalFields"
            :key="item.index"
            row>
            <v-flex
              xs4
              sm3
              offset-sm1><v-subheader v-text="item.title"/></v-flex>
            <v-flex
              xs8
              sm5
              v-text="item.output_value"/>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-tab-item>
    <!-- OBJECTS -->
    <v-tab-item id="tab-2">
      <v-card>
        <v-card-title>
          <v-select
            v-model="objsListItem"
            :items="objsList"
            item-text="name"
            label="Тип"
          />
          <v-btn
            color="success"
            dark
            @click.stop="showUpdateModal('objs', objsListItem)">Добавить объект</v-btn>
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
          ref = "objsTable"
          :headers="addHeaders(objsTable.headers)"
          :items="objsTable.items"
          :search="search"
          :rows-per-page-items="tableRowsShown"
          :rows-per-page-text="rowsPerPageText"
          :no-results-text="noResultsText"
          :no-data-text="noDataText"
        >
          <template
            slot="items"
            slot-scope="props">
            <tr @click="goToEntity(props.item.g_id)">
              <td
                v-for="h in objsTable.headers"
                :key="h.value">{{ _.get(props.item, h.value) }}</td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="info--text"
                    @click.stop="showUpdateModal('objs', objsListItem, props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                  <span>Редактировать</span>
                </v-tooltip>
              </td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="error--text"
                    @click.stop="showDeleteModal('objs', objsListItem, props.item.g_id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
                  <span>Удалить</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
    <!-- SUBJECTS -->
    <v-tab-item id="tab-3">
      <v-card>
        <v-card-title>
          <v-select
            v-model="subsListItem"
            :items="subsList"
            item-text="name"
            label="Тип"
          />
          <v-btn
            color="success"
            dark
            @click.stop="showUpdateModal('subs', subsListItem)">Добавить субъекта</v-btn>
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
          ref = "subsTable"
          :headers="addHeaders(subsTable.headers)"
          :items="subsTable.items"
          :search="search"
          :rows-per-page-items="tableRowsShown"
          :rows-per-page-text="rowsPerPageText"
          :no-results-text="noResultsText"
          :no-data-text="noDataText"
        >
          <template
            slot="items"
            slot-scope="props">
            <tr @click="goToEntity(props.item.g_id)">
              <td
                v-for="h in subsTable.headers"
                :key="h.value">{{ _.get(props.item, h.value) }}</td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="info--text"
                    @click.stop="showUpdateModal('subs', subsListItem, props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                  <span>Редактировать</span>
                </v-tooltip>
              </td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="error--text"
                    @click.stop="showDeleteModal('subs', subsListItem, props.item.g_id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
                  <span>Удалить</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
    <!-- DOCUMENTS -->
    <v-tab-item id="tab-4">
      <v-card>
        <v-card-title>
          <v-select
            v-model="docsListItem"
            :items="docsList"
            item-text="name"
            label="Тип"
          />
          <v-btn
            color="success"
            dark
            @click.stop="showUpdateModal('docs', docsListItem)">Добавить документ</v-btn>
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
          ref = "docsTable"
          :headers="addHeaders(docsTable.headers)"
          :items="docsTable.items"
          :search="search"
          :rows-per-page-items="tableRowsShown"
          :rows-per-page-text="rowsPerPageText"
          :no-results-text="noResultsText"
          :no-data-text="noDataText"
        >
          <template
            slot="items"
            slot-scope="props">
            <tr @click="goToEntity(props.item.g_id)">
              <td
                v-for="h in docsTable.headers"
                :key="h.value">{{ _.get(props.item, h.value) }}</td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="info--text"
                    @click.stop="showUpdateModal('docs', docsListItem, props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                  <span>Редактировать</span>
                </v-tooltip>
              </td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="error--text"
                    @click.stop="showDeleteModal('docs', docsListItem, props.item.g_id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
                  <span>Удалить</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
    <!-- RELATIONS -->
    <v-tab-item id="tab-5">
      <v-card>
        <v-card-title>
          <v-select
            v-model="relsListItem"
            :items="relsList"
            item-text="name"
            label="Тип"
          />
          <v-btn
            color="success"
            dark
            @click.stop="showUpdateModal('rels', relsListItem)">Добавить связь</v-btn>
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
          ref = "relsTable"
          :headers="addHeaders(relsTable.headers)"
          :items="relsTable.items"
          :search="search"
          :rows-per-page-items="tableRowsShown"
          :rows-per-page-text="rowsPerPageText"
          :no-results-text="noResultsText"
          :no-data-text="noDataText"
        >
          <template
            slot="items"
            slot-scope="props">
            <tr @click="goToEntity(props.item.g_id)">
              <td
                v-for="h in relsTable.headers"
                :key="h.value">{{ _.get(props.item, h.value) }}</td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="info--text"
                    @click.stop="showUpdateModal('rels', relsListItem, props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                  <span>Редактировать</span>
                </v-tooltip>
              </td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="error--text"
                    @click.stop="showDeleteModal('rels', relsListItem, props.item.g_id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
                  <span>Удалить</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
    <!-- HISTORY -->
    <v-tab-item id="tab-6">
      <v-card>
        <v-card-title>
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
          ref = "entityDataTable"
          :headers="addHeaders(entities.headers)"
          :items="entities.items"
          :search="search"
          :rows-per-page-items="tableRowsShown"
          :rows-per-page-text="rowsPerPageText"
          :no-results-text="noResultsText"
          :no-data-text="noDataText"
        >
          <template
            slot="items"
            slot-scope="props">
            <tr @click="goToEntity(props.item.g_id)">
              <td
                v-for="h in entities.headers"
                :key="h.value">{{ _.get(props.item, h.value) }}</td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="info--text"
                    @click.stop="showUpdateModal(props.item)"><v-icon>mdi-pen</v-icon></v-btn>
                  <span>Редактировать</span>
                </v-tooltip>
              </td>
              <td class="px-1">
                <v-tooltip top>
                  <v-btn
                    slot="activator"
                    icon
                    class="error--text"
                    @click.stop="showDeleteModal(props.item.g_id)"><v-icon>mdi-delete-variant</v-icon></v-btn>
                  <span>Удалить</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card>
    </v-tab-item>
    <!-- REPORTS -->
    <v-tab-item id="tab-7">
      <v-card flat/>
    </v-tab-item>
  </v-tabs>
</template>

<script src="./entityJs.js"></script>

<style scoped></style>
