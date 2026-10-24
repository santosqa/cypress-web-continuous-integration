import { inicio } from '../support/paginas/inicio';
import { conta } from '../support/paginas/conta';
import { prepararUsuarioPorTeste } from '../support/helpers/ciclo-do-usuario';
import { criarUsuarioPelaApi } from '../support/helpers/contas-api';

describe('Suíte de testes de Login', () => {
  const obterUsuario = prepararUsuarioPorTeste();

  it('Caso 2 — Entrar com e-mail e senha corretos', () => {
    const usuario = obterUsuario();
    criarUsuarioPelaApi(usuario);
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.entrar(usuario);
    conta.validarAutenticacao(usuario);
    conta.excluir();
  });

  it('Caso 3 — Entrar com e-mail e senha incorretos', () => {
    const usuario = obterUsuario();
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.entrar({ ...usuario, senha: 'SenhaIncorreta!' });
    conta.validarErroDeLogin();
  });

  it('Caso 4 — Sair da conta', () => {
    const usuario = obterUsuario();
    criarUsuarioPelaApi(usuario);
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.entrar(usuario);
    conta.validarAutenticacao(usuario);
    conta.sair();
  });
});
