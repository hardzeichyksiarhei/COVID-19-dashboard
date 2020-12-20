<template>
  <div class="chart-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>

    <div class="chart-card__indicator-select">
      <v-indicators-select width="100%" />
    </div>
    <div v-if="countries" class="chart-card__chart">
      <Chart type="bar" :data="basicData" :options="options" />
    </div>
  </div>
</template>

<script>
import { toRefs } from "vue";

import Chart from "primevue/chart";
import covidService from "../../services/covid.services";
import { mapGetters } from "vuex";
import VIndicatorsSelect from "../VIndicatorsSelect";

const LABELS_COLOR = {
  cases: "#C62828",
  deaths: "#EF6C00",
  recovered: "#2E7D32",
};

export default {
  name: "VChartCard",

  components: { VIndicatorsSelect, Chart },

  props: ["isDialog"],

  data() {
    return {
      LABELS_COLOR,
      countries: null,
      options: {
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
        },
      },
    };
  },

  setup(props, { emit }) {
    const { currentIndicator } = toRefs(props);
    let localCurrentIndicator = currentIndicator;

    const handleChangeIndicator = (indicator) => {
      localCurrentIndicator = indicator;
      emit("change:indicator", indicator);
    };

    return {
      localCurrentIndicator,
      handleChangeIndicator,
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
            backgroundColor: LABELS_COLOR[this.currentIndicator.color],
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

<style lang="scss" scoped>
.chart-card {
  margin-top: 1rem;
  height: calc(100vh - 615px);
  position: relative;
  background: var(--surface-a);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  &:hover {
    .maximize-btn {
      opacity: 1;
    }
  }

  &__indicator-select {
    padding: 1rem;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  &__chart {
    padding: 15px;
  }
}

.chart-card.is-dialog {
  height: 30vh;
}
</style>