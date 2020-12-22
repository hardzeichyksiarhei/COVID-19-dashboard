<template>
  <div class="countries-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>

    <div class="countries-card__indicator-select">
      <v-indicators-types-select width="100%" />
      <v-indicators-select width="100%" />
    </div>
    <v-countries-list :countries="countries" />
  </div>
</template>

<script>
import { computed, toRefs } from "vue";
import { useStore } from "vuex";

import VCountriesList from "../lists/VCountriesList";
import VIndicatorsSelect from "../VIndicatorsSelect";
import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";

export default {
  name: "VCountriesCard",

  components: { VCountriesList, VIndicatorsSelect, VIndicatorsTypesSelect },

  props: ["isDialog"],

  setup(props, { emit }) {
    const { currentIndicator } = toRefs(props);
    let localCurrentIndicator = currentIndicator;

    const store = useStore();

    const countries = computed(() => store.getters["countries/countries"]);

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
  display: flex;
  flex-direction: column;
  height: calc(100vh - 260px);
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 1rem;
    padding-top: 13px;
    padding-bottom: 0;
  }
}

.countries-card.is-dialog {
  height: 85vh;
}
</style>