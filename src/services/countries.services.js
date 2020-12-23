import axios from "axios";
import { API_COVID_URL } from "../config";

const getCountries = async () => {
  const { data: countries, status } = await axios.get(
    `${API_COVID_URL}/countries`
  );

  if (status !== 200 || !countries) return [];

  return countries
    .filter((country) => country.countryInfo._id)
    .map((country) => ({
      id: country.countryInfo._id,
      name: country.country,
      meta: {
        flag: country.countryInfo.flag,
        lat: Number(country.countryInfo.lat),
        long: Number(country.countryInfo.long),
        iso2: country.countryInfo.iso2,
        iso3: country.countryInfo.iso3,
      },
      all: {
        cases: country.cases,
        deaths: country.deaths,
        recovered: country.recovered,
      },
      today: {
        cases: country.todayCases,
        deaths: country.todayDeaths,
        recovered: country.todayRecovered,
      },
      all100: {
        cases: Math.round((country.cases / country.population) * 1e5),
        deaths: Math.round((country.deaths / country.population) * 1e5),
        recovered: Math.round((country.recovered / country.population) * 1e5),
      },
      today100: {
        cases: Math.round((country.todayCases / country.population) * 1e5),
        deaths: Math.round((country.todayDeaths / country.population) * 1e5),
        recovered: Math.round(
          (country.todayRecovered / country.population) * 1e5
        ),
      },
    }));
};

export default {
  getCountries,
};
