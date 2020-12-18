<template>
  <div class="global-cases-card">
    <div class="global-cases-card__label">
      {{
        currentCountry
          ? `${currentIndicator.label} by: ${currentCountry.country}`
          : `Global ${currentIndicator.label}`
      }}
    </div>
    <div :class="`global-cases-card__number ${currentIndicator.color}`">
      {{ $filters.numberFormat(global[currentIndicator.key]) }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VGlobalCasesCard",

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      currentCountry: "countries/currentCountry",
      currentIndicator: "countries/currentIndicator",
    }),

    global() {
      if (!this.currentCountry && !this.covidAll) return {};
      return this.currentCountry || this.covidAll;
    },
  },
};
</script>

<style lang="scss" scoped>
.global-cases-card {
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
    &.cases {
      color: $cases-color;
    }
    &.deaths {
      color: $deaths-color;
    }
    &.recovered {
      color: $recovered-color;
    }
    &.tests {
      color: $tests-color;
    }
  }
}
</style>