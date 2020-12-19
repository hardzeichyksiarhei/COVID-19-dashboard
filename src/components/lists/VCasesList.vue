<template>
  <Card>
    <template #content>
      <v-indicators-types-select width="100%" />
      <div class="indicators-table-card">
        <DataTable :value="tableCountry" :scrollable="true" :scrollHeight="height">
          <Column 
            field="name" 
            header="Country"  
            bodyClass="indicators-table-card__content country"
          ></Column>
          <Column
            :field="`${this.currentIndicatorType.key}.cases`"
            header="Cases"
            bodyClass="indicators-table-card__content cases"
          ></Column>
          <Column
            :field="`${this.currentIndicatorType.key}.deaths`"
            header="Deaths"
            bodyClass="indicators-table-card__content deaths"
          ></Column>
          <Column
            :field="`${this.currentIndicatorType.key}.recovered`"
            header="Recovered"
            bodyClass="indicators-table-card__content recovered"
          ></Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script>
import DataTable from "primevue/datatable";
import Card from "primevue/card";
import Column from "primevue/column";
import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "VCasesList",

  components: { Card, DataTable, Column, VIndicatorsTypesSelect },

  props: ["countries", "height"],

  data() {
    return {
      indicatorType: this.currentIndicatorType,
    };
  },

  methods: {
    ...mapActions({
      setCurrentIndicatorType: "countries/setCurrentIndicatorType",
    }),

    handleChangeIndicatorType({ value }) {
      this.setCurrentIndicatorType(value);
    },
  },

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      currentCountry: "countries/currentCountry",
      currentIndicatorType: "countries/currentIndicatorType",
      indicators: "countries/indicators",
    }),

    tableCountry() {
      return this.currentCountry ? [this.currentCountry] : this.countries;
    },
  },
};
</script>

<style lang="scss">
.p-datatable-scrollable-body {
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
.indicators-table-card {
  &__content {
    color: $primary-color;
    font-size: 14px;
    font-weight: 600;
    &.country{
      color: white;
    }
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