import * as types from "./types";

export default {
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
};
