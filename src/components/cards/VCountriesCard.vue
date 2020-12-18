<template>
  <div class="coutries-card">
    <button class="maximize-btn" @click="isMaximize = true">
      <i class="pi pi-window-maximize"></i>
    </button>

    <div class="coutries-card__indicator-select">
      <v-indicators-select
        :current-indicator="localCurrentIndicator"
        @change:indicator="handleChangeIndicator"
        width="100%"
      />
    </div>
    <v-countries-list
      :countries="countries"
      :current-indicator="localCurrentIndicator"
    />
  </div>

  <Dialog
    class="countries-dialog p-dialog-maximized"
    :header="`${$filters.capitalize(localCurrentIndicator)} by Country`"
    v-model:visible="isMaximize"
  >
    <v-indicators-select
      :current-indicator="localCurrentIndicator"
      @change:indicator="handleChangeIndicator"
      width="200px"
    />
    <v-countries-list
      :countries="countries"
      :current-indicator="localCurrentIndicator"
    />
  </Dialog>
</template>

<script>
import { ref, computed, toRefs } from "vue";
import { useStore } from "vuex";

import Dialog from "primevue/dialog";

import VCountriesList from "../lists/VCountriesList";
import VIndicatorsSelect from "../VIndicatorsSelect.vue";

export default {
  name: "VCountriesCard",

  components: { Dialog, VCountriesList, VIndicatorsSelect },

  props: ["currentIndicator"],

  setup(props, { emit }) {
    const { currentIndicator } = toRefs(props);
    let localCurrentIndicator = currentIndicator;

    const store = useStore();

    const isMaximize = ref(false);

    const countries = computed(() => store.getters["countries/countries"]);
    store.dispatch("countries/fetchCountries");

    const handleChangeIndicator = (indicator) => {
      localCurrentIndicator = indicator;
      emit("change:indicator", indicator);
    };

    return {
      localCurrentIndicator,
      isMaximize,
      countries,
      handleChangeIndicator,
    };
  },
};
</script>

<style lang="scss" scoped>
.coutries-card {
  position: relative;
  background: var(--surface-a);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  &:hover {
    .maximize-btn {
      opacity: 1;
    }
  }

  &__indicator-select {
    padding: 1rem;
    padding-bottom: 0;
  }

  .countries-list {
    background: transparent;
    border: none;
    border-radius: none;
  }
}

::v-deep .countries-dialog {
  .indicators-select {
    margin-bottom: 20px;
  }
  .countries-list {
    .p-listbox-list-wrapper .p-listbox-list {
      height: 75vh;
    }
  }
}
</style>