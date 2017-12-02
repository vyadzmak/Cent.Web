<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'green lighten-2 white--text']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon dark v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Имя"
      v-model="data.item.name"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Заголовок"
      v-model="data.item.title"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Описание"
      v-model="data.item.description"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Заголовок группы"
      v-model="data.item.group_title"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-select
              :items="schemaTypes"
              item-text="title"
              item-value="id"
              v-model="data.item.schema_type_id"
              label="Тип"
               required
            ></v-select>
    <v-checkbox :label="'Отображать на главной странице'" v-model="data.item.is_show" color="error"></v-checkbox>
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
