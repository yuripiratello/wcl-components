/**@type {import("definitions/template").TemplateConfig} config*/
module.exports = {
  plugins: {
    clearSource: {
      compress: true,
    },
    exportString: true,
    autoTest: {
      active: false,
      loginMethod: "WCL",
      components: {
        deathRecap:
          "https://www.warcraftlogs.com/reports/YNFngZby4zpWmvfC#fight=5&view=components",
      },
    },
    deathRecap: {
      active: true,
      options: {
        banner:
          "Created using the WCL-TS-Components https://github.com/yuripiratello/wcl-components",
        include: /-*\.js/,
      },
    },
  },
  components: {
    deathRecap: {
      h: 5,
      w: 5,
    },
  },
  watch: true,
};
