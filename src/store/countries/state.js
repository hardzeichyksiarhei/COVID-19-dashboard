export const initialState = () => ({
  isCountriesLoading: false,
  currentCountry: null,
  currentIndicator: null,
  countries: [],
});

// state
export default {
  ...initialState(),
};
