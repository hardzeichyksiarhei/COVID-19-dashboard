<template>
  <div class="indicators-select">
    <Dropdown
      class="indicators-btn"
      :style="{ width: width || 'auto' }"
      v-model="localCurrentIndicator"
      :options="indicators"
      optionLabel="label"
      @change="handleChangeIndicator"
    />
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";

import { indicators } from "../helpers/indicators";

export default {
  name: "VIndicatorsSelect",

  props: ["currentIndicator", "width"],

  components: {
    Dropdown,
  },

  data() {
    return {
      localCurrentIndicator: this.currentIndicator,
      indicators,
    };
  },

  methods: {
    handleChangeIndicator({ value }) {
      const indicator = this.indicators.find(
        (indicator) => indicator.key === value.key
      );
      this.$emit("change:indicator", indicator);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 0.5rem 1rem;
}
</style>