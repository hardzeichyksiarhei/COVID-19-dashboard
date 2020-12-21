import * as types from "./types";

import covidService from "../../services/covid.services";

export default {
  async fetchCovidAll({ commit, dispatch }) {
    commit(types.REQUESTED_COVID_ALL);
    try {
      const covidAll = await covidService.getAll();
      commit(types.REQUESTED_COVID_ALL_SUCCEEDED, covidAll);

      dispatch("fetchHistoricalAll");
    } catch (error) {
      commit(types.REQUESTED_COVID_ALL_FAILED, error);
    }
  },

  async fetchHistoricalAll({ commit, state }, lastdays = 30) {
    commit(types.REQUESTED_HISTORICAL_ALL);
    try {
      const historicalAll = await covidService.getHistoricalAll(
        lastdays,
        state.covidAll.population
      );

      commit(types.REQUESTED_HISTORICAL_ALL_SUCCEEDED, historicalAll);
    } catch (error) {
      commit(types.REQUESTED_HISTORICAL_ALL_FAILED, error);
    }
  },
};
