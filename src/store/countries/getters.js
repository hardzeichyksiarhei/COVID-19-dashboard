export default {
  isCountriesLoading: (state) => state.isCountriesLoading,

  countryById: (state) => (id) =>
    state.countries.find(({ countryInfo }) => countryInfo._id === id) || null,
  countries: (state) => state.countries,

  currentCountry: (state) => state.currentCountry,
  currentIndicator: (state) => state.currentIndicator,
  currentIndicatorType: (state) => state.currentIndicatorType,

  indicators: (state) => state.indicators,
  indicatorsTypes: (state) => state.indicatorsTypes,
};
