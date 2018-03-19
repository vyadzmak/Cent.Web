<template>
  <div>
    <v-navigation-drawer
      :mini-variant="appliedMiniVariant"
      :clipped="clipped"
      v-model="drawer"
      app>
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          v-if="item.visible"
          :key="i"
          :style="{'background-color':$route.path === item.path?'#edfbfa':''}"
          value="true"
          @click="$router.push({path: item.path})"
        >
          <v-list-tile-action>
            <v-tooltip right>
              <v-icon
                slot="activator"
                light
                v-html="item.icon"/>
              <span v-text="item.title"/>
            </v-tooltip>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"/>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="clipped"
      app
      fixed
      dark
      class="primary">
      <v-toolbar-side-icon
        dark
        @click.stop="drawer = !drawer"/>
      <img
        width="50"
        src="/static/favicon.png">
      <v-toolbar-title
        @click="logOut()"
        v-html="title"/>
      <v-spacer/>
      <v-menu
        bottom
        left>
        <v-btn
          slot="activator"
          icon
          dark>
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile
            avatar
            @click="showUpdateModal()">
            <v-list-tile-avatar><v-icon>mdi-settings</v-icon></v-list-tile-avatar>
            <v-list-tile-content>Настройки профиля {{ userData.first_name + ' ' + userData.last_name }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile @click="logOut()">
            <v-list-tile-avatar><v-icon>mdi-logout</v-icon></v-list-tile-avatar>
            <v-list-tile-title>Выход</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-speed-dial
        v-model="fabSettings.fab"
        :top="fabSettings.top"
        :bottom="fabSettings.bottom"
        :right="fabSettings.right"
        :left="fabSettings.left"
        :direction="fabSettings.direction"
        :open-on-hover="fabSettings.hover"
        :transition="fabSettings.transition"
      >
        <v-btn
          slot="activator"
          v-model="fabSettings.fab"
          class="amber lighten-2"
          dark
          fab
          hover
        >
          <v-icon>settings</v-icon>
          <v-icon>close</v-icon>
        </v-btn>
        <v-btn
          fab
          dark
          small
          class="green"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"/>
        </v-btn>
        <v-btn
          fab
          dark
          small
          class="indigo"
          @click.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
      </v-speed-dial>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </div>
</template>

<script src="./dashboardJs.js"></script>

<style scoped lang="scss" src="./dashboard.scss"></style>
