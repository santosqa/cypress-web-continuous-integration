export const inicio = {
  abrir() {
    cy.visit('/');
    cy.get('#slider').should('be.visible');
    cy.get('a[href="/"]').first().should('be.visible');
  },
  inscrever(email) {
    cy.get('#footer').scrollIntoView();
    cy.contains('#footer h2', 'Subscription', { matchCase: false }).should('be.visible');
    cy.get('#susbscribe_email').type(email);
    cy.get('#subscribe').click();
    cy.contains('You have been successfully subscribed!').should('be.visible');
  },
};
