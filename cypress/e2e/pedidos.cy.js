import { inicio } from '../support/paginas/inicio';
import { conta } from '../support/paginas/conta';
import { prepararUsuarioPorTeste } from '../support/helpers/ciclo-do-usuario';
import { criarUsuarioPelaApi } from '../support/helpers/contas-api';
import { produtos } from '../support/paginas/produtos';
import { pedido } from '../support/paginas/pedido';

describe('Suíte de testes de Pedidos', () => {
  const obterUsuario = prepararUsuarioPorTeste();

  it('Caso 15 — Fazer pedido com cadastro antes da finalização', () => {
    const usuario = obterUsuario();
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.cadastrar(usuario);
    produtos.adicionarAoCarrinho();
    pedido.finalizar(usuario);
    conta.excluir(true);
  });

  it('Caso 16 — Fazer pedido com login antes da finalização', () => {
    const usuario = obterUsuario();
    criarUsuarioPelaApi(usuario);
    inicio.abrir();
    conta.abrirAutenticacao();
    conta.entrar(usuario);
    conta.validarAutenticacao(usuario);
    produtos.adicionarAoCarrinho();
    pedido.finalizar(usuario);
    conta.excluir(true);
  });
});
