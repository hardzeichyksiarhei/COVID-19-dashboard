<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <div class="dashboard-grid-col">
        <v-global-cases-card />
        <v-countries-card />
      </div>
      <div class="dashboard-grid-col">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium qui
        sequi amet quis ullam expedita natus eius voluptatibus maiores, velit
        eveniet eum iste deserunt odit officiis. Qui molestias dolor sequi.
      </div>
      <div class="dashboard-grid-col">
        <v-table-card />
      </div>
    </div>
  </div>
</template>

<script>
import VCountriesCard from "../components/cards/VCountriesCard";
import VGlobalCasesCard from "../components/cards/VGlobalCasesCard";
import VTableCard from "../components/cards/VTableCard"

export default {
  name: "Dashboard",
  components: { VCountriesCard, VGlobalCasesCard, VTableCard },
};
</script>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 320px 2fr 1fr;
  gap: 20px;
}
</style>
