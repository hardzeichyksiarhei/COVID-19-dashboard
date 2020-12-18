<template>
  <div class="countries">
    <v-global-country-info-card />
    <v-countries-card @dialog:show="isMaximize = true" />
  </div>

  <Dialog
    class="countries-dialog p-dialog-maximized"
    :header="`${currentIndicator.label} by Country`"
    v-model:visible="isMaximize"
  >
    <v-countries-card :is-dialog="isMaximize" />
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";

import VCountriesCard from "../components/cards/VCountriesCard";
import VGlobalCountryInfoCard from "../components/cards/VGlobalCountryInfoCard";
import { mapGetters } from "vuex";

export default {
  name: "VCountries",

  components: { Dialog, VCountriesCard, VGlobalCountryInfoCard },

  data() {
    return {
      isMaximize: false,
    };
  },

  computed: {
    ...mapGetters({
      currentIndicator: "countries/currentIndicator",
    }),
  },

  methods: {
    handleChangeIndicator(indicator) {
      this.currentIndicator = indicator;
    },
  },
};
</script>