<template>
  <div id="app" class="app">
    <div class="app-toolbar">COVID-19 Dashboard</div>

    <div class="app-content">
      <router-view />
    </div>
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
