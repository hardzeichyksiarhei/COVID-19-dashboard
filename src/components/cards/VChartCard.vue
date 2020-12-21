<template>
  <div class="chart-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>

    <div class="chart-card__indicator-select">
      <v-indicators-types-select width="100%" />

      <span class="p-input-icon-right">
        <i class="pi pi-arrow-right pointer" @click="handleChangeDays" />
        <InputText
          :style="{ width: '100%' }"
          v-model="days"
          @keydown.enter="handleChangeDays"
          :min="5"
          placeholder="Number of last days"
        />
      </span>
    </div>
    <div v-if="historicalAll" class="chart-card__chart">
      <Chart :type="type" :data="basicData" :options="options" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Chart from "primevue/chart";
import InputText from "primevue/inputtext";

import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";

import covidService from "../../services/covid.services";
import { numeralFormat, dateFormat } from "../../services/formats.services";

const LABELS_COLOR = {
  cases: "#C62828",
  deaths: "#EF6C00",
  recovered: "#2E7D32",
};

export default {
  name: "VChartCard",

  components: { InputText, Chart, VIndicatorsTypesSelect },

  props: ["isDialog"],

  data() {
    return {
      LABELS_COLOR,

      historicalCountry: null,

      currentDate: new Date(),
      days: null,
    };
  },

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      historicalAll: "app/historicalAll",
      currentCountry: "countries/currentCountry",
      currentIndicator: "countries/currentIndicator",
      currentIndicatorType: "countries/currentIndicatorType",
    }),
    type() {
      const indicatorType = this.currentIndicatorType;

      if (["all", "all100"].includes(indicatorType.key)) {
        return "line";
      }

      return "bar";
    },
    options() {
      return {
        tooltips: {
          mode: "index",
          intersect: false,
        },
        responsive: true,
        scales: {
          xAxes: [{}],
          yAxes: [
            {
              ticks: {
                callback: (label) => numeralFormat(label, "0 a").toUpperCase(),
              },
            },
          ],
        },
      };
    },
    basicData() {
      const indicatorType = this.currentIndicatorType;

      if (
        !this.currentCountry &&
        ["all", "all100"].includes(indicatorType.key)
      ) {
        return {
          labels: Object.keys(
            this.historicalAll[indicatorType.key][this.currentIndicator.key]
          ),
          datasets: this.getAllDataset(this.historicalAll[indicatorType.key]),
        };
      }

      if (
        !this.currentCountry &&
        ["today", "today100"].includes(indicatorType.key)
      ) {
        return {
          labels: [dateFormat(new Date())],
          datasets: this.getTodayDataset(this.covidAll[indicatorType.key]),
        };
      }

      if (
        this.historicalCountry &&
        ["all", "all100"].includes(indicatorType.key)
      ) {
        return {
          labels: Object.keys(
            this.historicalCountry[indicatorType.key][this.currentIndicator.key]
          ),
          datasets: this.getAllDataset(
            this.historicalCountry[indicatorType.key]
          ),
        };
      }

      if (
        this.currentCountry &&
        ["today", "today100"].includes(indicatorType.key)
      ) {
        return {
          labels: [dateFormat(new Date())],
          datasets: this.getTodayDataset(
            this.currentCountry[indicatorType.key]
          ),
        };
      }

      return null;
    },
  },

  watch: {
    async currentCountry(country) {
      if (!country) {
        this.historicalCountry = null;
        return;
      }
      const historicalCountry = await covidService.getHistoricalCountry(
        country.id,
        this.days || 30,
        this.covidAll.population
      );

      this.historicalCountry = historicalCountry;
    },
  },

  methods: {
    handleChangeDays() {
      if (!this.days || this.days < 5 || this.days > 100) {
        this.$toast.add({
          severity: "warn",
          summary: "Warning",
          detail: !this.days
            ? "Number of last days empty"
            : "The number of the last days must be in the range [5, 100]",
          life: 3000,
        });
        return;
      }
      this.$store.dispatch("app/fetchHistoricalAll", this.days);
    },
    getTodayDataset(data) {
      return [
        {
          label: "Cases",
          backgroundColor: LABELS_COLOR["cases"],
          data: [data["cases"]],
        },
        {
          label: "Deaths",
          backgroundColor: LABELS_COLOR["deaths"],
          data: [data["deaths"]],
        },
        {
          label: "Recovered",
          backgroundColor: LABELS_COLOR["recovered"],
          data: [data["recovered"]],
        },
      ];
    },
    getAllDataset(data) {
      return [
        {
          label: "Cases",
          borderColor: LABELS_COLOR["cases"],
          fill: false,
          data: Object.values(data["cases"]),
        },
        {
          label: "Deaths",
          borderColor: LABELS_COLOR["deaths"],
          fill: false,
          data: Object.values(data["deaths"]),
        },
        {
          label: "Recovered",
          borderColor: LABELS_COLOR["recovered"],
          fill: false,
          data: Object.values(data["recovered"]),
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.chart-card {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  height: calc(45vh - 85px);
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 1rem;
    padding-top: 13px;
    padding-bottom: 0;
  }

  &__chart {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding: 15px;
  }
}

.chart-card.is-dialog {
  height: 80vh;
  .chart-card__chart {
    width: 70%;
    margin: 0 auto;
  }
}

@media screen and (max-width: 1366px) {
  .chart-card {
    margin-top: 0;
    height: 50vh;
  }
}

@media screen and (max-width: 991px) {
  .chart-card {
    height: auto;
  }
}
</style>