
<template>
  <v-checkbox
    :label="schema.label"
    :value="schema.value"
    v-model="value"
    :readonly="schema.readonly"
    color="error"/>
</template>

<script src="./fieldCheckboxJs.js"></script>
