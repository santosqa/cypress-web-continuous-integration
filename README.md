# Automação Web com Cypress
  

Este documento traz o passo a passo completo para configurar o ambiente de desenvolvimento e testes e2e com **Git**, **Node.js 22**, **Cypress (v13.7.3)**, **@faker-js/faker** e **cypress-mochawesome-reporter**.

---

## 1. Pré-requisitos e Ambiente

### Instalação do Git e Node.js 22 via NVM

1. **Git**: Certifique-se de ter o Git instalado na sua máquina ([git-scm.com](https://git-scm.com/)).
2. **NVM (Node Version Manager)**: Para gerenciar as versões do Node.js, recomendamos utilizar o NVM.

Execute os seguintes comandos no terminal na raiz do projeto:

```bash
nvm install 22
nvm use 22
```

---

## 2. Comando de Instalação dos Pacotes

Execute o comando abaixo no terminal para instalar o Cypress na versão especificada, o Faker e o Mochawesome Reporter como dependências de desenvolvimento:

```bash
npm install -D cypress@13.7.3 @faker-js/faker@^8.4.1 cypress-mochawesome-reporter@^3.8.2
```

---

## 3 Comandos de execução

```sh
npm run headless              # Headless
npm run interface             # Navegador visível
npm run interface:interativa  # Interface interativa
```

Todos os modos geram relatórios com **cypress-mochawesome-reporter**.

| Comando | Funcionamento | Relatório HTML |
| --- | --- | --- |
| `npm run headless` | Executa todas as suítes sem abrir a janela do navegador | `cypress/reports/index.html` |
| `npm run interface` | Executa todas as suítes com o navegador visível | `cypress/reports/index.html` |
| `npm run interface:interativa` | Abre o Cypress para escolher e repetir suítes | `cypress/reports/interface/index.html` |

## 4. Executar sem interface — headless

1. Garanta acesso à internet e ao site `https://automationexercise.com`.
2. Execute todas as suítes no Electron incluído no Cypress:

   ```sh
   npm run headless
   ```

3. Para usar o Chrome instalado na máquina:

   ```sh
   npm run headless -- --browser chrome
   ```

4. Para executar somente uma suíte:

   ```sh
   npm run headless -- --spec cypress/e2e/login.cy.js
   ```

5. Ao concluir, abra **`cypress/reports/index.html`**.
O HTML consolidado é gerado automaticamente pelo cypress-mochawesome-reporter.

## 5. Executar com a janela do navegador — headed

1. Execute todas as suítes com o navegador visível:

   ```sh
   npm run interface
   ```

2. Para selecionar apenas uma suíte:

   ```sh
   npm run interface -- --spec cypress/e2e/produtos.cy.js
   ```

3. Aguarde o término e abra **`cypress/reports/index.html`**. 

## 6. Executar pela interface interativa — Cypress Open

1. Abra o Cypress:

   ```sh
   npm run Interface:interativa
   ```

2. Selecione **E2E Testing**, escolha o navegador e clique em **Start E2E Testing**.
3. Clique no arquivo da suíte desejada. Aguarde todos os testes e o comando `gerarRelatorioInterativo` terminarem.
4. Abra **`cypress/reports/interface/index.html`**. Não é necessário fechar o Cypress para gerar o HTML.
5. Execute outros arquivos para consolidar os resultados da sessão. Ao repetir um arquivo, seu resultado anterior é substituído. Atualize a página do relatório para ver a versão mais recente.

O modo Open usa uma integração em `cypress/configuracao/relatorio-interativo.js` que entrega os resultados reais ao **mesmo cypress-mochawesome-reporter**. A execução interrompida antes do fim de um arquivo não produz seu relatório completo. Uma nova sessão do Open começa uma nova consolidação.

## 7. Consultar evidências

- **Run, headless ou headed:** `cypress/reports/index.html`.
- **Open:** `cypress/reports/interface/index.html`.
- **Capturas de falhas:** `cypress/screenshots`, incorporadas ao HTML quando disponíveis.
- **Vídeos:** `cypress/videos`, gerados no modo Run.

O modo Run substitui os relatórios da execução anterior e repete um teste uma vez se houver falha; falhas persistentes retornam código diferente de zero. A aplicação externa precisa estar disponível. Anúncios e fontes de terceiros são bloqueados; as respostas funcionais são reais.

## 8. Executar no GitHub Actions

1. O Actions irá executar a cada PR enviado ao repositório remoto ou também poderá ser execução manual seguindo os proximos passos.
2. Abra **Actions → Cypress | Automação Web E2E → Run workflow**.
3. Selecione a branch e confirme **Run workflow**.
4. Aguarde a conclusão e baixe o artefato **relatorios**, com HTML, vídeos e capturas disponíveis.
5. Acompanhe o progresso de cada teste nos logs. Ao final, consulte a aba **Summary** para ver os totais de testes aprovados, falhos, pendentes e ignorados, além dos links para o relatório e para os logs da execução.

## Organização das suítes e dados

| Arquivo | Suíte | Casos |
| --- | --- | --- |
| `cypress/e2e/cadastro.cy.js` | Cadastro | 1, 5 |
| `cypress/e2e/login.cy.js` | Login | 2, 3, 4 |
| `cypress/e2e/produtos.cy.js` | Produtos | 8, 9 |
| `cypress/e2e/inscricao.cy.js` | Inscrição | 10 |
| `cypress/e2e/pedidos.cy.js` | Pedidos | 15, 16 |

- `cypress/support/paginas`: Page Objects com ações, seletores e validações da interface.
- `cypress/support/helpers`: preparação e limpeza de contas, consulta do catálogo, interpretação das APIs e captura de resultados do modo Open.
- `cypress/support/fabricas`: dados aleatórios de usuários com Faker em português do Brasil; e-mails únicos em `example.com`.
- `cypress/fixtures`: referências estáveis de produtos e pagamento fictício, carregadas com `cy.fixture`.
- `cypress/support/configuracao.js`: suporte global e registro do reporter.
- `cypress/configuracao`: integração Node do relatório interativo.

Não é necessário cadastrar credenciais. Cada teste de conta gera seus próprios dados; as pré-condições dos casos 2, 4, 5 e 16 são criadas pela API, e os cadastros dos casos 1 e 15 são executados pela interface. As contas criadas são removidas após cada teste, inclusive após falhas.

Para verificar a integração do relatório interativo sem acessar o site, execute `npm run verificar:relatorio`. A verificação usa uma pasta temporária e valida estados, erros, duração, HTML e substituição de resultados, sem acrescentar cenários E2E.



---
## 🌎 Sobre o a   utor
🐞 Caçador de bugs, guardião da qualidade e parceiro do time: antecipo problemas e reforço a qualidade reduzindo dor de cabeça em produção.

Projeto mantido por **Ricardo Santos** — QA Engineer

Focado em:
* Qualidade de software
* Automação de testes
* Testes Web, API e Mobile
* Observabilidade
* Engenharia de qualidade

🌐 [santosqa.github.io](https://santosqa.github.io)👋🏼


---


[![Santos Links](https://img.shields.io/badge/GitHub-Santos%20Links-%23FFD700?style=for-the-badge&logo=github&logoColor=white)](https://santosqa.github.io) [![GitHub](https://img.shields.io/badge/GitHub-About.me-%2350fa7b?style=for-the-badge&logo=github&logoColor=white)](https://github.com/santosqa) [![LinkedIn](https://img.shields.io/badge/LinkedIn>-SantosQA-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/santosqa) [![Instagram](https://img.shields.io/badge/>-instagram-%23ff5555.svg?&style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/santosqa_/) [![Santos QA](https://img.shields.io/badge/www-santosqa.com-%23bd93f9.svg?&style=for-the-badge&logo=firefox-browser&logoColor=white)](https://www.santosqa.com) [![Apartamento Vista Mar](https://img.shields.io/badge/www-ApartamentoVistaMar.com-%238be9fd.svg?&style=for-the-badge&logo=google-chrome&logoColor=white)](https://www.apartamentovistamar.com/) [![Receitas Nerds](https://img.shields.io/badge/GitHub-Receitas%20Nerds-%23ffb86c?style=for-the-badge&logo=github&logoColor=white)](https://santosqa.github.io/receitas/) [![Santos Locais Turisticos](https://img.shields.io/badge/GitHub-Santos%20Locais%20Turísticos-%23ff79c6?style=for-the-badge&logo=github&logoColor=white)](https://santosqa.github.io/santos-locais-turisticos/)

##


<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

![](https://visitor-badge.glitch.me/badge?page_id=santosqa)