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
      :class="`global-country-info-card__number ${currentIndicator.color}`"
    >
      {{ globalNumber }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VGlobalCountryInfoCard",

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      currentCountry: "countries/currentCountry",
      currentIndicator: "countries/currentIndicator",
      currentIndicatorType: "countries/currentIndicatorType",
    }),

    globalNumber() {
      const obj = this.currentCountry || this.covidAll;
      if (obj) {
        return this.$filters.numberFormat(
          obj[this.currentIndicatorType.key][this.currentIndicator.key]
        );
      }

      return false;
    },
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