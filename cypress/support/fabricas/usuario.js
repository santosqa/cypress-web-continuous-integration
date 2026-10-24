import { fakerPT_BR as gerador } from '@faker-js/faker';

export function gerarUsuario() {
  const primeiroNome = gerador.person.firstName();
  const sobrenome = gerador.person.lastName();

  return {
    nome: `${primeiroNome} ${sobrenome}`,
    email: `automacao.${gerador.string.uuid()}@example.com`,
    senha: gerador.internet.password({ length: 16 }),
    primeiroNome,
    sobrenome,
    empresa: gerador.company.name(),
    endereco: gerador.location.streetAddress(),
    complemento: `Apartamento ${gerador.number.int({ min: 1, max: 999 })}`,
    pais: 'Canada',
    estado: gerador.location.state(),
    cidade: gerador.location.city(),
    cep: gerador.location.zipCode(),
    telefone: gerador.string.numeric(11),
  };
}
