module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
      title: "COVID-19 Dashboard",
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/scss/_variables.scss";`,
      },
    },
  },
};
