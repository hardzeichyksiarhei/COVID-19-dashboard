import * as types from "./types";

import covidService from "../../services/covid.services";

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
};
