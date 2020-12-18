<template>
  <div class="indicators-types-select">
    <Dropdown
      class="indicators-types-dropdown"
      :style="{ width: width || 'auto' }"
      :modelValue="currentIndicatorType"
      :options="indicatorsTypes"
      optionLabel="label"
      @change="handleChangeIndicatorType"
    />
  </div>
</template>

<script>
import Dropdown from "primevue/dropdown";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "VIndicatorsTypesSelect",

  props: ["width"],

  components: { Dropdown },

  computed: {
    ...mapGetters({
      currentIndicatorType: "countries/currentIndicatorType",
      indicatorsTypes: "countries/indicatorsTypes",
    }),
  },

  methods: {
    ...mapActions({
      setCurrentIndicatorType: "countries/setCurrentIndicatorType",
    }),
    handleChangeIndicatorType({ value }) {
      const indicatorType = this.indicatorsTypes.find(
        (indicatorType) => indicatorType.key === value.key
      );

      this.setCurrentIndicatorType(indicatorType);

      this.$emit("change:indicator-type", indicatorType);
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