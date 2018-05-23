<template>
  <div>
    <div class="title pa-1">Компания {{ userData.last_name }}</div>
    <v-tabs
      centered
      grow
      dark
      color="primary">
      <v-tabs-slider color="warning"/>
      <v-tab
        v-for="item in items"
        :key="item.id"
        :to="item.route">
        {{ item.name }}
      </v-tab>
    </v-tabs>
    <router-view/>
  </div>
</template>

<script src="./company.js"></script>

<style scoped>
</style>
