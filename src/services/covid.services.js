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
      cases: Math.round((global.cases / global.population) * 1000000),
      deaths: Math.round((global.deaths / global.population) * 1000000),
      recovered: Math.round((global.recovered / global.population) * 1000000),
    },
    today100: {
      cases: Math.round((global.todayCases / global.population) * 1000000),
      deaths: Math.round((global.todayDeaths / global.population) * 1000000),
      recovered: Math.round(
        (global.todayRecovered / global.population) * 1000000
      ),
    },
    updated: global.updated,
  };
};

const getHistoricalAll = async () => {
  const { data, status } = await axios.get(
    `${API_COVID_URL}/historical/all?lastdays=30`
  );
  return status === 200 && data ? data : null;
};

export default {
  getAll,
  getHistoricalAll,
};
