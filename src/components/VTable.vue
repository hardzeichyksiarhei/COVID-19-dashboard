<template>
  <div class="table">
    <v-table-card @dialog:show="isMaximize = true" />
  </div>

  <Dialog
    class="table-dialog p-dialog-maximized"
    header="Table"
    v-model:visible="isMaximize"
  >
    <v-table-card :is-dialog="isMaximize" />
  </Dialog>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Dialog from "primevue/dialog";

import VTableCard from "../components/cards/VTableCard";

export default {
  name: "VTable",

  components: { Dialog, VTableCard },

  setup() {
    const store = useStore();

    const isMaximize = ref(false);

    const currentIndicatorType = computed(
      () => store.getters["countries/currentIndicatorType"]
    );

    return { 
      isMaximize, 
      currentIndicatorType 
    };
  },
};
</script>