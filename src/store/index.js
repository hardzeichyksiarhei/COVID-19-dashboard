import { createStore } from "vuex";
import * as types from "./types";

import covidService from "../services/covid.services";

const initialState = () => ({
  globalCases: null,

  isCountriesLoading: false,
  countries: [],

  currentCountry: null,
});

export default createStore({
  state: initialState(),

  getters: {
    countries: (state) => state.countries,
  },

  mutations: {
    [types.REQUESTED_COUNTRIES](state) {
      state.isCountriesLoading = true;
    },
    [types.REQUESTED_COUNTRIES_SUCCEEDED](state, countries) {
      state.countries = countries;
      state.isCountriesLoading = false;
    },
    [types.REQUESTED_COUNTRIES_FAILED](state) {
      state.countries = [];
      state.isCountriesLoading = false;
    },
  },

  actions: {
    async fetchCountries({ commit }) {
      commit(types.REQUESTED_COUNTRIES);
      try {
        const countries = await covidService.getCountries();
        commit(types.REQUESTED_COUNTRIES_SUCCEEDED, countries);
      } catch (error) {
        commit(types.REQUESTED_COUNTRIES_FAILED, error);
      }
    },
  },

  modules: {},
});
