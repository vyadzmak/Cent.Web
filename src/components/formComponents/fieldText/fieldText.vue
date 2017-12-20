
<template>
<v-text-field
      v-model="value"
      :name="schema.name"
      :type="schema.inputType"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :required="schema.required"
      v-validate="schema.veePipe"
      :error-messages="veeErrors.collect(schema.name)"
      :data-vv-as="schema.label"
      single-line
    ></v-text-field>
</template>

<script src="./fieldTextJs.js"></script>