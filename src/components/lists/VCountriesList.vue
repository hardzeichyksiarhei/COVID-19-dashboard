<template>
  <Listbox
    class="countries-list"
    v-model="selectedCountry"
    @change="handleChangeCountry"
    :options="countries"
    :filter="true"
    optionLabel="country"
    :listStyle="`height: ${height}`"
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
            ({{ $filters.numberFormat(slotProps.option.cases) }})
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

  props: ["countries", "height"],

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

<style>
</style>