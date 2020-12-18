<template>
  <ul class="map-card-legend">
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
    <li class="map-card-legend-item">
      <span class="map-card-legend-item__color tests"></span>
      <span class="map-card-legend-item__text">Tests</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: "VMapLegend",
};
</script>

<style lang="scss" scoped>
.map-card-legend {
  display: flex;
  align-items: center;
  list-style-type: none;
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
    &.tests {
      background-color: rgba($tests-color, 0.35);
      border-color: $tests-color;
    }
  }
  &__text {
    font-size: 14px;
  }
}
</style>