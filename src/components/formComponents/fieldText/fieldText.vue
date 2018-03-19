
<template>
  <v-text-field
    v-validate="schema.veePipe"
    v-model="value"
    :name="schema.name"
    :type="schema.inputType"
    :disabled="disabled"
    :placeholder="schema.placeholder"
    :readonly="schema.readonly"
    :required="schema.required"
    :error-messages="veeErrors.collect(schema.name)"
    :data-vv-as="schema.label"
    single-line
  />
</template>

<script src="./fieldTextJs.js"></script>
