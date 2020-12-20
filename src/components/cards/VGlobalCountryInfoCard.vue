<template>
  <div class="global-country-info-card">
    <div class="global-country-info-card__label">
      {{
        currentCountry
          ? `${currentIndicator.label} by: ${currentCountry.name}`
          : `Global ${currentIndicator.label}`
      }}
    </div>
    <div
      v-if="globalNumber"
      :class="`global-country-info-card__number ${currentIndicator.color}-text`"
    >
      {{ globalNumber }}
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { numberFormat } from "../../services/formats.services";

export default {
  name: "VGlobalCountryInfoCard",

  setup() {
    const store = useStore();

    const covidAll = computed(() => store.getters["app/covidAll"]);

    const currentCountry = computed(
      () => store.getters["countries/currentCountry"]
    );
    const currentIndicator = computed(
      () => store.getters["countries/currentIndicator"]
    );
    const currentIndicatorType = computed(
      () => store.getters["countries/currentIndicatorType"]
    );

    const globalNumber = computed(() => {
      const data = currentCountry.value || covidAll.value;
      if (!data) return false;

      return numberFormat(
        data[currentIndicatorType.value.key][currentIndicator.value.key]
      );
    });

    return {
      covidAll,
      currentCountry,
      currentIndicator,
      currentIndicatorType,
      globalNumber,
    };
  },
};
</script>

<style lang="scss" scoped>
.global-country-info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90px;
  background: var(--surface-a);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  margin-bottom: 20px;
  &__label {
    font-size: 20px;
    margin-bottom: 5px;
  }
  &__number {
    font-size: 32px;
  }
}
</style>