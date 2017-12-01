<template>
    <v-layout>
    <v-flex xs12>
      <v-card>
        <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
          <v-layout row wrap>
            <v-flex tag="a"
              xs6
              v-for="item in items"
              :key="item.id"
             @click="goToSetting(item.id)">
              <v-card flat tile>
                <v-card-media
                  height="260px"
                  class="elevation-23"
                >
                 <v-layout row wrap align-center>
          <v-flex class="text-xs-center">
            <h1 class="primary--text"><v-icon color='primary' large>{{item.icon}}</v-icon> {{item.name}}</h1>
          </v-flex>
        </v-layout>
                </v-card-media>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script src="./dataSettingsJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./dataSettings.css"></style>
