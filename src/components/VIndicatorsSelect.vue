<template>
  <div class="indicators-select">
    <Dropdown
      class="indicators-btn"
      :style="{ width: width || 'auto' }"
      v-model="localCurrentIndicator"
      :options="indicators"
      optionLabel="label"
      optionValue="key"
      @change="handleChangeIndicator"
    />
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

export default {
  name: "VIndicatorsSelect",

  props: ["currentIndicator", "width"],

  components: {
    Dropdown,
  },

  data() {
    return {
      localCurrentIndicator: this.currentIndicator,
      indicators: [
        { key: "cases", label: "Cases" },
        { key: "deaths", label: "Deaths" },
        { key: "recovered", label: "Recovered" },
        { key: "tests", label: "Tests" },
      ],
    };
  },

  methods: {
    handleChangeIndicator(indicator) {
      this.$emit("change:indicator", indicator.value);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 0.5rem 1rem;
}
</style>