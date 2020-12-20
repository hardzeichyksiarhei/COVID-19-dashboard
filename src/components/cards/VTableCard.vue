<template>
  <div class="table-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>
    <div class="table-card__indicator-select">
        <v-indicators-types-select width="100%" />
    </div>
    <v-cases-list :countries="countries" />
  </div>
</template>

<script>
import { toRefs, computed } from "vue";
import { useStore } from "vuex";

import VCasesList from "../lists/VCasesList";
import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";

export default {
  name: "VTableCard",

  components: { VCasesList, VIndicatorsTypesSelect },

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
}

.table-card {
    height: calc(100vh - 382px);  
}

.table-card.is-dialog {
    height: 75vh;   
}
</style>