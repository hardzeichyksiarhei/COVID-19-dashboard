<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <div class="dashboard-grid-col dashboard-grid-col--first">
        <v-countries />
      </div>
      <div class="dashboard-grid-col dashboard-grid-col--second">
        <v-map />
      </div>
      <div class="dashboard-grid-col dashboard-grid-col--third">
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
  grid-template-columns: 320px minmax(auto, 2fr) minmax(400px, 1fr);
  gap: 20px;
}

@media screen and (max-width: 1366px) {
  .dashboard-grid {
    grid-template-columns: 320px 1fr;
  }

  .dashboard-grid-col {
    &--third {
      grid-column: 1 / 3;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
  }
}

@media screen and (max-width: 991px) {
  .dashboard-grid {
    grid-template-columns: 100%;
  }
  .dashboard-grid-col {
    &--third {
      grid-column: auto;
      grid-template-columns: 100%;
    }
  }
}
</style>
