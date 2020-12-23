<template>
  <DataTable
    class="countries-table"
    :value="tableCountry"
    :scrollable="true"
    scrollHeight="flex"
  >
    <Column
      field="name"
      header="Country"
      bodyClass="countries-table__content country"
      sortable="true"
    ></Column>
    <Column
      :field="`${this.currentIndicatorType.key}.cases`"
      header="Cases"
      bodyClass="countries-table__content cases-text"
      sortable="true"
    ></Column>
    <Column
      :field="`${this.currentIndicatorType.key}.deaths`"
      header="Deaths"
      bodyClass="countries-table__content deaths-text"
      sortable="true"
    ></Column>
    <Column
      :field="`${this.currentIndicatorType.key}.recovered`"
      header="Recovered"
      bodyClass="countries-table__content recovered-text"
      sortable="true"
    ></Column>
  </DataTable>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { mapGetters } from "vuex";

export default {
  name: "VCountriesTable",

  components: { DataTable, Column },

  props: ["countries"],

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

<style lang="scss" >
.p-datatable-scrollable-body {
  overflow-y: auto !important;
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
// .p-column-title{
//   font-size: 0.5rem;
// }
// .pi{
//   font-size: 0.4rem !important;
// }
.countries-table {
  &.is-dialog {
    height: 80vh;
  }
  &__content {
    &.country {
      color: white;
    }
  }
}
</style>