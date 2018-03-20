<template>
  <v-card>
    <v-card-title :class="[data.titleClass ? data.titleClass : 'info white--text']">
      <div :class="[data.headlineClass ? data.headlineClass : 'headline']">{{ data.title ? data.title : "Modal header" }}</div>
      <v-spacer/>
      <v-btn
        v-if="data.isClosable"
        icon
        dark
        @click="cancel"><v-icon>clear</v-icon></v-btn>
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      class="v-card-form">
      <v-text-field
        v-model="data.item.name"
        :rules="nameRules"
        label="Имя"
        required
      />
      <v-text-field
        v-model="data.item.title"
        :rules="nameRules"
        label="Заголовок"
        required
      />
      <v-text-field
        v-model="data.item.description"
        :rules="nameRules"
        label="Описание"
        required
      />
      <v-text-field
        v-model="data.item.group_title"
        :rules="nameRules"
        label="Заголовок группы"
        required
      />
      <v-select
        v-model="data.item.schema_type_id"
        :items="schemaTypes"
        item-text="title"
        item-value="id"
        label="Тип"
        required
      />
      <v-checkbox
        :label="'Отображать на главной странице'"
        v-model="data.item.is_show"
        color="error"/>
      <v-card-actions>
        <v-spacer/>
        <v-btn @click="clear">Очистить</v-btn>
        <v-btn
          :class="{ green: valid, red: !valid }"
          color="success"
          dark
          @click="submit">Сохранить</v-btn>
        <v-btn
          color="error"
          dark
          @click="cancel">Отмена</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>

</template>

<script src="./updateModalJs.js"></script>

<style scoped></style>
