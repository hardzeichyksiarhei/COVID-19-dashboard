<template>
  <div class="chart">
    <v-chart-card @dialog:show="isMaximize = true" />
  </div>

  <Dialog
    class="countries-dialog p-dialog-maximized"
    v-model:visible="isMaximize"
    header="Chart"
  >
    <v-chart-card :is-dialog="isMaximize" />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import VChartCard from "../components/cards/VChartCard";

export default {
  name: "VChart",

  components: { Dialog, VChartCard },

  data() {
    return {
      isMaximize: false,
    };
  },
};
</script>
