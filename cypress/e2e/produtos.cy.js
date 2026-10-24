import { inicio } from '../support/paginas/inicio';
import { produtos } from '../support/paginas/produtos';
import { obterNomesRelacionados } from '../support/helpers/catalogo-api';

describe('Suíte de testes de Produtos', () => {

  it('Caso 8 — Verificar todos os produtos e os detalhes do primeiro produto', () => {
    inicio.abrir();
    produtos.abrir();
    cy.fixture('produtos').then(({ primeiroProduto }) => {
      produtos.validarDetalhesDoPrimeiroProduto(primeiroProduto);
    });
  });

  it('Caso 9 — Pesquisar produto', () => {
    inicio.abrir();
    produtos.abrir();
    cy.fixture('produtos').then(({ termoPesquisa }) => {
      obterNomesRelacionados(termoPesquisa).then((nomesEsperados) => {
        produtos.pesquisar(termoPesquisa);
        produtos.validarResultados(nomesEsperados);
      });
    });
  });
});
