
<template>
<v-radio-group v-model="value">
    <template v-for="item in schema.items">
                <v-radio :label="item.label"
                :key="item.label"
                :value="item.value"
                color="error"></v-radio>
    </template>
</v-radio-group>
</template>

<script src="./fieldRadioJs.js"></script>