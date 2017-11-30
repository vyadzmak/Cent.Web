<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2 white--text']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon dark v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form  class="v-card-form">
      <vue-form-generator :schema="formSchema" :model="updateItem" :options="formOptions" v-if="formSchema.fields">
      </vue-form-generator>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="clear">Очистить</v-btn>
          <v-btn :class="{ green: valid, red: !valid }" color="success" dark @click="submit">Сохранить</v-btn>
          <v-btn color="error" dark @click="cancel">Отмена</v-btn>
        </v-card-actions>
    </v-form>
      </v-card>
      
</template>

<script src="./updateModalJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./updateModal.css"></style>
