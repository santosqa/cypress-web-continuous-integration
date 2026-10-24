import { gerarUsuario } from '../support/fabricas/usuario';
import { inicio } from '../support/paginas/inicio';

describe('Suíte de testes de Inscrição', () => {

  it('Caso 10 — Verificar inscrição na página inicial', () => {
    inicio.abrir();
    inicio.inscrever(gerarUsuario().email);
  });
});
