<template>
        <v-card>
        <v-card-title v-bind:class="[data.titleClass ? data.titleClass : 'blue lighten-2 white--text']">
          <div v-bind:class="[data.headlineClass ? data.headlineClass : 'headline']">{{data.title ? data.title : "Modal header"}}</div>
          <v-spacer></v-spacer>
          <v-btn icon dark v-if="data.isClosable" @click="cancel"><v-icon>clear</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-btn block color="info" dark @click="uploadFiles()" v-show="filesCount>0">Загрузить</v-btn>
          <v-progress-linear v-show="showProgress" v-model="totalProgress" height="30" color="info"></v-progress-linear>
          <p class="text-xs-center" v-show="showProgress">{{totalProgress | currency('', 0)}}%</p>
        </v-card-text>
        
        <vue-transmit class="col-12"
                      tag="section"
                      v-bind="options"
                      @sending-multiple = "beforeSend"
                      @complete-multiple = "completeSend"
                      @total-upload-progress = "totalProgressChanged"
                      @accepted-file = "filesAcceptedFunction"
                      @removed-file = "fileRemovedFunction"
                      ref="uploader">
        <v-card-media height="160px" v-show="!showProgress" >
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                 <div class="d-flex align-items-center justify-content-center w-100"
                style="height:140px; border-radius: 1rem; border: dashed 5px #2196f3;">
            <v-layout row wrap>
            <v-flex xs12 px-1><v-btn block dark color="info" @click="triggerBrowse">Выбрать файлы</v-btn></v-flex>
            <v-flex xs12 text-xs-center><v-icon>fa-upload</v-icon></v-flex>
            <v-flex xs12 text-xs-center grey--text>Перетяните документы сюда</v-flex>
            </v-layout>
          </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-media>
        <template slot="files" slot-scope="props">
          <v-card-text v-show="props.files.length>0">
            <v-list>
              <v-divider></v-divider>
          <v-list-tile avatar v-for="item in props.files" v-bind:key="item.id">
            <v-list-tile-action>
              
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <v-icon class="red--text" @click="removeFile(item)">fa-trash</v-icon>
            </v-list-tile-avatar>
          </v-list-tile>
            <v-divider></v-divider>
        </v-list>
          </v-card-text>
        </template>     
        </vue-transmit>
      </v-card>
      
</template>

<script src="./updateModalJs.js"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./updateModal.css"></style>
