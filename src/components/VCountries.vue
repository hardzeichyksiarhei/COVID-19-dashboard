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
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Dialog from "primevue/dialog";

import VCountriesCard from "../components/cards/VCountriesCard";
import VGlobalCountryInfoCard from "../components/cards/VGlobalCountryInfoCard";

export default {
  name: "VCountries",

  components: { Dialog, VCountriesCard, VGlobalCountryInfoCard },

  setup() {
    const store = useStore();

    const isMaximize = ref(false);

    const currentIndicator = computed(
      () => store.getters["countries/currentIndicator"]
    );

    return {
      isMaximize,
      currentIndicator,
    };
  },
};
</script>