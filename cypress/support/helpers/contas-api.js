import { interpretarCorpo } from './respostas-api';

export function criarUsuarioPelaApi(usuario) {
  return cy.request({ method: 'POST', url: '/api/createAccount', form: true, body: {
    name: usuario.nome, email: usuario.email, password: usuario.senha,
    title: 'Mr', birth_date: '15', birth_month: '5', birth_year: '1990',
    firstname: usuario.primeiroNome, lastname: usuario.sobrenome,
    company: usuario.empresa, address1: usuario.endereco, address2: usuario.complemento,
    country: usuario.pais, state: usuario.estado, city: usuario.cidade,
    zipcode: usuario.cep, mobile_number: usuario.telefone,
  } }).then((resposta) => {
    const corpo = interpretarCorpo(resposta);
    expect(corpo.responseCode, 'conta de preparação criada').to.eq(201);
    usuario.criado = true;
  });
}

export function excluirUsuarioPelaApi(usuario) {
  return cy.request({ method: 'DELETE', url: '/api/deleteAccount',
    form: true, body: { email: usuario.email, password: usuario.senha } });
}
