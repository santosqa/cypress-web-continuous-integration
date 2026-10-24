export function interpretarCorpo(resposta) {
  expect(resposta.status, 'requisição atendida').to.eq(200);
  return typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;
}
