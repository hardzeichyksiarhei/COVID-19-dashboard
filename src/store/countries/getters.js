export default {
  isLoading: (state) => state.isLoading,

  countries: (state) => state.countries,

  currentCountry: (state) => state.currentCountry,

  countryById: (state) => (id) =>
    state.countries.find(({ countryInfo }) => countryInfo._id === id) || null,

  currentIndicator: (state) => state.currentIndicator,
  indicators: (state) => state.indicators,
};
