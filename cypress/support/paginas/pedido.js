export const pedido = {
  finalizar(usuario) {
    cy.get('header a[href="/view_cart"]').click();
    cy.location('pathname').should('eq', '/view_cart');
    cy.get('#cart_info_table').should('be.visible');
    cy.get('#product-1').should('contain.text', 'Blue Top');
    cy.contains('a', 'Proceed To Checkout').click();
    cy.contains('h2', 'Address Details').should('be.visible');
    cy.contains('h2', 'Review Your Order').should('be.visible');
    ['#address_delivery', '#address_invoice'].forEach((seletor) => {
      cy.get(seletor).should('contain.text', `${usuario.primeiroNome} ${usuario.sobrenome}`)
        .and('contain.text', usuario.empresa).and('contain.text', usuario.endereco)
        .and('contain.text', usuario.complemento).and('contain.text', usuario.cidade)
        .and('contain.text', usuario.estado).and('contain.text', usuario.cep)
        .and('contain.text', usuario.pais).and('contain.text', usuario.telefone);
    });
    cy.get('#cart_info #product-1').should('contain.text', 'Blue Top');
    cy.fixture('pagamento').then((pagamento) => {
      cy.get('textarea[name="message"]').type(pagamento.comentario);
      cy.contains('a', 'Place Order').click();
      cy.get('[data-qa="name-on-card"]').type(usuario.nome);
      cy.get('[data-qa="card-number"]').type(pagamento.numeroCartao);
      cy.get('[data-qa="cvc"]').type(pagamento.codigoSeguranca);
      cy.get('[data-qa="expiry-month"]').type(pagamento.mesValidade);
      cy.get('[data-qa="expiry-year"]').type(pagamento.anoValidade);
    });
    // Captura a mensagem transitória antes do redirecionamento do formulário.
    cy.get('#payment-form').then(($formulario) => {
      $formulario.on('submit', () => {
        expect($formulario.find('#success_message'), 'confirmação de sucesso do pagamento')
          .to.be.visible.and.contain('Your order has been placed successfully!');
      });
    });
    cy.get('[data-qa="pay-button"]').click();
    cy.get('[data-qa="order-placed"]').should('be.visible');
    cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
  },
};
