<template>
  <div class="dashboard">
    <div class="dashboard-grid">
      <div class="dashboard-grid-col">
        <v-countries />
      </div>
      <div class="dashboard-grid-col">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium qui
        sequi amet quis ullam expedita natus eius voluptatibus maiores, velit
        eveniet eum iste deserunt odit officiis. Qui molestias dolor sequi.
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
import VCountries from "../components/cards/VCountries";

export default {
  name: "Dashboard",
  components: { VCountries },
};
</script>

<style lang="scss" scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: 320px auto 500px;
  gap: 20px;
}
</style>
