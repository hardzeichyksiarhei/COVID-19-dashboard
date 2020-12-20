<template>
  <div v-if="countries">
    <v-indicators-select width="100%" />
    <Chart type="bar" :data="basicData" />
  </div>
</template>


<script>
import Chart from "primevue/chart";
import covidService from "../../services/covid.services";
import { mapGetters, mapActions } from "vuex";
import VIndicatorsSelect from "../VIndicatorsSelect";

export default {
  name: "VChart",
  components: { Chart, VIndicatorsSelect },
  data() {
    return {
      countries: null,

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
      currentIndicator: "countries/currentIndicator",
    }),
    currentColor(){
        if(this.currentIndicator.key === 'cases'){
            return "#C62828"
        } else if(this.currentIndicator.key === 'deaths'){
            return "#EF6C00"
        }
        return "#2E7D32"
    },
    basicData() {
      return {
        labels: Object.keys(this.countries[this.currentIndicator.key]),
        datasets: [
          {
            label: this.currentIndicator.label,
            backgroundColor: this.currentColor,
            data: Object.values(this.countries[this.currentIndicator.key]),
          },
        ],
      };
    },
  },
  async created() {
    this.countries = await covidService.getHistoricalAll();
  },
};
</script>
