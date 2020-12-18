<template>
  <div class="map-card">
    <div class="map-card-header">
      <div class="map-card-selects">
        <v-indicators-types-select width="100%" />
        <v-indicators-select width="100%" />
      </div>
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
          :lat-lng="[location.meta.lat, location.meta.long]"
          :fillColor="
            !location.current ? FILL_COLOR[currentIndicator.color] : 'purple'
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
              <h4 class="map-country-tooltip__title">{{ location.name }}</h4>
              <div
                :class="`map-country-tooltip__info map-country-tooltip__info--${currentIndicator.color}`"
              >
                {{ currentIndicator.label }}:
                <span>{{
                  $filters.numberFormat(
                    location[currentIndicatorType.key][currentIndicator.key]
                  )
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

import VIndicatorsSelect from "../VIndicatorsSelect";
import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";
import VMapLegend from "../VMapLegend.vue";

const FILL_COLOR = {
  cases: "var(--cases-color)",
  deaths: "var(--deaths-color)",
  recovered: "var(--recovered-color)",
};

export default {
  name: "VMapCard",

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
    VIndicatorsSelect,
    VIndicatorsTypesSelect,
    VMapLegend,
  },

  data() {
    return {
      FILL_COLOR,

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
      currentIndicator: "countries/currentIndicator",
      currentIndicatorType: "countries/currentIndicatorType",
    }),

    locations() {
      return this.countries.map((country) => ({
        ...country,
        radius: this.scale(
          country[this.currentIndicatorType.key][this.currentIndicator.key]
        ),
        current: country.id === this.currentCountry?.id,
      }));
    },
  },

  watch: {
    currentCountry(country) {
      if (!country) return;

      const {
        meta: { lat, long },
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

.map-card-selects {
  display: grid;
  grid-template-columns: 200px 200px;
  gap: 10px;
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