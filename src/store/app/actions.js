import * as types from "./types";

import covidService from "../../services/covid.services";

export default {
  async fetchCovidAll({ commit }) {
    commit(types.REQUESTED_COVID_ALL);
    try {
      const covidAll = await covidService.getAll();
      commit(types.REQUESTED_COVID_ALL_SUCCEEDED, covidAll);
    } catch (error) {
      commit(types.REQUESTED_COVID_ALL_FAILED, error);
    }
  },
};
