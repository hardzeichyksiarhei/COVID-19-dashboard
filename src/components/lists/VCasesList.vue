<template>
  <Card>
    <template #content>
      <v-indicators-select width="100%" />
      <div class="global-cases-card">
        <div class="global-cases-card__title">
          {{
            currentCountry
              ? `${currentIndicator.label} by: ${currentCountry.country}`
              : `Global ${currentIndicator.label}`
          }}
        </div>
        <div :class="`global-cases-card__content ${currentIndicator.color}`">
          {{ $filters.numberFormat(globalIndicator) }}
        </div>
      </div>
      <div class="indicators-table-card">
        <DataTable :value="tableCountry" :scrollable="true" scrollHeight="40vh">
            <Column field="country" header="Country"></Column>
            <Column :field="tableIndicator" :header="tableTitle" :bodyClass="`indicators-table-card__content ${currentIndicator.color}`"></Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script>

import DataTable from 'primevue/datatable';
import Card from 'primevue/card';
import Column from 'primevue/column';
// import Dropdown from 'primevue/dropdown';
import VIndicatorsSelect from "../VIndicatorsSelect.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "VCasesList",

  components: { Card, DataTable, Column, VIndicatorsSelect },

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

<style lang="scss">
  .p-datatable-scrollable-body{
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
  }
  .indicators-table-card{
    &__content {
        color: $primary-color;
        font-weight: 600;
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

  .global-cases-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90px;
    background: var(--surface-a);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    margin-top: 16px;
    &__title {
      font-size: 20px;
      margin-bottom: 5px;
    }
    &__content {
      color: $primary-color;
      font-size: 32px;
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