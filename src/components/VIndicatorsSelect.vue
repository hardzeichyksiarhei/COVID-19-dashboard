<template>
  <div class="indicators-select">
    <Dropdown
      class="indicators-dropdown"
      :style="{ width: width || 'auto' }"
      :modelValue="currentIndicator"
      :options="indicators"
      optionLabel="label"
      @change="handleChangeIndicator"
    />
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "VIndicatorsSelect",

  props: ["width"],

  components: { Dropdown },

  computed: {
    ...mapGetters({
      currentIndicator: "countries/currentIndicator",
      indicators: "countries/indicators",
    }),
  },

  methods: {
    ...mapActions({
      setCurrentIndicator: "countries/setCurrentIndicator",
    }),
    handleChangeIndicator({ value }) {
      const indicator = this.indicators.find(
        (indicator) => indicator.key === value.key
      );

      this.setCurrentIndicator(indicator);

      this.$emit("change:indicator", indicator);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 0.5rem 1rem;
}

::v-deep .p-dropdown-items-wrapper {
  &::-webkit-scrollbar {
    width: 6px;
    margin: 0 10px;
  }
  &::-webkit-scrollbar-track {
    background: var(--surface-d);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
  }
}
</style>