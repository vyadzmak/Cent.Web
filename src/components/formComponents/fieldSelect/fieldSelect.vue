
<template>
    <v-select
      v-model="value"
      :item-text="schema.vName"
      :item-value="schema.vId"
      :items="schema.items"
      :label="schema.label"
      :disabled="disabled"
      :placeholder="schema.placeholder"
      :readonly="schema.readonly"
      :rules="schema.rules"
      :required="schema.required"
    ></v-select>
</template>

<script src="./fieldSelectJs.js"></script>