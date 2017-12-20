
<template>
    <v-select
      v-model="value"
      item-text="name"
      item-value="id"
      :items="schema.items"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :required="schema.required"
      v-validate="schema.veePipe"
      :error-messages="veeErrors.collect(schema.name)"
      :data-vv-as="schema.label"
      single-line
    ></v-select>
</template>

<script src="./fieldSelectJs.js"></script>