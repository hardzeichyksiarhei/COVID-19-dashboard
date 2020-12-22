export const initialState = () => ({
  isConvidAllLoading: false,
  covidAll: null,

  isHistoricalAllLoading: false,
  historicalAll: null,

  isShowKeyboard: false,
});

// state
export default {
  ...initialState(),
};
