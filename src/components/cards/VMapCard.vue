<template>
  <div class="map-card" :class="{ 'is-dialog': isDialog }">
    <button v-if="!isDialog" class="maximize-btn" @click="$emit('dialog:show')">
      <i class="pi pi-window-maximize"></i>
    </button>

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
        :zoomAnimation="true"
        @update:zoom="zoomUpdated"
        @update:center="centerUpdated"
        @ready="handleReadyMap"
      >
        <l-tile-layer :url="tileLayerURL"></l-tile-layer>
        <l-control position="bottomleft">
          <div class="current-country-info">
            <v-current-country-info-card v-if="currentCountry" />
          </div>
        </l-control>

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
              <div class="map-country-tooltip__info">
                {{ currentIndicator.label }}:
                <span :class="`${currentIndicator.color}-text`">{{
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
  LControl,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

import VIndicatorsSelect from "../VIndicatorsSelect";
import VIndicatorsTypesSelect from "../VIndicatorsTypesSelect";
import VMapLegend from "../VMapLegend.vue";
import VCurrentCountryInfoCard from "./VCurrentCountryInfoCard";

const FILL_COLOR = {
  cases: "var(--cases-color)",
  deaths: "var(--deaths-color)",
  recovered: "var(--recovered-color)",
};

export default {
  name: "VMapCard",

  props: ["isDialog"],

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
    LControl,
    VIndicatorsSelect,
    VIndicatorsTypesSelect,
    VMapLegend,
    VCurrentCountryInfoCard,
  },

  data() {
    return {
      FILL_COLOR,

      tileLayerURL:
        "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png",
      zoom: 2,
      center: [40, 10],
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
        this.countries.find((country) => country.id === countryId) || null;

      if (!this.currentCountry || this.currentCountry.id !== country.id) {
        this.setCurrentCountry(country);
      } else {
        this.setCurrentCountry(null);
      }
    },

    handleReadyMap() {
      // this.setUserLocation();
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
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  height: calc(100vh - 150px);
  &:hover {
    .maximize-btn {
      opacity: 1;
    }
  }
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
  grid-template-columns: 180px 180px;
  gap: 10px;
}

#map {
  width: 100%;
  flex-grow: 1;
}

.map-card.is-dialog #map {
  height: 80vh;
}

::v-deep .leaflet-container {
  background: var(--surface-b);
}

::v-deep .leaflet-top,
::v-deep .leaflet-bottom {
  z-index: 999;
}

::v-deep .leaflet-tooltip {
  min-width: 160px;
  background-color: #222;
  color: #fff;
  border-radius: 0;
  border: 1px solid rgba(255, 255, 255, 0.3);
  &:before {
    display: none;
  }
}

.map-country-tooltip {
  &__title {
    margin: 0;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 400;
  }
  &__info {
    font-size: 14px;
    span {
      font-weight: bold;
    }
  }
}
</style>