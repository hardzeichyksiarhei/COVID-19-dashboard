<template>
  <div class="countries-search-list">
    <InputText
      v-model="search"
      :style="{ width: '100%' }"
      placeholder="Search..."
    />
    <img
      v-if="!isShowKeyboard"
      src="../../assets/keyboard.svg"
      @click="handleShowKeyboard(true)"
      alt="Keyboard"
    />
    <img
      v-if="isShowKeyboard"
      src="../../assets/keyboard-hide.svg"
      @click="handleShowKeyboard(false)"
      alt="Keyboard Hide"
    />
  </div>
  <div class="countries-list">
    <div
      class="country-item"
      :class="{
        active: currentCountry && country.id === currentCountry.id,
      }"
      v-for="country in filteredLocalCountries"
      :key="country.id"
      @click="handleSelectCountry(country)"
    >
      <img
        class="country-item__flag"
        :alt="country.name"
        :src="country.meta.flag"
      />
      <span class="country-item__label">
        {{ country.name }}
        <span :class="`country-item__number ${currentIndicator.color}-text`">
          ({{
            $filters.numberFormat(
              country[currentIndicatorType.key][currentIndicator.key]
            )
          }})
        </span>
      </span>
    </div>
    <span class="countries-list__empty" v-if="!filteredLocalCountries.length">
      No results found
    </span>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import InputText from "primevue/inputtext";

export default {
  name: "VCountriesList",

  components: { InputText },

  props: ["countries"],

  data() {
    return {
      search: "",
    };
  },

  mounted() {
    this.emitter.on("keyboard:change", (value) => (this.search = value));
  },

  computed: {
    ...mapGetters({
      isShowKeyboard: "app/isShowKeyboard",
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
    filteredLocalCountries() {
      return this.localCountries.filter(
        (country) =>
          country.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    },
  },

  methods: {
    ...mapActions({
      setShowKeyboard: "app/setShowKeyboard",
      setCurrentCountry: "countries/setCurrentCountry",
    }),

    handleSelectCountry(country) {
      if (!this.currentCountry) {
        this.setCurrentCountry(country);
      } else {
        this.setCurrentCountry(null);
      }
    },

    handleShowKeyboard(isShowKeyboard) {
      this.setShowKeyboard(isShowKeyboard);
    },
  },
};
</script>

<style lang="scss" scoped>
.countries-search-list {
  width: 100%;
  position: relative;
  display: flex;
  padding: 15px;
  input {
    padding-right: 3rem;
  }
  img {
    position: absolute;
    top: calc(50% - 12px);
    right: 1.5rem;
    opacity: 0.5;
    transition: 0.25s opacity ease;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
}
.countries-list {
  overflow: auto;
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

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

  &__empty {
    display: block;
    padding: 15px;
  }
}

.country-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: 0.25s all ease;
  &:hover,
  &.active {
    background-color: rgba($primary-color, 0.1);
  }
  &__flag {
    width: 36px;
    height: auto;
    margin-right: 10px;
  }
  &__label {
    font-size: 16px;
  }
  &__number {
    font-size: 14px;
    font-weight: bold;
  }
}
</style>