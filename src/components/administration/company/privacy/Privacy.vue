<template>
  <div>
    <v-card>
      <v-card-text>
        <p class="headline">Разрешить доступ к следующим элементам информации</p>
        <v-layout
          row
          wrap
        >
          <v-flex
            v-for="item in items"
            :key="item"
            md4
            sm6
            xs12>
            <v-checkbox
              :label="item"
            />
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script src="./privacy.js"></script>

<style scoped></style>
