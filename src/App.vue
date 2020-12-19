<template>
  <div id="app" class="app">
    <div class="app-toolbar">
      <div class="app-toolbar__logo">COVID-19 Dashboard</div>
      <div class="app-toolbar__updated" v-if="covidAll">
        <span>Last Updated At:</span>
        {{ $filters.dateFormat(covidAll.updated) }}
      </div>
    </div>

    <div class="app-content">
      <router-view />
    </div>

    <div class="app-footer">COVID-19 Footer</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",

  created() {
    this.$store.dispatch("app/fetchCovidAll");
  },

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
    }),
  },
};
</script>
