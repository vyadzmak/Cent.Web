<template>
  <v-container
    grid-list-md
    fluid>
    <v-data-iterator
      :items="[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <v-flex
        slot="item"
        slot-scope="props"
        xs12
        sm6
        md4
        lg4
      >
        <v-card
          flat
          tile>
          <v-card-media
            :src="`https://unsplash.it/150/300?image=${Math.floor(Math.random() * 100) + 1}`"
            height="150px"
          />
        </v-card>
      </v-flex>
    </v-data-iterator>
  </v-container>
</template>

<script src="./gallery.js"></script>

<style scoped></style>
