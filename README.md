# Controle de Gastos Residenciais

Sistema de controle de gastos residenciais com cadastro de pessoas, cadastro de
transações (receitas/despesas) e consulta de totais.

## Tecnologias

- **Back-end:** .NET 9 / C#, Entity Framework Core, SQLite
- **Front-end:** React + TypeScript, Vite, React Router

## Estrutura do repositório

```
.
├── ControleGastos.Api/     # Back-end (API REST)
└── controle-gastos-web/    # Front-end (React)
```

## Pré-requisitos

- [.NET SDK 9](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) (inclui o npm)

## Como rodar o back-end (API)

```bash
cd ControleGastos.Api
dotnet restore
dotnet ef database update   # cria o banco SQLite local (só necessário na 1ª vez)
dotnet run
```

A API vai subir em algo como `http://localhost:5274` (a porta exata aparece no
terminal ao rodar). O Swagger, com todos os endpoints documentados, fica em:

```
http://localhost:5274/swagger
```

O banco de dados é um arquivo SQLite (`controlegastos.db`) criado automaticamente
na pasta do projeto — os dados persistem entre execuções.

> Se o comando `dotnet ef` não for reconhecido, instale a ferramenta antes:
> `dotnet tool install --global dotnet-ef`

## Como rodar o front-end

Em outro terminal:

```bash
cd controle-gastos-web
npm install
```

Crie um arquivo `.env` na raiz de `controle-gastos-web` (mesmo nível do
`package.json`) apontando para a porta em que a API subiu:

```
VITE_API_URL=http://localhost:5274/api
```

Depois:

```bash
npm run dev
```

A aplicação vai abrir em `http://localhost:5173`.

> ⚠️ A API precisa estar rodando antes de usar o front-end.

## Funcionalidades

- **Pessoas:** criação, listagem e exclusão (a exclusão remove também todas as
  transações da pessoa).
- **Transações:** criação e listagem, associadas a uma pessoa existente.
  Pessoas menores de 18 anos só podem ter despesas cadastradas (regra
  validada tanto no front quanto no back-end).
- **Totais:** consulta consolidada de receitas, despesas e saldo por pessoa,
  além do total geral de todos.

## Endpoints da API

| Método | Rota                | Descrição                           |
| ------ | ------------------- | ----------------------------------- |
| GET    | `/api/pessoas`      | Lista todas as pessoas              |
| POST   | `/api/pessoas`      | Cria uma pessoa                     |
| DELETE | `/api/pessoas/{id}` | Remove uma pessoa e suas transações |
| GET    | `/api/transacoes`   | Lista todas as transações           |
| POST   | `/api/transacoes`   | Cria uma transação                  |
| GET    | `/api/totais`       | Consulta totais por pessoa e geral  |
