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
        v-model="zoom"
        v-model:zoom="zoom"
        :center="center"
        :min-zoom="2"
        :max-zoom="10"
        :max-bounds="maxBounds"
        :max-bounds-viscosity="1"
        :zoom-animation="true"
        @update:zoom="handleChangeZoom"
        @update:center="handleChangeCenter"
        @ready="handleReadyMap"
      >
        <l-tile-layer
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
          attribution="COVID-19"
        ></l-tile-layer>
        <l-control position="bottomleft">
          <div class="current-country-info">
            <v-current-country-info-card v-if="currentCountry" />
          </div>
        </l-control>

        <l-circle-marker
          v-for="(location, idx) in locations"
          :key="idx"
          :lat-lng="[location.meta.lat, location.meta.long]"
          :fillColor="FILL_COLOR[currentIndicator.color]"
          :fillOpacity="location.current ? 1 : 0.4"
          :fill="true"
          color="white"
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
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";

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

  setup() {
    const store = useStore();

    const map = ref(null);
    const zoom = ref(2);
    const center = ref([40, 0]);
    const maxBounds = ref([
      [-90, -180],
      [90, 180],
    ]);

    const countries = computed(() => store.getters["countries/countries"]);
    const currentCountry = computed(
      () => store.getters["countries/currentCountry"]
    );
    const currentIndicator = computed(
      () => store.getters["countries/currentIndicator"]
    );
    const currentIndicatorType = computed(
      () => store.getters["countries/currentIndicatorType"]
    );

    const locations = computed(() =>
      countries.value.map((country) => ({
        ...country,
        radius: scale(
          country[currentIndicatorType.value.key][currentIndicator.value.key]
        ),
        current: country.id === currentCountry.value?.id,
      }))
    );

    const setCurrentCountry = (country) =>
      store.dispatch("countries/setCurrentCountry", country);

    watch(currentCountry, (country) => {
      if (!country) return;
      map.value.flyTo([country.meta.lat, country.meta.long], zoom.value, {
        animate: false,
      });
    });

    const scale = (d) => {
      const min = 1;
      const factor = 6;
      const zoomFactor = zoom.value >= 6 ? 1 : zoom.value / 10;
      return Math.floor(Math.log(d) * factor * zoomFactor) + min;
    };

    const handleClickCircleMarker = (countryId) => {
      const country =
        countries.value.find((country) => country.id === countryId) || null;

      if (!currentCountry.value || currentCountry.value.id !== country.id) {
        setCurrentCountry(country);
      } else {
        setCurrentCountry(null);
      }
    };

    const handleReadyMap = (leafletObject) => {
      map.value = leafletObject;
    };

    const handleChangeZoom = (value) => {
      zoom.value = value;
    };

    const handleChangeCenter = (value) => {
      center.value = value;
    };

    return {
      FILL_COLOR,
      zoom,
      center,
      maxBounds,

      countries,
      currentCountry,
      currentIndicator,
      currentIndicatorType,

      locations,

      handleClickCircleMarker,
      handleReadyMap,
      handleChangeZoom,
      handleChangeCenter,
    };
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
  background: #222;
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