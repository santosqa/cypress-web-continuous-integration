export const conta = {
  abrirAutenticacao() {
    cy.get('a[href="/login"]').click();
    cy.contains('.login-form h2', 'Login to your account').should('be.visible');
    cy.contains('.signup-form h2', 'New User Signup!').should('be.visible');
  },
  iniciarCadastro(usuario) {
    cy.get('[data-qa="signup-name"]').type(usuario.nome);
    cy.get('[data-qa="signup-email"]').type(usuario.email);
    cy.get('[data-qa="signup-button"]').click();
  },
  cadastrar(usuario) {
    this.iniciarCadastro(usuario);
    cy.contains('b', 'Enter Account Information', { matchCase: false }).should('be.visible');
    cy.get('#id_gender1').check();
    cy.get('[data-qa="name"]').should('have.value', usuario.nome);
    cy.get('[data-qa="email"]').should('have.value', usuario.email);
    cy.get('[data-qa="password"]').type(usuario.senha, { log: false, parseSpecialCharSequences: false });
    cy.get('[data-qa="days"]').select('15');
    cy.get('[data-qa="months"]').select('5');
    cy.get('[data-qa="years"]').select('1990');
    cy.get('#newsletter').check();
    cy.get('#optin').check();
    const campos = {
      first_name: usuario.primeiroNome, last_name: usuario.sobrenome,
      company: usuario.empresa, address: usuario.endereco, address2: usuario.complemento,
      state: usuario.estado, city: usuario.cidade, zipcode: usuario.cep,
      mobile_number: usuario.telefone,
    };
    Object.entries(campos).forEach(([campo, valor]) => cy.get(`[data-qa="${campo}"]`).type(valor));
    cy.get('[data-qa="country"]').select(usuario.pais);
    cy.get('[data-qa="create-account"]').click();
    cy.get('[data-qa="account-created"]').should('be.visible').and('contain.text', 'Account Created!');
    cy.then(() => { usuario.criado = true; });
    cy.get('[data-qa="continue-button"]').click();
    this.validarAutenticacao(usuario);
  },
  entrar(usuario) {
    cy.get('[data-qa="login-email"]').type(usuario.email);
    cy.get('[data-qa="login-password"]').type(usuario.senha, { log: false, parseSpecialCharSequences: false });
    cy.get('[data-qa="login-button"]').click();
  },
  validarAutenticacao(usuario) {
    cy.contains('a', `Logged in as ${usuario.nome}`).should('be.visible');
  },
  validarErroDeLogin() {
    cy.contains('.login-form', 'Your email or password is incorrect!').should('be.visible');
  },
  validarEmailExistente() {
    cy.contains('.signup-form', 'Email Address already exist!').should('be.visible');
  },
  sair() {
    cy.get('a[href="/logout"]').click();
    cy.location('pathname').should('eq', '/login');
    cy.contains('.login-form h2', 'Login to your account').should('be.visible');
  },
  excluir(continuar = false) {
    cy.get('a[href="/delete_account"]').click();
    cy.get('[data-qa="account-deleted"]').should('be.visible').and('contain.text', 'Account Deleted!');
    if (continuar) cy.get('[data-qa="continue-button"]').click();
  },
};
