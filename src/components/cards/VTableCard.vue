<template>
  <div class="table-card">
    <button class="maximize-btn" @click="isMaximize = true">
      <i class="pi pi-window-maximize"></i>
    </button>
    <v-cases-list :countries="countries" />
  </div>
  <Dialog
    class="p-dialog-maximized"
    header="Cases by Country"
    v-model:visible="isMaximize"
  >
    <v-cases-list :is-dialog="isMaximize" :countries="countries" />
  </Dialog>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";

import Dialog from "primevue/dialog";

import VCasesList from "../lists/VCasesList";

export default {
  name: "VTableCard",

  components: { Dialog, VCasesList },

  setup() {
    const store = useStore();

    const isMaximize = ref(false);

    const countries = computed(() => store.getters["countries/countries"]);

    return { isMaximize, countries };
  },
};
</script>

<style lang="scss">
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

.countries-list {
  .p-listbox-list-wrapper {
    &::-webkit-scrollbar {
      width: 6px;
      // margin: 0 10px;
    }
    &::-webkit-scrollbar-track {
      background: var(--surface-d);
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
      border-radius: 4px;
    }

    .p-listbox-list {
      .p-listbox-item {
        &.p-highlight {
          color: var(--primary-color);
          background: rgba($primary-color, 0.05);
        }
      }
    }
  }
}

.country-item {
  display: flex;
  align-items: center;
  &__flag {
    width: 36px;
    height: auto;
    margin-right: 10px;
  }
  &__cases {
    color: $primary-color;
    font-size: 14px;
    font-weight: bold;
  }
}

</style>