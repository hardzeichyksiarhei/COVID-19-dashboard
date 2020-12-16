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
};
