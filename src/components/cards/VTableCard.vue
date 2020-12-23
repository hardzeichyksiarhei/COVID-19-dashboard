<template>
  <div class="table-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>
    <div class="table-card__indicator-select">
      <v-indicators-types-select width="100%" />
    </div>

    <div class="table-card__body">
      <v-countries-table :countries="countries" />
    </div>
  </div>
</template>

<script>
import { toRefs, computed } from "vue";
import { useStore } from "vuex";

import VCountriesTable from "../lists/VCountriesTable";
import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";

export default {
  name: "VTableCard",

  components: { VCountriesTable, VIndicatorsTypesSelect },

  props: ["isDialog"],

  setup(props, { emit }) {
    const { currentIndicatorType } = toRefs(props);
    let localCurrentIndicatorType = currentIndicatorType;

    const store = useStore();

    const countries = computed(() => store.getters["countries/countries"]);

    const handleChangeIndicatorType = (indicator) => {
      localCurrentIndicatorType = indicator;
      emit("change:indicator", indicator);
    };

    return { localCurrentIndicatorType, countries, handleChangeIndicatorType };
  },
};
</script>

<style lang="scss" scoped>
.table-card {
  height: calc(55vh - 85px);
  position: relative;
  background: var(--surface-a);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 15px;
  &:hover {
    .maximize-btn {
      opacity: 1;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100% - 30px);
  }
}

.table-card.is-dialog {
  height: 85vh;
}

@media screen and (max-width: 1366px) {
  .table-card {
    margin-top: 0;
    height: 50vh;
    min-height: 360px;
  }
}
</style>