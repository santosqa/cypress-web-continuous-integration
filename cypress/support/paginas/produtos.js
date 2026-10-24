export const produtos = {
  abrir() {
    cy.get('a[href="/products"]').click();
    cy.location('pathname').should('eq', '/products');
    cy.contains('.title', 'All Products').should('be.visible');
    cy.get('.features_items .product-image-wrapper').should('have.length.greaterThan', 0);
  },
  validarDetalhesDoPrimeiroProduto(produto) {
    cy.get('.features_items .choose a').first().click();
    cy.location('pathname').should('eq', `/product_details/${produto.identificador}`);
    cy.get('.product-information').should('be.visible').within(() => {
      cy.get('h2').should('be.visible').and('have.text', produto.nome);
      cy.contains(`Category: ${produto.categoria}`).should('be.visible');
      cy.contains('span', produto.preco).should('be.visible');
      cy.contains('p', 'Availability:').should('be.visible').and('contain.text', produto.disponibilidade);
      cy.contains('p', 'Condition:').should('be.visible').and('contain.text', produto.condicao);
      cy.contains('p', 'Brand:').should('be.visible').and('contain.text', produto.marca);
    });
  },
  pesquisar(termo) {
    cy.get('#search_product').type(termo);
    cy.get('#submit_search').click();
    cy.contains('.title', 'Searched Products').should('be.visible');
  },
  validarResultados(nomesEsperados) {
    cy.get('.features_items .productinfo').should('have.length', nomesEsperados.length)
      .each(($produto) => { cy.wrap($produto).should('be.visible'); });
    cy.get('.features_items .productinfo p').should(($nomes) => {
      const nomesEncontrados = Array.from($nomes, (elemento) => elemento.textContent.trim()).sort();
      expect(nomesEncontrados, 'todos e somente os produtos relacionados').to.deep.eq(nomesEsperados);
    });
  },
  adicionarAoCarrinho() {
    cy.get('.features_items .productinfo a[data-product-id="1"]').click();
    cy.contains('#cartModal', 'Added!').should('be.visible');
    cy.contains('#cartModal button', 'Continue Shopping').click();
  },
};
