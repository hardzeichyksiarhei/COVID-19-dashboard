<template>
  <div class="coutries-card">
    <Listbox
      class="countries-list"
      v-model="selectedCountry"
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
          <span class="country-item__label">{{
            slotProps.option.country
          }}</span>
        </div>
      </template>
    </Listbox>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Listbox from "primevue/listbox";

export default {
  name: "VCountries",

  components: { Listbox },

  data() {
    return {
      selectedCountry: null,
    };
  },

  computed: {
    ...mapGetters({
      countries: "countries",
    }),
  },

  created() {
    this.fetchCountries();
  },

  methods: {
    ...mapActions({
      fetchCountries: "fetchCountries",
    }),
  },
};
</script>

<style lang="scss">
.countries-list {
  .p-listbox-list-wrapper {
    &::-webkit-scrollbar {
      width: 8px;
      margin: 0 10px;
    }
    &::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background: #bdbdbd;
      border-radius: 3px;
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
}
</style>