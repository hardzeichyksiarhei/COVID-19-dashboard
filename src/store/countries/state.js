export const initialState = () => ({
  isCountriesLoading: false,

  currentCountry: null,
  countries: [],
});

// state
export default {
  ...initialState(),
};
