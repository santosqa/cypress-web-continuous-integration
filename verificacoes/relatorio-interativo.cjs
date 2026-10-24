const arquivos = require('node:fs');
const sistema = require('node:os');
const caminho = require('node:path');
const verificar = require('node:assert/strict');
const raiz = caminho.resolve(__dirname, '..');
const { configurarRelatorioInterativo } = require(raiz + '/cypress/configuracao/relatorio-interativo');
const configuracao = require(raiz + '/cypress.config');
const temporario = arquivos.mkdtempSync(caminho.join(sistema.tmpdir(), 'verificacao-relatorio-'));
let tarefa;
configurarRelatorioInterativo((evento, tarefas) => { tarefa = tarefas.gerarRelatorioInterativo; }, {
  ...configuracao, projectRoot: temporario,
  screenshotsFolder: caminho.join(temporario, 'capturas'), videosFolder: caminho.join(temporario, 'videos'),
  reporterOptions: { ...configuracao.reporterOptions, removeJsonsFolderAfterMerge: false },
});
const criarResultado = (nome, estados) => ({
  arquivo: caminho.join(temporario, nome + '.cy.js'), inicio: 100000, fim: 102000,
  suite: { titulo: '', testes: [], suites: [{ titulo: 'Suíte de verificação', suites: [],
    testes: estados.map((estado, indice) => ({ titulo: `Verificação ${indice}`, codigo: '', estado,
      duracao: 100, contexto: null, erro: estado === 'failed' ? { mensagem: 'Falha registrada', pilha: 'Erro: Falha registrada' } : null })) }] },
});
(async () => {
  await tarefa(criarResultado('primeiro', ['passed', 'failed', 'pending']));
  const ler = nome => JSON.parse(arquivos.readFileSync(caminho.join(temporario, 'cypress/reports/interface/.jsons', nome + '.json')));
  let relatorio = ler('primeiro');
  verificar.equal(relatorio.stats.passes, 1);
  verificar.equal(relatorio.stats.failures, 1);
  verificar.equal(relatorio.stats.pending, 1);
  verificar.equal(relatorio.stats.duration, 2000);
  verificar.match(relatorio.results[0].suites[0].tests[1].err.message, /Falha registrada/);
  await tarefa(criarResultado('primeiro', ['passed', 'passed']));
  await tarefa(criarResultado('segundo', ['passed']));
  relatorio = ler('primeiro');
  verificar.equal(relatorio.stats.passes, 2);
  verificar.equal(relatorio.stats.failures, 0);
  verificar.equal(arquivos.readdirSync(caminho.join(temporario, 'cypress/reports/interface/.jsons')).length, 2);
  verificar.ok(arquivos.existsSync(caminho.join(temporario, 'cypress/reports/interface/index.html')));
  arquivos.rmSync(temporario, { recursive: true, force: true });
  console.log('Verificado: aprovados, falhas, pendências, duração, erros, repetição sem duplicação e HTML consolidado.');
})();
