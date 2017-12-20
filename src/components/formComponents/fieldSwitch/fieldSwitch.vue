
<template>
    <v-switch :label="`${schema.label}: ${value?schema.textOn[1]:schema.textOff}`"
                        v-model="value"
                        color="error"></v-switch>
</template>

<script src="./fieldSwitchJs.js"></script>