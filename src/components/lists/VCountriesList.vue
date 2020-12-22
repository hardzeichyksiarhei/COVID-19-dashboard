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
      @click="isShowKeyboard = true"
      alt="Keyboard"
    />
    <img
      v-if="isShowKeyboard"
      src="../../assets/keyboard-hide.svg"
      @click="isShowKeyboard = false"
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

  <div class="simple-keyboard-wrapper" :class="{ show: isShowKeyboard }">
    <div class="simple-keyboard"></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";

import InputText from "primevue/inputtext";

export default {
  name: "VCountriesList",

  components: { InputText },

  props: ["countries"],

  data() {
    return {
      isShowKeyboard: false,
      search: "",
    };
  },

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
    filteredLocalCountries() {
      return this.localCountries.filter(
        (country) =>
          country.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
      );
    },
  },

  mounted() {
    const keyboard = new Keyboard({
      onChange: (input) => {
        this.search = input;
      },
      onKeyPress: (button) => onKeyPress(button),
      theme: "hg-theme-default hg-theme-dark",
    });

    function onKeyPress(button) {
      if (button === "{shift}" || button === "{lock}") handleShift();
    }

    function handleShift() {
      let currentLayout = keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      keyboard.setOptions({ layoutName: shiftToggle });
    }
  },

  methods: {
    ...mapActions({
      setCurrentCountry: "countries/setCurrentCountry",
    }),

    handleSelectCountry(country) {
      if (!this.currentCountry) {
        this.setCurrentCountry(country);
      } else {
        this.setCurrentCountry(null);
      }
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

.simple-keyboard-wrapper {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--surface-a);
  z-index: 1000;
  padding: 20px;
  border-top: 1px solid var(--surface-d);
  transform: translateY(100%);
  transition: 0.25s transform linear;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  &.show {
    transform: translateY(0);
  }
}

::v-deep .simple-keyboard {
  max-width: 850px;
  margin: 0 auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  &.hg-theme-dark {
    background-color: var(--surface-b);
    border-radius: 0;
    border-radius: 5px;

    .hg-button {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--surface-a);
      color: var(--text-color);
      box-shadow: 0 0 3px -1px rgba($primary-color, 0.3);
      border-bottom: 1px solid $primary-color;
    }

    .hg-button:active {
      background: $primary-color;
      color: white;
    }
  }
}
</style>