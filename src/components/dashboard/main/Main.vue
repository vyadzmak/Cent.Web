<template>
  <v-container
    fluid
    grid-list-md
    fill-height
  >
    <v-layout
      row
      wrap>
      <v-flex md8>
        <v-card
          style="overflow-y:scroll;"
          height="54vh">
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
                md6
                sm12
                xs12
                @click="goToItem(item)">
                <v-card height="26vh">
                  <v-card-title
                    class="px-2 py-4"
                  ><v-icon
                    color="secondary"
                    large>{{ item.icon }}</v-icon>
                    <v-spacer/>
                    <h1 class="secondary--text"> {{ item.name }}</h1>
                    <v-spacer/>
                  </v-card-title>
                  <div class="text-xs-center">
                    <v-badge
                      v-for="bObj in item.sIcons"
                      :key="bObj.icon"
                      class="px-2"
                      overlap
                      bottom
                      color="warning">
                      <span slot="badge">{{ bObj.badge }}</span>
                      <v-icon
                        color="primary">{{ bObj.icon }}</v-icon>
                    </v-badge>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card
          height="30vh"
          style="overflow-y:hidden;">
          <v-card-title class="py-1 primary">Последние объекты</v-card-title>
          <v-list
            style="overflow-y:scroll; height:calc(30vh - 30px);"
            dense>
            <v-divider/>
            <template
              v-for="item in news">
              <v-list-tile
                :key="item.title+'lastObjects'">
                <v-list-tile-content>
                  <v-list-tile-sub-title v-html="item.subtitle"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <div class="caption">2018-08-08 12:55</div>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                :key="item.title+'lastObjects'"/>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card
          height="42vh"
          style="overflow-y:hidden;">
          <v-card-title class="py-1 primary">Лента</v-card-title>
          <v-list
            style="overflow-y:scroll; height:calc(42vh - 30px);"
            three-line
          >
            <v-divider/>
            <template
              v-for="item in news">
              <v-list-tile
                :key="item.title+'news'"
                avatar>
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"/>
                  <v-list-tile-sub-title v-html="item.subtitle"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <div class="caption">2018-08-08 12:55</div>
                  <div/>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                :key="item.title+'news'"/>
            </template>
          </v-list>
        </v-card>
        <v-card
          height="42vh"
          style="overflow-y:hidden;">
          <v-card-title class="py-1 primary">Контакты</v-card-title>
          <v-list
            style="overflow-y:scroll; height:calc(42vh - 30px);"
            two-line
          >
            <v-divider/>
            <template
              v-for="item in contacts">
              <v-list-tile
                :key="item.title+'contacts'"
                avatar>
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"/>
                  <v-list-tile-sub-title v-html="item.title"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    icon
                    ripple>
                    <v-icon>fas fa-info</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    ripple>
                    <v-icon>fas fa-envelope</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                :key="item.title+'contacts'"/>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./main.js"></script>

<style scoped>
a:active, a:hover {
    background-color: #576574;
}
</style>
