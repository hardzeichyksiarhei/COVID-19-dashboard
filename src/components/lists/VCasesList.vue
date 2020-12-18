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
        <DataTable :value="tableData" :scrollable="true" scrollHeight="40vh">
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

import DataTable from 'primevue/datatable';
import Card from 'primevue/card';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';

import { mapGetters } from "vuex";

export default {
  name: "VCasesList",

  components: { Card, DataTable, Column, Dropdown },

  props: ["countries", "height"],

  data() {
    return {
      // selectedIndicator: null,
      selectedCountry: null,
    };
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

    tableData(){
      return this.currentCountry ? [this.currentCountry] : this.countries
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