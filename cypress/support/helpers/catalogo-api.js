import { interpretarCorpo } from './respostas-api';

export function obterNomesRelacionados(termo) {
  return cy.request('/api/productsList').then((resposta) => {
    const catalogo = interpretarCorpo(resposta);
    const nomesEsperados = catalogo.products.filter((produto) =>
      [produto.name, produto.brand, produto.category.category].some((valor) =>
        valor.toLowerCase().includes(termo.toLowerCase()))
    ).map((produto) => produto.name.trim()).sort();
    expect(nomesEsperados, 'produtos relacionados no catálogo real').not.to.be.empty;
    return nomesEsperados;
  });
}
