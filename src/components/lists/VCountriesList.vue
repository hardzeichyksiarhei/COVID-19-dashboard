<template>
  <Listbox
    class="countries-list"
    v-model="selectedCountry"
    @change="handleChangeCountry"
    :options="countries"
    :filter="true"
    optionLabel="country"
  >
    <template #option="slotProps">
      <div class="country-item">
        <img
          class="country-item__flag"
          :alt="slotProps.option.country"
          :src="slotProps.option.countryInfo.flag"
        />
        <span class="country-item__label">
          {{ slotProps.option.country }}
          <span :class="`country-item__number ${currentIndicator}`">
            ({{ $filters.numberFormat(slotProps.option[currentIndicator]) }})
          </span>
        </span>
      </div>
    </template>
  </Listbox>
</template>

<script>
import { mapActions } from "vuex";

import Listbox from "primevue/listbox";

export default {
  name: "VCountriesList",

  components: { Listbox },

  props: ["countries", "currentIndicator"],

  data() {
    return {
      selectedCountry: null,
    };
  },

  methods: {
    ...mapActions({
      setCurrentCountry: "countries/setCurrentCountry",
    }),

    handleChangeCountry({ value }) {
      this.setCurrentCountry(value);
    },
  },
};
</script>

<style lang="scss">
.countries-list {
  .p-listbox-list-wrapper {
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

    .p-listbox-list {
      height: calc(65vh + 10px);
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
  &__number {
    color: $primary-color;
    font-size: 14px;
    font-weight: bold;
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