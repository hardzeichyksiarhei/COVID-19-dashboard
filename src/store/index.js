import { createStore } from "vuex";

const initialState = () => ({
  globalCases: null,

  countries: [],
  currentCountry: null,
});

export default createStore({
  state: initialState(),
  mutations: {},
  actions: {},
  modules: {},
});
