import { gerarUsuario } from '../fabricas/usuario';
import { excluirUsuarioPelaApi } from './contas-api';

export function prepararUsuarioPorTeste() {
  let usuario;

  beforeEach(() => { usuario = gerarUsuario(); });
  afterEach(() => {
    if (usuario.criado) return excluirUsuarioPelaApi(usuario);
  });

  return () => usuario;
}
