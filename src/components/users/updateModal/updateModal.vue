<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2 white--text']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon dark v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-form v-model="valid" ref="form" class="v-card-form">
        <v-text-field
      label="Имя"
      v-model="data.item.first_name"
      :rules="fNameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Фамилия"
      v-model="data.item.last_name"
      :rules="lNameRules"
      required
    ></v-text-field>
    <v-text-field
      label="Логин"
      v-model="data.item.login_data[0].login"
      :rules="emailRules"
      required
    ></v-text-field>
    <v-text-field
      label="Пароль"
      v-model="data.item.login_data[0].password"
      :rules="passwordRules"
      :append-icon="'refresh'"
      :append-icon-cb="generatePassword"
      required
    ></v-text-field>
    <v-select
      label="Роль пользователя"
      v-model="data.item.user_role_id"
      item-text="name"
      item-value="id"
      :items="userRoles"
      :rules="[(v) => !!v || 'Выберите роль']"
      required
    ></v-select>
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
