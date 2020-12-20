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
        <v-table-card />
        <v-chart />
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

import VTableCard from "../components/cards/VTableCard";
import VMap from "../components/VMap.vue";
import VCountries from "../components/VCountries.vue";
import VChart from "../components/VChart.vue";

export default {
  name: "Dashboard",
  components: { VCountries, VTableCard, VMap, VChart },

  setup() {
    const store = useStore();

    store.dispatch("countries/fetchCountries");
  },
};
</script>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 320px minmax(auto, 1fr) minmax(auto, 400px);
  gap: 20px;
}
</style>
