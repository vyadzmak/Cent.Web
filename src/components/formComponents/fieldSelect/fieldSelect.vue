
<template>
  <v-select
    v-validate="schema.veePipe"
    v-model="value"
    :items="schema.items"
    :disabled="disabled"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    :required="schema.required"
    :error-messages="veeErrors.collect(schema.name)"
    :data-vv-as="schema.label"
    item-text="name"
    item-value="id"
    single-line
  />
</template>

<script src="./fieldSelectJs.js"></script>
