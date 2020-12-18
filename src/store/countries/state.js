export const initialState = () => ({
  isCountriesLoading: false,
  currentCountry: null,
  countries: [],
  currentIndicator: {key: "cases", label: "All Cases", color: "cases"},
  indicators: [
    {key: "cases", label: "All Cases", color: "cases"},
    {key: "deaths", label: "All Deaths", color: "deaths"},
    {key: "recovered", label: "All Recovered", color: "recovered"},

    {key: "todayCases", label: "Today Cases", color: "cases"},
    {key: "todayDeaths", label: "Today Deaths", color: "deaths"},
    {key: "todayRecovered", label: "Today Recovered", color: "recovered"},
  ],
});

// state
export default {
  ...initialState(),
};
