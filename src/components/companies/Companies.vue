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
    <template slot="items" slot-scope="props">
    <tr  @click="goToUsers(props.item.id)">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.name }}</td>
      <td>{{ props.item.registration_number }}</td>
      <td>{{ props.item.registration_date | moment("DD.MM.YYYY HH:mm") }}</td>
      <td>{{ props.item.client_type.name }}</td>
      <td class="px-1">
         <v-tooltip top>
      <v-btn @click.stop="updatePressed(props.item)"  slot="activator" icon class="indigo--text"><v-icon>mdi-pen</v-icon></v-btn>
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
 <!--  <yandex-map 
  :coords="[53.915746, 27.428979]"
  zoom="10"
  style="width: 100%; height: 600px;"
  :cluster-options="{
    1: {clusterDisableClickZoom: true}
  }"
  :behaviors="['drag', 'dblClickZoom', 'rightMouseButtonMagnifier','ruler']"
  :controls="['fullscreenControl','geolocationControl','routeEditor','rulerControl','searchControl','trafficControl','typeSelector','zoomControl']"
  :placemarks="placemarks" 
  map-type="map"
  >
 
    <ymap-marker 
      marker-type="placemark"
      :coords="[54.7, 39.7]"
      hint-content="Hint content 1"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      :icon="{color: 'green', glyph: 'cinema'}"
      cluster-name="1"
    ></ymap-marker>
 
    <ymap-marker 
      marker-type="placemark"
      :coords="[54.6, 39.8]"
      hint-content="Hint content 1"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
      :icon="{color: 'green', glyph: 'cinema'}"
      cluster-name="1"
    ></ymap-marker>
 
    <ymap-marker 
      marker-type="circle"
      :coords="[27.525773, 53.89079]"
      circle-radius="1600"
      hint-content="Hint content 1"
      :marker-fill="{color: '#000000', opacity: 0.4}"
      :marker-stroke="{color: '#ff0000', width: 5}"
      :balloon="{header: 'header', body: 'body', footer: 'footer'}"
    ></ymap-marker>
 
</yandex-map> -->
</div>
</template>

<script src="./companiesJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./companies.css"></style>
