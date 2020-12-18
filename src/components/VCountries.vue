<template>
  <div class="countries">
    <v-global-cases-card :current-indicator="currentIndicator" />
    <v-countries-card
      :current-indicator="currentIndicator"
      @change:indicator="handleChangeIndicator"
    />
  </div>
</template>

<script>
import VCountriesCard from "../components/cards/VCountriesCard";
import VGlobalCasesCard from "../components/cards/VGlobalCasesCard";

export default {
  name: "VCountries",

  components: { VCountriesCard, VGlobalCasesCard },

  data() {
    return {
      currentIndicator: "cases",
    };
  },

  methods: {
    handleChangeIndicator(indicator) {
      this.currentIndicator = indicator;
    },
  },
};
</script>

<style>
</style>