<template>
  <transition name="fade">
    <div class="app-loading" v-if="isCountriesLoading">
      <span>Loading...</span>
    </div>
  </transition>
  <div id="app" class="app">
    <div class="app-toolbar">
      <div class="app-toolbar__logo"><b>COVID-19</b> Dashboard</div>
      <div class="app-toolbar__updated" v-if="covidAll">
        <span>Last Updated At:</span>
        {{ $filters.dateFormat(covidAll.updated) }}
      </div>
    </div>

    <div class="app-content">
      <router-view />
    </div>

    <div class="app-footer">
      <div class="app-footer__copyright">
        © {{ new Date().getFullYear() }} Developed by
        <a href="https://github.com/hardzeichyksiarhei" target="_blank">
          hardz
        </a>
        and
        <a href="https://github.com/nastyaklezovich" target="_blank"
          >nastyaklezovich</a
        >
        for
        <a href="https://rs.school/" target="_blank">RS School</a>
      </div>
    </div>
  </div>

  <v-keyboard />

  <Toast />
</template>

<script>
import { mapGetters } from "vuex";

import Toast from "primevue/toast";
import VKeyboard from "./components/VKeyboard";

export default {
  name: "App",

  components: { Toast, VKeyboard },

  created() {
    this.$store.dispatch("app/fetchCovidAll");
  },

  computed: {
    ...mapGetters({
      covidAll: "app/covidAll",
      isCountriesLoading: "countries/isCountriesLoading",
    }),
  },
};
</script>
