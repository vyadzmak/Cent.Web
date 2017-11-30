<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'green lighten-2 white--text']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon dark v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Наименование клиента"
      v-model="data.item.name"
      :rules="nameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Регистрационный номер"
      v-model="data.item.registration_number"
      :rules="regRules"
      required
    ></v-text-field>
    <v-select
      label="Тип организации"
      v-model="data.item.client_type_id"
      item-text="name"
      item-value="id"
      :items="clientTypeItems"
      :rules="[(v) => !!v || 'Выберите тип организации']"
      required
    ></v-select>
    <v-switch :label="`Статус: ${data.item.lock_state?'заблокирован':'активный'}`"
                        v-model="data.item.lock_state"
                        color="error"></v-switch>
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
