<template>
  <v-container
    fluid
    grid-list-md
    text-xs-center>
    <v-layout
      row>
      <v-flex>
        <router-view/>
        <!-- OBJECTS -->
        <v-card
          v-show="activeTab==='tab-2'"
          flat>
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
                      @click.stop="showUpdateModal('objs', objsListItem, props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </td>
                <td class="px-1">
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="showDeleteModal('objs', objsListItem, props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                    <span>Удалить</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- SUBJECTS -->
        <v-card
          v-show="activeTab==='tab-3'"
          flat>
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
                      @click.stop="showUpdateModal('subs', subsListItem, props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </td>
                <td class="px-1">
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="showDeleteModal('subs', subsListItem, props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                    <span>Удалить</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- DOCUMENTS -->
        <v-card
          v-show="activeTab==='tab-4'"
          flat>
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
                      @click.stop="showUpdateModal('docs', docsListItem, props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </td>
                <td class="px-1">
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="showDeleteModal('docs', docsListItem, props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                    <span>Удалить</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- RELATIONS -->
        <v-card
          v-show="activeTab==='tab-5'"
          flat>
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
                      @click.stop="showUpdateModal('rels', relsListItem, props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </td>
                <td class="px-1">
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="showDeleteModal('rels', relsListItem, props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                    <span>Удалить</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- HISTORY -->
        <v-card
          v-show="activeTab==='tab-6'"
          flat>
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
                      @click.stop="showUpdateModal(props.item)"><v-icon color="info">mdi-pen</v-icon></v-btn>
                    <span>Редактировать</span>
                  </v-tooltip>
                </td>
                <td class="px-1">
                  <v-tooltip top>
                    <v-btn
                      slot="activator"
                      icon
                      @click.stop="showDeleteModal(props.item.g_id)"><v-icon color="error">mdi-delete-variant</v-icon></v-btn>
                    <span>Удалить</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
        <!-- REPORTS -->
        <v-card
          v-show="activeTab==='tab-7'"
          flat/>
      </v-flex>
      <v-flex
        style="max-width:290px;">
        <v-layout
          row
          wrap>
          <v-flex
            v-for="(item, index) in tabs"
            v-if="!item.hidden"
            :key="item.id"
            tag="a"
            xs4
            sm4
            @click.stop="goTo(item)">
            <v-card
              :class="{'info':activeTab===item.id}"
              :dark="activeTab===item.id"
              :key="index">
              <v-card-text
                class="pt-1 pb-0">
                <v-icon large>{{ item.icon }}</v-icon>
              </v-card-text>
              <v-card-text
                class="pa-1"
                v-html="item.name"/>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./entityJs.js"></script>

<style scoped lang="scss">
a:hover{
  .v-card{
  background-color: rgba(16, 175, 134, 0.42);
  }
}
</style>
