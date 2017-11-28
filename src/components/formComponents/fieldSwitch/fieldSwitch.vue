
<template>
    <v-switch :label="`${schema.label}: ${value?schema.items[1]:schema.items[0]}`"
                        v-model="value"
                        color="error"></v-switch>
</template>

<script src="./fieldSwitchJs.js"></script>