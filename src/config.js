const API_COVID_VERSION = "v3";

module.exports = {
  API_COVID_URL: `${process.env.VUE_APP_API_COVID_URL}/${API_COVID_VERSION}/covid-19`,
  MAP_API_KEY: process.env.VUE_APP_MAP_API_KEY,
};
