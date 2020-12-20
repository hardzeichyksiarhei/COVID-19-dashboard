import axios from "axios";
import { API_COVID_URL } from "../config";

const getAll = async () => {
  const { data: global, status } = await axios.get(`${API_COVID_URL}/all`);

  if (status !== 200 || !global) return null;

  return {
    all: {
      cases: global.cases,
      deaths: global.deaths,
      recovered: global.recovered,
    },
    today: {
      cases: global.todayCases,
      deaths: global.todayDeaths,
      recovered: global.todayRecovered,
    },
    all100: {
      cases: Math.round((global.cases / global.population) * 1e5),
      deaths: Math.round((global.deaths / global.population) * 1e5),
      recovered: Math.round((global.recovered / global.population) * 1e5),
    },
    today100: {
      cases: Math.round((global.todayCases / global.population) * 1e5),
      deaths: Math.round((global.todayDeaths / global.population) * 1e5),
      recovered: Math.round((global.todayRecovered / global.population) * 1e5),
    },
    population: global.population,
    updated: global.updated,
  };
};

const getHistoricalAll = async (population = null) => {
  const { data: historicalAll, status } = await axios.get(
    `${API_COVID_URL}/historical/all?lastdays=30`
  );
  if (status !== 200 || !historicalAll) return null;
  if (!population) return null;

  return {
    all: historicalAll,
    all100: {
      cases: Object.keys(historicalAll.cases).reduce((acc, curr) => {
        acc[curr] = Math.round((historicalAll.cases[curr] / population) * 1e5);
        return acc;
      }, {}),
      deaths: Object.keys(historicalAll.deaths).reduce((acc, curr) => {
        acc[curr] = Math.round((historicalAll.deaths[curr] / population) * 1e5);
        return acc;
      }, {}),
      recovered: Object.keys(historicalAll.recovered).reduce((acc, curr) => {
        acc[curr] = Math.round(
          (historicalAll.recovered[curr] / population) * 1e5
        );
        return acc;
      }, {}),
    },
  };
};

export default {
  getAll,
  getHistoricalAll,
};
