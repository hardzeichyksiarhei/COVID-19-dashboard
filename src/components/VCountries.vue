<template>
  <div class="countries">
    <v-global-cases-card :current-indicator="currentIndicator" />
    <v-countries-card
      :current-indicator="currentIndicator"
      @change:indicator="handleChangeIndicator"
      @dialog:show="isMaximize = true"
    />
  </div>

  <Dialog
    class="countries-dialog p-dialog-maximized"
    :header="`${$filters.capitalize(currentIndicator)} by Country`"
    v-model:visible="isMaximize"
  >
    <v-countries-card
      :is-dialog="isMaximize"
      :current-indicator="currentIndicator"
      @change:indicator="handleChangeIndicator"
    />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";

import VCountriesCard from "../components/cards/VCountriesCard";
import VGlobalCasesCard from "../components/cards/VGlobalCasesCard";

export default {
  name: "VCountries",

  components: { Dialog, VCountriesCard, VGlobalCasesCard },

  data() {
    return {
      isMaximize: false,
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