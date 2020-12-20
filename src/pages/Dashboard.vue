<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <div class="dashboard-grid-col">
        <v-countries />
      </div>
      <div class="dashboard-grid-col">
        <v-map />
      </div>
      <div class="dashboard-grid-col">
        <v-table />
        <v-chart />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

import VTable from "../components/VTable.vue";
import VMap from "../components/VMap.vue";
import VCountries from "../components/VCountries.vue";
import VChart from "../components/VChart.vue";

export default {
  name: "Dashboard",
  components: { VCountries, VTable, VMap, VChart },

  setup() {
    const store = useStore();

    store.dispatch("countries/fetchCountries");
  },
};
</script>

<style lang="scss" scoped>
.dashboard-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 320px minmax(auto, 2fr) minmax(380px, 1fr);
  gap: 20px;
}
</style>
