<template>
    <v-layout>
    <v-flex xs12>
      <v-card>
        <v-container fluid v-bind="{ [`grid-list-sm`]: true }">
          <v-layout row wrap>
            <v-flex
              xs6
              v-for="n in 4"
              :key="n"
            >
              <v-card flat tile>
                <v-card-media
                  height="260px"
                  class="elevation-23"
                >
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
