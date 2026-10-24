import { inicio } from '../support/paginas/inicio';
import { conta } from '../support/paginas/conta';
import { prepararUsuarioPorTeste } from '../support/helpers/ciclo-do-usuario';
import { criarUsuarioPelaApi } from '../support/helpers/contas-api';

describe('Suíte de testes de Cadastro', () => {
  const obterUsuario = prepararUsuarioPorTeste();

  it('Caso 1 — Cadastrar usuário', () => {
    const usuario = obterUsuario();
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.cadastrar(usuario);
    conta.excluir(true);
  });

  it('Caso 5 — Cadastrar usuário com e-mail já existente', () => {
    const usuario = obterUsuario();
    criarUsuarioPelaApi(usuario);
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.iniciarCadastro(usuario);
    conta.validarEmailExistente();
  });
});
