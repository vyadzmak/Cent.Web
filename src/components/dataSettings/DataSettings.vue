<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-container
          v-bind="{ [`grid-list-sm`]: true }"
          fluid>
          <v-layout
            row
            wrap>
            <v-flex
              v-for="item in items"
              :key="item.id"
              tag="a"
              xs6
              @click="goToSetting(item.id)">
              <v-card
                flat
                tile>
                <v-card-media
                  height="260px"
                  class="elevation-23"
                >
                  <v-layout
                    row
                    wrap
                    align-center>
                    <v-flex class="text-xs-center">
                      <h1 class="primary--text"><v-icon
                        color="primary"
                        large>{{ item.icon }}</v-icon> {{ item.name }}</h1>
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

<style scoped>
a:active, a:hover {
    background-color: #2E7D32;
}
</style>
