
<template>
<v-text-field
      v-model="value"
      :type="schema.inputType"
      :label="schema.label"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :rules="schema.rules"
      :required="schema.required"
    ></v-text-field>
</template>

<script src="./fieldTextJs.js"></script>