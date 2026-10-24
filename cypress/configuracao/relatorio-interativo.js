const caminho = require('node:path');
const { Suite: SuiteMocha, Test: TesteMocha, Runner: ExecutorMocha } = require('mocha');
const Relator = require('cypress-mochawesome-reporter');
const { beforeRunHook: iniciarRelatorio, afterRunHook: concluirRelatorio } = require('cypress-mochawesome-reporter/lib');

// A interface não instancia o reporter Node. Repassamos seus resultados reais
// ao mesmo reporter, preservando estado, duração, erros e contexto de capturas.
function reconstruirSuite(dados, arquivo, pai) {
  const suite = pai ? SuiteMocha.create(pai, dados.titulo) : new SuiteMocha('');
  suite.file = arquivo;
  for (const dadosTeste of dados.testes) {
    const teste = new TesteMocha(dadosTeste.titulo, function resultadoCapturado() {});
    teste.file = arquivo;
    teste.body = dadosTeste.codigo;
    teste.duration = dadosTeste.duracao;
    teste.state = dadosTeste.estado;
    teste.pending = !['passed', 'failed'].includes(teste.state);
    if (dadosTeste.contexto) teste.context = dadosTeste.contexto;
    if (dadosTeste.erro) {
      teste.err = Object.assign(new Error(dadosTeste.erro.mensagem), { stack: dadosTeste.erro.pilha });
    }
    suite.addTest(teste);
  }
  dados.suites.forEach((filha) => reconstruirSuite(filha, arquivo, suite));
  return suite;
}

function emitirResultados(executor, suite) {
  executor.emit('suite', suite);
  for (const teste of suite.tests) {
    executor.emit('test', teste);
    if (teste.pending) executor.emit('pending', teste);
    else if (teste.state === 'failed') executor.emit('fail', teste, teste.err);
    else executor.emit('pass', teste);
    executor.emit('test end', teste);
  }
  suite.suites.forEach((filha) => emitirResultados(executor, filha));
  executor.emit('suite end', suite);
}

async function gravarResultado(resultado, configuracao) {
  const raiz = reconstruirSuite(resultado.suite, resultado.arquivo);
  const executor = new ExecutorMocha(raiz);
  const relator = new Relator(executor, {
    reporterOptions: {
      ...configuracao.reporterOptions,
      consoleReporter: 'none',
      reportFilename: caminho.basename(resultado.arquivo, '.cy.js'),
    },
  });
  executor.emit('start');
  emitirResultados(executor, raiz);
  executor.emit('end');
  executor.stats.start = new Date(resultado.inicio);
  executor.stats.end = new Date(resultado.fim);
  executor.stats.duration = resultado.fim - resultado.inicio;
  await relator.done(executor.stats.failures);
}

function configurarRelatorioInterativo(eventos, configuracao) {
  const resultados = new Map();
  const configuracaoInterativa = {
    ...configuracao,
    reporterOptions: { ...configuracao.reporterOptions, reportDir: 'cypress/reports/interface' },
  };

  eventos('task', {
    async gerarRelatorioInterativo(resultado) {
      resultados.set(resultado.arquivo, resultado);
      // Substitui a execução anterior de cada arquivo ao usar o botão de repetir.
      await iniciarRelatorio({ config: configuracaoInterativa });
      for (const resultadoAtual of resultados.values()) {
        await gravarResultado(resultadoAtual, configuracaoInterativa);
      }
      await concluirRelatorio();
      return null;
    },
  });
}

module.exports = { configurarRelatorioInterativo };
