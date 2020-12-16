import * as types from "./types";

import covidService from "../../services/countries.services";

export default {
  async fetchCountries({ commit }) {
    commit(types.REQUESTED_COUNTRIES);
    try {
      const countries = await covidService.getCountries();
      countries.sort((a, b) => b.cases - a.cases);
      commit(types.REQUESTED_COUNTRIES_SUCCEEDED, countries);
    } catch (error) {
      commit(types.REQUESTED_COUNTRIES_FAILED, error);
    }
  },

  setCurrentCountry({ commit }, country) {
    // server

    commit(types.SET_CURRENT_COUNTRY, country);
  },
};
