import * as types from "./types";

import countriesService from "../../services/countries.services";

export default {
  async fetchCountries({ commit }) {
    commit(types.REQUESTED_COUNTRIES);
    try {
      const countries = await countriesService.getCountries();
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
