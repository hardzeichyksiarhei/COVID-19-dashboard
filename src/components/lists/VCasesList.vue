<template>
  <Card>
    <template #content>
      <Dropdown v-model="indicator" @change="handleChangeIndicator" :options="indicators" optionLabel="label" placeholder="Select an indicator" />
      <div class="global-cases-card">
        <div class="global-cases-card__title">{{tableTitle}}</div>
        <div class="global-cases-card__content">
          {{ $filters.numberFormat(globalIndicator) }}
        </div>
      </div>
      <div class="card">
        <DataTable :value="tableCountry" :scrollable="true" scrollHeight="40vh">
            <Column field="country" header="Country"></Column>
            <Column :field="tableIndicator" :header="tableTitle" :color="tableIndicator.color"></Column>
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

import { mapGetters, mapActions } from "vuex";

export default {
  name: "VCasesList",

  components: { Card, DataTable, Column, Dropdown },

  props: ["countries", "height"],

  data() {
    return {
      indicator: this.currentIndicator,
    };
  },

  methods:{
    ...mapActions({
      setCurrentIndicator: "countries/setCurrentIndicator",
    }),

    handleChangeIndicator({ value }) {
      this.setCurrentIndicator(value);
    },
  },

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      currentCountry: "countries/currentCountry",
      currentIndicator: "countries/currentIndicator",
      indicators: "countries/indicators",
    }),

    tableTitle(){
      return this.currentIndicator.label;
    },

    tableCountry(){
      return this.currentCountry ? [this.currentCountry] : this.countries;
    },

    tableIndicator(){
      return this.currentIndicator.key;
    },

    globalIndicator() {
        return this.currentCountry?.[this.currentIndicator.key] || this.covidAll?.[this.currentIndicator.key]
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