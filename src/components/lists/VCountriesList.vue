<template>
  <Listbox
    class="countries-list"
    v-model="selectedCountry"
    :options="localCountries"
    :filter="true"
    optionLabel="name"
  >
    <template #option="slotProps">
      <div class="country-item">
        <img
          class="country-item__flag"
          :alt="slotProps.option.name"
          :src="slotProps.option.meta.flag"
        />
        <span class="country-item__label">
          {{ slotProps.option.name }}
          <span :class="`country-item__number ${currentIndicator.color}`">
            ({{
              $filters.numberFormat(
                slotProps.option[currentIndicatorType.key][currentIndicator.key]
              )
            }})
          </span>
        </span>
      </div>
    </template>
  </Listbox>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Listbox from "primevue/listbox";

export default {
  name: "VCountriesList",

  components: { Listbox },

  props: ["countries"],

  computed: {
    ...mapGetters({
      currentCountry: "countries/currentCountry",
      currentIndicator: "countries/currentIndicator",
      currentIndicatorType: "countries/currentIndicatorType",
    }),
    localCountries() {
      const countries = [...this.countries];
      countries.sort(
        (a, b) =>
          b[this.currentIndicatorType.key][this.currentIndicator.key] -
          a[this.currentIndicatorType.key][this.currentIndicator.key]
      );
      return countries;
    },
    selectedCountry: {
      get() {
        return this.currentCountry;
      },
      set(country) {
        this.setCurrentCountry(country);
      },
    },
  },

  methods: {
    ...mapActions({
      setCurrentCountry: "countries/setCurrentCountry",
    }),
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
      .p-listbox-item {
        &.p-highlight {
          color: var(--primary-color);
          background: rgba($primary-color, 0.2);
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
  &__label {
    font-size: 16px;
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