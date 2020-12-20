<template>
  <div v-if="countries">
    <Chart type="bar" :data="basicData" />
  </div>
</template>


<script>
import Chart from "primevue/chart";
import covidService from "../../services/covid.services";
import { mapGetters } from "vuex";
// import VIndicatorsTypesSelect from "../cards/VIndicators"

export default {
  name: "VChart",
  components: { Chart },
  data() {
    return {
      countries: null,
    };
  },
  computed: {
    ...mapGetters({
      currentIndicator: "countries/currentIndicator",
    }),
    basicData() {
      return {
        labels: Object.keys(this.countries[this.currentIndicator.key]),
        datasets: [
          {
            label: this.currentIndicator.label,
            backgroundColor: "#42A5F5",
            data: Object.values(this.countries[this.currentIndicator.key]),
          },
        ],
      };
    },
  },
  async created() {
    this.countries = await covidService.getHistoricalAll();

    console.log(this.countries);
  },
};
</script>