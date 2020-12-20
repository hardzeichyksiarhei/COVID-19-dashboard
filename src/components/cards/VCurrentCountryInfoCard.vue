<template>
  <div class="current-country-info-card">
    <div class="current-country-info-card__type">
      {{ currentIndicatorType.label }}
    </div>
    <h4 class="current-country-info-card__title">
      {{ currentCountry.name }}
    </h4>
    <div
      v-for="(indicator, idx) in Object.keys(
        currentCountry[currentIndicatorType.key]
      )"
      :class="`current-country-info-card__info`"
      :key="idx"
    >
      {{ $filters.capitalize(indicator) }}:
      <span :class="`${indicator}-text`">{{
        $filters.numberFormat(
          currentCountry[currentIndicatorType.key][indicator]
        )
      }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "VCurrentCountryInfoCard",

  setup() {
    const store = useStore();

    const currentCountry = computed(
      () => store.getters["countries/currentCountry"]
    );
    const currentIndicatorType = computed(
      () => store.getters["countries/currentIndicatorType"]
    );

    return {
      currentCountry,
      currentIndicatorType,
    };
  },
};
</script>

<style lang="scss" scoped>
.current-country-info-card {
  min-width: 260px;
  background: var(--surface-a);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 10px;
  color: var(--text-color);
  &__type {
    font-size: 12px;
    margin-bottom: 5px;
    color: rgba(255, 255, 255, 0.6);
  }
  &__title {
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
  }
  &__info {
    font-size: 14px;
  }
}
</style>