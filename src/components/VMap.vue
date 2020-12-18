<template>
  <div class="map">
    <v-map-card @dialog:show="isMaximize = true" />
  </div>

  <Dialog
    class="countries-dialog p-dialog-maximized"
    v-model:visible="isMaximize"
    header="Map"
  >
    <v-map-card :is-dialog="isMaximize" />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";

import VMapCard from "./cards/VMapCard.vue";
export default {
  name: "VMap",

  components: { Dialog, VMapCard },

  data() {
    return {
      isMaximize: false,
    };
  },
};
</script>
