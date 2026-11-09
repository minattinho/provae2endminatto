# Playwright E2E - Americanas

Testes end-to-end do site [Americanas](https://www.americanas.com.br/) com [Playwright](https://playwright.dev/).

## GitHub Actions + SonarCloud

[![Build and Tests](https://github.com/SEU_USUARIO/SEU_REPO/actions/workflows/node.js.yml/badge.svg)](https://github.com/SEU_USUARIO/SEU_REPO/actions/workflows/node.js.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=SEU_PROJECT_KEY&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=SEU_PROJECT_KEY)

## Casos de teste

| # | Cenário | Validação |
| - | ------- | --------- |
| 1 | Buscar "garrafa termica" | URL da busca e lista de produtos relacionados |
| 2 | Abrir o primeiro produto da busca | Título do produto igual ao do card e botão "Comprar" visível |
| 3 | Buscar termo inexistente | Mensagem "nenhum resultado encontrado" e nenhum produto listado |

## Executando localmente

1. Instale o [Node JS](https://nodejs.org/) (versão >= 22.x)
1. Rode `npm ci` para instalar as dependências
1. Rode `npx playwright install chromium` para instalar o navegador
1. Rode `npm test` para executar os testes
1. Rode `npm run show-report` para abrir o relatório HTML

Outros comandos: `npm run ui` (modo UI), `npm run debug` (inspector) e `npm run ci` (formatação + testes).

Os artefatos (relatório HTML, JUnit, screenshots, vídeos e traces de falhas) ficam em `./artifacts`.

## Configurando o pipeline

O workflow `.github/workflows/node.js.yml` roda em push/pull request para `main`/`master` e tem dois jobs:

- **Run E2E Tests**: instala dependências, verifica formatação, roda os testes e publica a pasta `artifacts` como artifact da execução.
- **Run SonarCloud**: análise estática do código.

Para o SonarCloud funcionar:

1. Importe o repositório em [sonarcloud.io](https://sonarcloud.io/).
1. Em *Administration > Analysis Method*, desative a *Automatic Analysis* (a análise é feita pelo GitHub Actions).
1. Ajuste `sonar.projectKey` e `sonar.organization` em `sonar-project.properties` com os valores do seu projeto.
1. Crie o secret `SONAR_TOKEN` no repositório do GitHub (*Settings > Secrets and variables > Actions*).

## Estrutura do projeto

- `src/scenarios`: specs com os casos de teste
- `src/support/pages`: Page Objects com os locators e ações de cada página
- `src/support/fixtures`: fixtures do Playwright que instanciam os Page Objects e fecham pop-ups (cookies, roleta de desconto) via `page.addLocatorHandler`
