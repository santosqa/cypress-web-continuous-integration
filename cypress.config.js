const { defineConfig: definirConfiguracao } = require('cypress');

module.exports = definirConfiguracao({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Relatório da automação web',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: true,
    consoleReporter: 'spec',
    removeJsonsFolderAfterMerge: false,
  },
  blockHosts: ['*.googlesyndication.com', '*.doubleclick.net', '*.googleadservices.com', 'fonts.googleapis.com', 'fonts.gstatic.com'],
  video: true,
  screenshotOnRunFailure: true,
  viewportWidth: 1440,
  viewportHeight: 1000,
  defaultCommandTimeout: 15000,
  pageLoadTimeout: 90000,
  retries: { runMode: 1, openMode: 0 },
  e2e: {
    baseUrl: 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/configuracao.js',
    setupNodeEvents: (eventos, configuracao) => {
      if (configuracao.isTextTerminal) {
        require('cypress-mochawesome-reporter/plugin')(eventos);
      } else {
        require('./cypress/configuracao/relatorio-interativo')
          .configurarRelatorioInterativo(eventos, configuracao);
      }
      return configuracao;
    },
  },
});
