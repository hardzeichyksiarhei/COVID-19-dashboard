<template>
  <div id="map">
    <l-map
      ref="map"
      v-model="zoom"
      v-model:zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @ready="mapReady"
    >
      <l-tile-layer :url="tileLayerURL"></l-tile-layer>
      <l-circle-marker
        v-for="(location, idx) in locations"
        :key="idx"
        :lat-lng="[location.lat, location.long]"
        :fillColor="!location.current ? 'red' : 'purple'"
        :fillOpacity="!location.current ? 0.35 : 1"
        :fill="true"
        :color="location.current ? 'red' : 'transparent'"
        :stroke="location.current"
        :radius="location.radius"
      >
        <l-popup>Hello!</l-popup></l-circle-marker
      >
    </l-map>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import {
  LMap,
  LTileLayer,
  LCircleMarker,
  LPopup,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "VMap",

  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LPopup,
  },

  data() {
    return {
      map: null,

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
      const locations = this.countries.map(
        ({ countryInfo: { _id: id, lat, long }, cases }) => ({
          id,
          lat: Number(lat),
          long: Number(long),
          radius: this.scale(cases),
          current: id === this.currentCountry?.countryInfo._id,
        })
      );
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
#map {
  width: 100%;
  height: 90vh;
}
</style>