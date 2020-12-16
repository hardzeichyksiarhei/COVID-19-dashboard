<template>
  <div class="global-cases-card">
    <div class="global-cases-card__title">Global Cases</div>
    <div class="global-cases-card__content">
      {{ $filters.numberFormat(globalCases) }}
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
    }),

    globalCases() {
      return this.currentCountry?.cases || this.covidAll?.cases;
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
  &__title {
    font-size: 20px;
    margin-bottom: 5px;
  }
  &__content {
    color: $primary-color;
    font-size: 32px;
  }
}
</style>