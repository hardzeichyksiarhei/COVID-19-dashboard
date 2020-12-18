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
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas sapiente
        labore facere impedit cumque, corporis, consequuntur obcaecati unde
        ipsam laudantium nihil eum, ipsum nulla. Ipsum soluta tempora illum
        nulla consectetur.
      </div>
    </div>
  </div>
</template>

<script>
import VCountries from "../components/VCountries.vue";
import VMap from "../components/VMap.vue";

export default {
  name: "Dashboard",
  components: { VCountries, VMap },
};
</script>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 320px 2fr 1fr;
  gap: 20px;
}
</style>
