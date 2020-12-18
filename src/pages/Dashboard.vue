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
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

import VTableCard from "../components/cards/VTableCard";
import VMap from "../components/VMap.vue";
import VCountries from "../components/VCountries.vue";

export default {
  name: "Dashboard",
  components: { VCountries, VTableCard, VMap },

  setup() {
    const store = useStore();

    store.dispatch("countries/fetchCountries");
  },
};
</script>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 320px 2fr 1fr;
  gap: 20px;
}
</style>
