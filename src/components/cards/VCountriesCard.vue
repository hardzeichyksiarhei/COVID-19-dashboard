<template>
  <div class="coutries-card">
    <Listbox
      class="countries-list"
      v-model="selectedCountry"
      @change="handleChangeCountry"
      :options="countries"
      :filter="true"
      optionLabel="country"
      listStyle="height: 70vh"
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
            <span class="country-item__cases">
              ({{ slotProps.option.cases }})
            </span>
          </span>
        </div>
      </template>
    </Listbox>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Listbox from "primevue/listbox";

export default {
  name: "VCountriesCard",

  components: { Listbox },

  data() {
    return {
      selectedCountry: null,
    };
  },

  computed: {
    ...mapGetters({
      countries: "countries/countries",
      currentCountry: "countries/currentCountry",
    }),
  },

  created() {
    this.fetchCountries();
  },

  methods: {
    ...mapActions({
      fetchCountries: "countries/fetchCountries",
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