<template>
  <v-container
    pa-1
    mx-0
    fluid>
    <v-layout
      row
      wrap>
      <v-flex md8>
        <v-card
          style="overflow-y:scroll;"
          height="58vh">
          <v-container
            grid-list-sm
            pa-1>
            <v-layout
              row
              wrap>
              <v-flex
                v-for="item in items"
                :key="item.id"
                tag="a"
                md6
                sm12
                xs12
                @click="goToItem(item)">
                <v-card height="28vh">
                  <v-card-title
                  ><v-icon
                    color="secondary"
                    class="main-card">{{ item.icon }}</v-icon>
                    <v-spacer/>
                    <div class="secondary--text main-card"> {{ item.name }}</div>
                    <v-spacer/>
                  </v-card-title>
                  <div class="text-xs-center">
                    <v-badge
                      v-for="bObj in item.sIcons"
                      :key="bObj.icon"
                      class="px-2 main-card-icons"
                      overlap
                      bottom
                      color="warning">
                      <span slot="badge">{{ bObj.badge }}</span>
                      <v-icon
                        class="main-card-icons"
                        color="primary">{{ bObj.icon }}</v-icon>
                    </v-badge>
                  </div>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
        <v-card
          height="30vh"
          style="overflow-y:hidden;">
          <v-card-title class="py-1 primary white--text">Последние объекты</v-card-title>
          <v-list
            style="overflow-y:scroll; height:calc(30vh - 30px);"
            dense>
            <v-divider/>
            <template
              v-for="item in news">
              <v-list-tile
                :key="item.title+'lastObjects'"
                @click="goToRecent(item)">
                <v-list-tile-content>
                  <v-list-tile-sub-title v-html="item.subtitle"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <div class="caption">2018-08-08 12:55</div>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                :key="item.title+'lastObjects-divid'"/>
            </template>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex md4>
        <v-card
          height="44vh"
          style="overflow-y:hidden;">
          <v-card-title class="py-1 primary white--text">Лента</v-card-title>
          <v-list
            style="overflow-y:scroll; height:calc(44vh - 30px);"
            three-line
          >
            <v-divider/>
            <template
              v-for="item in news">
              <v-list-tile
                :key="item.title+'news'"
                avatar
                @click="goToNews(item)">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"/>
                  <v-list-tile-sub-title v-html="item.subtitle"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <div class="caption">2018-08-08 12:55</div>
                  <div/>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                :key="item.title+'news-divid'"/>
            </template>
          </v-list>
        </v-card>
        <v-card
          height="44vh"
          style="overflow-y:hidden;">
          <v-card-title class="py-1 primary white--text">Контакты</v-card-title>
          <v-list
            style="overflow-y:scroll; height:calc(44vh - 30px);"
            two-line
          >
            <v-divider/>
            <template
              v-for="item in contacts">
              <v-list-tile
                :key="item.title+'contacts'"
                avatar
                @click="goToContact(item)">
                <v-list-tile-avatar>
                  <img :src="item.avatar">
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title v-html="item.title"/>
                  <v-list-tile-sub-title v-html="item.title"/>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn
                    icon
                    ripple>
                    <v-icon>fas fa-info</v-icon>
                  </v-btn>
                  <v-btn
                    icon
                    ripple>
                    <v-icon>fas fa-envelope</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider
                :key="item.title+'contacts-divid'"/>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./main.js"></script>

<style scoped lang="scss">
a:active, a:hover {
    background-color: #576574;
}

// Responsive text mixin
@function strip-unit($number) {
    @if type-of($number) == 'number' and not unitless($number) {
      @return $number / ($number * 0 + 1);
    }

    @return $number;
  }

@mixin responsiveText ($minSize: $font-size, $maxSize: 28px, $minWidth: 420px, $maxWidth: 980px) {

  $mxS: strip-unit($maxSize);
  $mnS: strip-unit($minSize);
  $mxW: strip-unit($maxWidth);
  $mnW: strip-unit($minWidth);

    font-size: calc( #{$minSize} + (#{$mxS} - #{$mnS}) * (100vw - #{$minWidth}) / (#{$mxW} - #{$mnW})) !important;

    @media screen and (max-width: $minWidth ){
        font-size: $minSize;
    }

    @media screen and (min-width: $maxWidth ){
        font-size: $maxSize;
    }

  }

  .main-card{
    @include responsiveText(14px, 26px);
  }
  .main-card-icons{
    @include responsiveText(14px, 20px);
  }
</style>
