<template>
  <div class="map-card">
    <div class="map-card-header">
      <v-indicators-select
        :current-indicator="currentIndicator"
        @change:indicator="handleChangeIndicator"
      />
      <v-map-legend />
    </div>

    <div id="map">
      <l-map
        ref="map"
        v-model="zoom"
        v-model:zoom="zoom"
        :center="center"
        :minZoom="2"
        :maxZoom="10"
        :maxBounds="[
          [-90, -180],
          [90, 180],
        ]"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @ready="mapReady"
      >
        <l-tile-layer :url="tileLayerURL"></l-tile-layer>
        <l-circle-marker
          v-for="(location, idx) in locations"
          :key="idx"
          :lat-lng="[location.lat, location.long]"
          :fillColor="
            !location.current ? FILL_COLOR[currentIndicator] : 'purple'
          "
          :fillOpacity="!location.current ? 0.35 : 1"
          :fill="true"
          :color="location.current ? 'red' : 'transparent'"
          :stroke="location.current"
          :radius="location.radius"
          @click="handleClickCircleMarker(location.id)"
        >
          <l-tooltip :options="{ direction: 'top' }">
            <div class="map-country-tooltip">
              <h4 class="map-country-tooltip__title">
                {{ location.meta.country }}
              </h4>
              <div
                :class="`map-country-tooltip__info map-country-tooltip__info--${currentIndicator}`"
              >
                {{ $filters.capitalize(currentIndicator) }}:
                <span>{{
                  $filters.numberFormat(location.meta[currentIndicator])
                }}</span>
              </div>
            </div>
          </l-tooltip>
        </l-circle-marker>
      </l-map>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import {
  LMap,
  LTileLayer,
  LCircleMarker,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import VIndicatorsSelect from "./VIndicatorsSelect";
import VMapLegend from "./VMapLegend.vue";

const FILL_COLOR = {
  cases: "var(--cases-color)",
  deaths: "var(--deaths-color)",
  recovered: "var(--recovered-color)",
  tests: "var(--tests-color)",
};

export default {
  name: "VMap",

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
    VIndicatorsSelect,
    VMapLegend,
  },

  data() {
    return {
      FILL_COLOR,
      currentIndicator: "cases",

      tileLayerURL:
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      zoom: 3,
      center: [55, 25],
    };
  },

  computed: {
    ...mapGetters({
      countries: "countries/countries",
      currentCountry: "countries/currentCountry",
    }),

    locations() {
      const locations = this.countries.map(({ countryInfo, ...country }) => ({
        id: countryInfo._id,

        meta: {
          country: country.country,
          cases: country.cases,
          deaths: country.deaths,
          recovered: country.recovered,
          tests: country.tests,
        },

        lat: Number(countryInfo.lat),
        long: Number(countryInfo.long),
        radius: this.scale(country[this.currentIndicator]),
        current: countryInfo._id === this.currentCountry?.countryInfo._id,
      }));
      return locations;
    },
  },

  watch: {
    currentCountry(country) {
      if (!country) return;

      const {
        countryInfo: { lat, long },
      } = country;
      this.flyTo(lat, long);
    },
  },

  methods: {
    ...mapActions({
      setCurrentCountry: "countries/setCurrentCountry",
    }),

    handleChangeIndicator(indicator) {
      this.currentIndicator = indicator;
    },

    handleClickCircleMarker(countryId) {
      const country =
        this.countries.find(
          (country) => country.countryInfo._id === countryId
        ) || null;

      this.setCurrentCountry(country);
    },

    mapReady() {
      this.setUserLocation();
    },

    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    flyTo(lat, lon) {
      this.$refs.map.leafletObject.flyTo([lat, lon], this.zoom, {
        animate: false,
      });
    },
    scale(d) {
      const min = 1;
      const factor = 5;
      const zoomFactor = this.zoom >= 5 ? 1 : this.zoom / 10; // adjust divisor for best optics
      return Math.floor(Math.log(d) * factor * zoomFactor) + min;
    },
    setUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          this.flyTo(coords.latitude, coords.longitude);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.map-card {
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  overflow: hidden;
}

.map-card-header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
}

#map {
  width: 100%;
  height: calc(100vh - 152px);
}

::v-deep .leaflet-top,
::v-deep .leaflet-bottom {
  z-index: 100;
}

::v-deep .leaflet-tooltip {
  min-width: 160px;
  background-color: var(--surface-a);
  color: #fff;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  &:before {
    display: none;
  }
}

.map-country-tooltip {
  &__title {
    font-size: 20px;
    margin: 0;
    margin-bottom: 10px;
    font-weight: 500;
  }
  &__info {
    font-size: 16px;
    span {
      font-weight: bold;
    }
    &--cases {
      span {
        color: $cases-color;
      }
    }
    &--deaths {
      span {
        color: $deaths-color;
      }
    }
    &--recovered {
      span {
        color: $recovered-color;
      }
    }
    &--tests {
      span {
        color: $tests-color;
      }
    }
  }
}
</style>