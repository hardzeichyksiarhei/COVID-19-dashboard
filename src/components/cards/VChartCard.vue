<template>
  <div class="chart-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>

    <div class="chart-card__indicator-select">
      <v-indicators-select
        width="100%"
        @change:indicator="handleChangeIndicator"
      />
    </div>
    <div v-if="historicalAll" class="chart-card__chart">
      <Chart type="bar" :data="basicData" :options="options" />
    </div>
  </div>
</template>

<script>
import Chart from "primevue/chart";
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

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      historicalAll: "app/historicalAll",
      currentIndicator: "countries/currentIndicator",
    }),
    basicData() {
      return {
        labels: Object.keys(
          this.historicalAll["all"][this.currentIndicator.key]
        ),
        datasets: [
          {
            label: this.currentIndicator.label,
            backgroundColor: LABELS_COLOR[this.currentIndicator.color],
            data: Object.values(
              this.historicalAll["all"][this.currentIndicator.key]
            ),
          },
        ],
      };
    },
  },

  methods: {
    handleChangeIndicator(indicator) {
      console.log(indicator);
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-card {
  margin-top: 1rem;
  height: calc(100vh - 421px - 120px - 45px);
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