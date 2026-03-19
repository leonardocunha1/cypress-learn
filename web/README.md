# WebDojo - Documentacao de Testes Automatizados com Cypress

Projeto de testes end-to-end (E2E) para validacao da aplicacao WebDojo, utilizando Cypress com comandos customizados, fixtures e cenarios cobrindo fluxos criticos da interface.

## Objetivo

- Garantir confiabilidade dos fluxos principais da aplicacao.
- Validar comportamento de UI, regras de formulario, integracao HTTP e interacoes avancadas.
- Facilitar manutencao e escalabilidade da suite com padroes reutilizaveis.

## Stack

- Cypress `15.11.0`
- cypress-real-events `1.15.0`
- serve `14.2.4`
- Node.js + npm/yarn

## Pre-requisitos

- Node.js instalado (recomendado LTS)
- Dependencias instaladas no projeto
- Aplicacao disponivel em `http://localhost:3000`

## Instalacao

```bash
npm install
```

## Como executar

### 1) Subir a aplicacao

```bash
npm run dev
```

Observacao: este comando usa `serve -s dist -p 3000`. Garanta que a pasta `dist` exista e esteja atualizada.

### 2) Executar os testes

Executar toda a suite em modo headless:

```bash
npm test
```

Abrir Cypress em modo interativo:

```bash
npm run test:ui
```

Executar apenas os testes de login (desktop):

```bash
npm run test:login
```

Executar apenas os testes de login (mobile):

```bash
npm run test:login:mobile
```

Executar um arquivo especifico:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

## Configuracao Cypress

Arquivo principal: `cypress.config.js`

- `baseUrl`: `http://localhost:3000`
- `video`: `true`
- Viewport padrao definido via scripts (`desktop` e `mobile`)

## Estrutura do projeto

```text
cypress/
  e2e/
    alerts.cy.js
    cep.cy.js
    consultancy.cy.js
    github.cy.js
    hover.cy.js
    kanban.cy.js
    links.cy.js
    login.cy.js
    studio.cy.js
    video.cy.js
  fixtures/
    cep.json
    consultancy.json
  support/
    commands.js
    e2e.js
    utils.js
    actions/
      consultancy.actions.js
```

## Cobertura de cenarios E2E

- `login.cy.js`: login valido, credenciais invalidas, validacao de cookie e token.
- `alerts.cy.js`: alerta, confirmacao (OK/Cancelar) e prompt com stub.
- `cep.cy.js`: consulta de CEP com `cy.intercept` para mock da API ViaCEP.
- `consultancy.cy.js`: envio de formulario (PF/PJ) e validacao de campos obrigatorios.
- `github.cy.js`: cadastro e remocao de perfis em tabela.
- `hover.cy.js`: validacao de tooltip com `realHover`.
- `kanban.cy.js`: drag and drop entre colunas do board.
- `links.cy.js`: validacao de links externos e navegacao removendo `target`.
- `video.cy.js`: interacao com player de video dentro de `iframe`.
- `studio.cy.js`: exemplos de cenarios gravados com Cypress Studio.

## Comandos customizados

Definidos em `cypress/support/commands.js` e importados globalmente por `cypress/support/e2e.js`.

- `cy.start()`: abre a raiz da aplicacao.
- `cy.submitLoginForm(email, password)`: preenche e envia formulario de login.
- `cy.goTo(buttonName, pageTittle)`: navega por modulo via botao e valida titulo da pagina.
- `cy.login(ui = false)`: login por UI ou por injecao de token/localStorage + cookie.

Comandos de formulario de consultoria em `cypress/support/actions/consultancy.actions.js`:

- `cy.fillConsultancyForm(data)`
- `cy.submitConsultancyForm()`
- `cy.validateConsultancyForm()`

## Fixtures

- `cypress/fixtures/cep.json`: massa de dados para endereco na consulta de CEP.
- `cypress/fixtures/consultancy.json`: massa para formulario de consultoria (Individual e In Company).

## Boas praticas adotadas

- Reutilizacao de acoes com comandos customizados.
- Uso de fixtures para separar dados dos cenarios.
- Isolamento de integracao externa com `cy.intercept`.
- Validacoes funcionais e visuais (texto, classes e propriedades CSS).
- Padrao `beforeEach` para setup consistente.

## Pontos de atencao

- Existe um teste marcado com `it.skip` em `github.cy.js`.
- O fluxo de `video.cy.js` depende de `wait` fixo (`cy.wait(3000)`), podendo gerar variacao conforme ambiente.
- O script `dev` depende da pasta `dist`; sem build previo, a aplicacao pode nao iniciar.

## Sugestoes de evolucao

- Substituir esperas fixas por esperas condicionais.
- Adicionar tags por tipo de teste (smoke, regressao, mobile).
- Integrar execucao em CI (ex.: GitHub Actions) com relatorios.
- Adicionar cobertura negativa para formularios adicionais e regras de negocio.

## Autor

Projeto de automacao E2E para estudos e evolucao pratica em Cypress.
