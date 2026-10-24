let inicio;

before(() => { inicio = Date.now(); });

function capturarSuite(suite) {
  return {
    titulo: suite.title,
    testes: suite.tests.map((teste) => ({
      titulo: teste.title,
      codigo: teste.body,
      duracao: teste.duration || 0,
      estado: teste.state || 'pending',
      contexto: teste.context || null,
      erro: teste.err ? { mensagem: teste.err.message, pilha: teste.err.stack } : null,
    })),
    suites: suite.suites.map(capturarSuite),
  };
}

after(function gerarRelatorioDaInterface() {
  if (!Cypress.config('isInteractive')) return;

  return cy.task('gerarRelatorioInterativo', {
    arquivo: Cypress.spec.absolute,
    inicio,
    fim: Date.now(),
    suite: capturarSuite(this.test.parent),
  }, { timeout: 60000 });
});
