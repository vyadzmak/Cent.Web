
<template>
    <v-menu
        lazy
        :close-on-content-click="false"
        v-model="menu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          :label="schema.label"
          v-model="value"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="value"
        locale="ru-RU"
        :first-day-of-week="1"
        no-title scrollable actions>
        </v-date-picker>
      </v-menu>
</template>

<script src="./fieldDatepickerJs.js"></script>