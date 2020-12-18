<template>
  <div class="countries-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>

    <div class="countries-card__indicator-select">
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
</template>

<script>
import { computed, toRefs } from "vue";
import { useStore } from "vuex";

import VCountriesList from "../lists/VCountriesList";
import VIndicatorsSelect from "../VIndicatorsSelect.vue";

export default {
  name: "VCountriesCard",

  components: { VCountriesList, VIndicatorsSelect },

  props: ["currentIndicator", "isDialog"],

  setup(props, { emit }) {
    const { currentIndicator } = toRefs(props);
    let localCurrentIndicator = currentIndicator;

    const store = useStore();

    const countries = computed(() => store.getters["countries/countries"]);
    store.dispatch("countries/fetchCountries");

    const handleChangeIndicator = (indicator) => {
      localCurrentIndicator = indicator;
      emit("change:indicator", indicator);
    };

    return {
      localCurrentIndicator,
      countries,
      handleChangeIndicator,
    };
  },
};
</script>

<style lang="scss" scoped>
.countries-card {
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

.countries-card {
  ::v-deep .countries-list .p-listbox-list-wrapper .p-listbox-list {
    height: calc(65vh + 10px);
  }
}

.countries-card.is-dialog {
  ::v-deep .countries-list .p-listbox-list-wrapper .p-listbox-list {
    height: 75vh;
  }
}
</style>