import axios from "axios";
import { API_COVID_URL } from "../config";

const getCountries = async () => {
  const { data: countries, status } = await axios.get(
    `${API_COVID_URL}/countries`
  );

  if (status !== 200 || !countries) return [];

  return countries.map((country) => ({
    id: country.countryInfo._id,
    name: country.country,
    meta: {
      flag: country.countryInfo.flag,
      lat: Number(country.countryInfo.lat),
      long: Number(country.countryInfo.long),
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
      cases: Math.round((country.cases / country.population) * 1000000),
      deaths: Math.round((country.deaths / country.population) * 1000000),
      recovered: Math.round((country.recovered / country.population) * 1000000),
    },
    today100: {
      cases: Math.round((country.todayCases / country.population) * 1000000),
      deaths: Math.round((country.todayDeaths / country.population) * 1000000),
      recovered: Math.round(
        (country.todayRecovered / country.population) * 1000000
      ),
    },
  }));
};

export default {
  getCountries,
};
