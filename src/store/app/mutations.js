import * as types from "./types";

export default {
  [types.REQUESTED_COVID_ALL](state) {
    state.isConvidAllLoading = true;
  },
  [types.REQUESTED_COVID_ALL_SUCCEEDED](state, covidAll) {
    state.covidAll = covidAll;
    state.isConvidAllLoading = false;
  },
  [types.REQUESTED_COVID_ALL_FAILED](state) {
    state.covidAll = null;
    state.isConvidAllLoading = false;
  },

  [types.REQUESTED_HISTORICAL_ALL](state) {
    state.isHistoricalAllLoading = true;
  },
  [types.REQUESTED_HISTORICAL_ALL_SUCCEEDED](state, historicalAll) {
    state.historicalAll = historicalAll;
    state.isHistoricalAllLoading = false;
  },
  [types.REQUESTED_HISTORICAL_ALL_FAILED](state) {
    state.covidAll = null;
    state.isHistoricalAllLoading = false;
  },
};
