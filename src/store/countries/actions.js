import * as types from "./types";

import covidService from "../../services/countries.services";

export default {
  async fetchCountries({ commit }) {
    commit(types.REQUESTED_COUNTRIES);
    try {
      const countries = await covidService.getCountries();
      commit(types.REQUESTED_COUNTRIES_SUCCEEDED, countries);
    } catch (error) {
      commit(types.REQUESTED_COUNTRIES_FAILED, error);
    }
  },

  setCurrentCountry({ commit }, country) {
    commit(types.SET_CURRENT_COUNTRY, country);
  },

  setCurrentIndicator({ commit }, indicator) {
    commit(types.SET_CURRENT_INDICATOR, indicator);
  },

  setCurrentIndicatorType({ commit }, indicatorType) {
    commit(types.SET_CURRENT_INDICATOR_TYPE, indicatorType);
  },
};
