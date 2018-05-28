<template>
  <v-card>
    <v-card-title>
      <h3>Общая информация</h3>
    </v-card-title>
    <v-card-text>
      <v-list dense>
        <template v-for="(item, index) in generalFields">
          <v-list-tile
            :key="item.index">
            <v-layout row>
              <v-flex
                xs5
                sm4
                v-text="item.title"/>
              <v-flex
                xs7
                sm8
                v-text="item.output_value"/>
            </v-layout>
          </v-list-tile>
          <v-divider
            v-if="index<generalFields.length-1"
            :key="item.index+'-devider'"/>
        </template>
      </v-list>

    </v-card-text>
  </v-card>
</template>

<script src="./card.js"></script>

<style scoped></style>
