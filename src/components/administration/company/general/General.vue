<template>
  <div>
    <v-layout
      row
      wrap>
      <v-flex
        md4
        sm12
        pa-1>
        <div class="subheading">Логотип компании</div>
      </v-flex>
      <v-flex
        hidden-sm-and-down
        md8
        sm12
        pa-1>
        <div class="subheading">Расширенная информация о компании</div>
      </v-flex>
    </v-layout>
    <v-layout
      row
      wrap>
      <v-flex
        md4
        sm12
        pa-1>
        <v-layout
          row
          wrap>
          <v-flex>
            <v-avatar size="125px">
              <img
                class="img-circle elevation-7 mb-1"
                src="https://raw.githubusercontent.com/vuetifyjs/docs/dev/static/doc-images/lists/1.jpg"
              >
            </v-avatar>
          </v-flex>
          <v-flex><v-btn color="primary">Выбрать файл</v-btn></v-flex>
        </v-layout>
        <div class="subheading pa-1">Основная информация</div>
        <v-text-field label="Наименование организации"/>
        <v-text-field label="Учетный номер"/>
        <v-select label="Тип организации"/>
        <v-checkbox
          label="Блокировка"/>
      </v-flex>
      <v-flex
        pa-1
        md4
        sm12>
        <div
          class="subheading pa-1 hidden-md-and-up">Расширенная информация о компании</div>
        <v-textarea
          rows="2"
          label="Юридический адрес организации"
        />
        <v-checkbox
          hide-details
          label="Фактический адрес совпадает с юридическим"/>
        <v-textarea
          rows="2"
          label="Фактический адрес организации"
        />
        <v-text-field label="Номер телефона"/>
        <v-text-field label="Дополнительный номер телефона"/>
        <v-text-field label="Адрес сайта"/>
        <v-text-field label="Адрес электронной почты"/>
      </v-flex>
      <v-flex
        pa-1
        md4
        sm12>
        <v-textarea
          rows="2"
          label="Основная информация об организации"
        />
        <div
          style="margin-top:20px; font-size:16px;"
          class="hidden-sm-and-down">&#160;</div>
        <v-textarea
          rows="2"
          label="Доп. информация об организации"
        />
        <v-text-field label="Координаты"/>
        <v-text-field label="Почтовый индекс (ZIP-code)"/>
        <div>Социальные сети</div>
        <v-layout
          row
          wrap
        >
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="Skype"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="WhatsApp"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="Viber"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="VK"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="Facebook"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="OK"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="Twitter"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="Telegram"/>
          </v-flex>
          <v-flex
            pa-1
            md6
            sm4
            xs12
          >
            <v-text-field label="Instagram"/>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script src="./general.js"></script>

<style scoped></style>
