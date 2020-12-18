<template>
  <Card>
    <template #content>
      <div class="global-cases-card">
        <div class="global-cases-card__title">Global cases</div>
        <div class="global-cases-card__content">
          {{ $filters.numberFormat(globalCases) }}
        </div>
      </div>
      <div class="card">
        <DataTable :value="countries" :scrollable="true" scrollHeight="40vh">
            <Column field="country" header="Country"></Column>
            <Column field="cases" header="Cases"></Column>
            <Column field="deaths" header="Deaths"></Column>
            <Column field="recovered" header="Recovered"></Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script>

// import Listbox from "primevue/listbox";
import DataTable from 'primevue/datatable';
import Card from 'primevue/card';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup'; 
// import Dropdown from 'primevue/dropdown';

import { mapActions, mapGetters } from "vuex";

export default {
  name: "VCasesList",

  components: { Card, DataTable, Column },

  props: ["countries", "height"],

   data() {
    return {
      // allcountries: null,
      selectedCountry: null,
      // selectedIndicator: null,
      // indicators: [
      //   {name: 'Deaths', code: 'deaths'},
      //   {name: 'Cases', code: 'cases'},
      //   {name: 'Recovered', code: 'recovered'},
      // ]
    };
  },


  methods: {
    ...mapActions({
      setCurrentIndicator: "countries/setCurrentIndicator",
    }),

    handleChangeIndicator({ value }) {
      this.setCurrentIndicator(value.code);
    },
  },

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      currentCountry: "countries/currentCountry",
      currentIndicator: "countries/currentIndicator"
    }),

    tableTitle(){
      return this.currentCountry ? `${this.currentIndicator[0].toUpperCase() + this.currentIndicator.slice(1)} in ${this.currentCountry.country}` : `Global ${this.currentIndicator}`;
    },

    globalCases() {
      if(this.currentIndicator){
        return this.currentCountry?.[this.currentIndicator] || this.covidAll?.[this.currentIndicator]
      }
      return this.currentCountry?.cases || this.covidAll?.cases
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