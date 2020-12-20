export const initialState = () => ({
  isCountriesLoading: true,
  currentCountry: null,
  countries: [],

  currentIndicatorType: { key: "all", label: "All" },
  indicatorsTypes: [
    { key: "all", label: "All" },
    { key: "today", label: "Today" },
    { key: "all100", label: "All 100" },
    { key: "today100", label: "Today 100" },
  ],

  currentIndicator: { key: "cases", label: "Cases", color: "cases" },
  indicators: [
    { key: "cases", label: "Cases", color: "cases" },
    { key: "deaths", label: "Deaths", color: "deaths" },
    { key: "recovered", label: "Recovered", color: "recovered" },
  ],
});

// state
export default {
  ...initialState(),
};
