const API_COVID_VERSION = "v3";

module.exports = {
  API_COVID_URL: `${process.env.VUE_APP_API_COVID_URL}/${API_COVID_VERSION}/covid-19`,
  API_MAP_KEY: process.env.VUE_APP_API_MAP_KEY,
};
