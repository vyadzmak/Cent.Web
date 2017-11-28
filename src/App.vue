<template>
  <v-app>
    <div class="spinner-position" v-show="loading!==0">
    <v-progress-circular indeterminate v-bind:size="120" v-bind:width="5" class="blue--text"></v-progress-circular>
    </div>
    <v-snackbar
      :timeout="snackbarOptions.timeout"
      :top="snackbarOptions.ylay === 'top'"
      :bottom="snackbarOptions.ylay === 'bottom'"
      :right="snackbarOptions.xlay === 'right'"
      :left="snackbarOptions.xlay === 'left'"
      :color="snackbarOptions.context"
      :multi-line="snackbarOptions.mode === 'multi-line'"
      :vertical="snackbarOptions.mode === 'vertical'"
      :text = "snackbarOptions.text"
      v-model="snackbarOptions.snackbar"
    >
      {{ snackbarOptions.text }}
      <v-btn dark flat @click.native="closeSnackbar">Закрыть</v-btn>
    </v-snackbar>
    <modal-dialog></modal-dialog>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    loading () {
      return this.$store.state.loading
    },
    snackbarOptions () {
      return this.$store.state.snackbarOptions
    }
  },
  methods: {
    closeSnackbar () {
      this.$store.commit('showSnackbar', {snackbar: false})
    }
  }
}
</script>

<style lang="scss">
@import "~vue-modal-dialog/src/modal";

@mixin centerer() {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.spinner-position {
  z-index:1900;
  @include centerer;
}

.overlay {
  z-index: 2 !important
}
</style>
