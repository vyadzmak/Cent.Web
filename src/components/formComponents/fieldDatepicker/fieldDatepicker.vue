
<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    lazy
    transition="scale-transition"
    offset-y
    full-width
    max-width="290px"
    min-width="290px"
  >
    <!-- :return-value.sync="value" -->
    <v-text-field
      slot="activator"
      :label="schema.label"

      v-model="value"
      prepend-icon="event"
      readonly
    />
    <v-date-picker
      :first-day-of-week="1"
      v-model="value"
      locale="ru-RU"
      no-title
      scrollable
      actions/>
  </v-menu>
</template>

<script src="./fieldDatepickerJs.js"></script>
