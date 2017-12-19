
<template>
<v-text-field
      v-model="value"
      :type="schema.inputType"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :rules="schema.rules"
      :required="schema.required"
      single-line
    ></v-text-field>
</template>

<script src="./fieldTextJs.js"></script>