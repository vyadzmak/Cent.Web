
<template>
  <v-switch
    :label="`${schema.label}: ${value?schema.textOn[1]:schema.textOff}`"
    v-model="value"
    color="error"/>
</template>

<script src="./fieldSwitchJs.js"></script>
