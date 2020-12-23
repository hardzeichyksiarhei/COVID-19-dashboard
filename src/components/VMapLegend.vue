<template>
  <ul class="map-card-legend" :class="position">
    <li class="map-card-legend-item">
      <span class="map-card-legend-item__color cases"></span>
      <span class="map-card-legend-item__text">Cases</span>
    </li>
    <li class="map-card-legend-item">
      <span class="map-card-legend-item__color deaths"></span>
      <span class="map-card-legend-item__text">Deaths</span>
    </li>
    <li class="map-card-legend-item">
      <span class="map-card-legend-item__color recovered"></span>
      <span class="map-card-legend-item__text">Recovered</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "VMapLegend",

  props: ["position"],
};
</script>

<style lang="scss" scoped>
.map-card-legend {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style-type: none;
  padding: 0;
  margin: 0;

  &.inside-map {
    background-color: var(--surface-b);
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    .map-card-legend-item {
      margin: 0;
      margin-bottom: 10px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
}

.map-card-legend-item {
  display: flex;
  align-items: center;
  margin-left: 20px;
  &__color {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 10px;
    border: 2px solid transparent;
    &.cases {
      background-color: rgba($cases-color, 0.35);
      border-color: $cases-color;
    }
    &.deaths {
      background-color: rgba($deaths-color, 0.35);
      border-color: $deaths-color;
    }
    &.recovered {
      background-color: rgba($recovered-color, 0.35);
      border-color: $recovered-color;
    }
  }
  &__text {
    font-size: 14px;
  }
}

@media screen and (max-width: 1366px) {
  .map-card-legend.outside-map {
    display: none;
  }
}

@media screen and (max-width: 991px) {
  .map-card-legend.outside-map {
    display: flex;
  }
}

@media screen and (max-width: 576px) {
  .map-card-legend.outside-map {
    display: none;
  }
}
</style>