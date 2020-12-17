<template>
  <Card>
    <template #content>
      <div class="global-cases-card">
        <div class="global-cases-card__title">{{tableTitle}}</div>
        <div class="global-cases-card__content">
          {{ $filters.numberFormat(globalCases) }}
        </div>
      </div>
      <Listbox
        class="countries-list"
        header="Cases by Country"
        v-model="selectedCountry"
        @change="handleChangeCountry"
        :options="countries"
        :filter="true"
        optionLabel="country"
        :listStyle="`height: ${height}`"
      >
        <template #option="slotProps">
          <div class="country-item">
            <span class="country-item__label">
              {{ slotProps.option.country }}
              <br>
              <span class="country-item__cases">
                ({{ $filters.numberFormat(slotProps.option.cases) }})
              </span>
            </span>
          </div>
        </template>
      </Listbox>
      <Dropdown v-model="selectedIndicator" :options="indicators" optionLabel="name" placeholder="Select an indicator" />
    </template>
  </Card>
</template>

<script>

import Listbox from "primevue/listbox";
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';

import { mapActions, mapGetters } from "vuex";

export default {
  name: "VCasesList",

  components: { Listbox, Card, Dropdown },

  props: ["countries", "height"],

   data() {
    return {
      selectedCountry: null,
      selectedIndicator: null,
      indicators: [
        {name: 'Deaths', code: 'deaths'},
        {name: 'Cases', code: 'cases'},
        {name: 'Recovered', code: 'recovered'},
      ]
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

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      currentCountry: "countries/currentCountry",
    }),

    tableTitle(){
      return this.currentCountry ? `Cases in ${this.currentCountry.country}` : 'Global cases';
    },

    globalCases() {
      return this.currentCountry?.cases || this.covidAll?.cases;
    },
  },

}
</script>

<style lang="scss" scoped>
  .global-cases-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90px;
    background: var(--surface-a);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    &__title {
      font-size: 20px;
      margin-bottom: 5px;
    }
    &__content {
      color: $primary-color;
      font-size: 32px;
    }
  }
</style>