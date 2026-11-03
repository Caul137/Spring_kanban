# Kanban

Aplicação web simples para organizar tarefas em um quadro Kanban integrado em um MCP com IA. O frontend
permite visualizar e pesquisar tarefas por coluna e criar novas tarefas. O
backend expõe uma API REST em Spring Boot, e os dados são persistidos em
PostgreSQL.

## Ferramentas e tecnologias

- Java 27 e Spring Boot (backend)
- Spring Web MVC e Spring Data JPA
- Maven Wrapper (`mvnw.cmd`)
- PostgreSQL
- Docker Compose e Adminer, para desenvolvimento local
- React 19, Create React App e npm (frontend)
- MCP do PostgreSQL, para conectar ferramentas compatíveis do VS Code ao banco

## Estrutura

- `backend/`: API REST, acesso ao banco e `docker-compose.yml`.
- `frontend/`: interface React do quadro Kanban.

## Como rodar localmente

Pré-requisitos: JDK 27, Docker Desktop, Node.js/npm e VS Code.

### 1. Iniciar o PostgreSQL

No PowerShell, a partir da pasta `spring-kanban`:

```powershell
cd .\backend
docker compose up -d
```

O Compose inicia o PostgreSQL na porta `5432` e o Adminer em
<http://localhost:8000>. Para o Adminer, use o servidor `postgres`, usuário
`postgres`, senha `c` e banco `db`.

### 2. Iniciar o backend

Em outro terminal, a partir da pasta `spring-kanban`:

```powershell
cd .\backend
.\mvnw.cmd spring-boot:run
```

A API fica disponível em <http://localhost:8080>. A configuração do backend
espera o PostgreSQL em `localhost:5432`, com o banco `db`.

### 3. Iniciar o frontend

Em outro terminal, a partir da pasta `spring-kanban`:

```powershell
cd .\frontend
npm install
npm start
```

O frontend abre em <http://localhost:3000>. Durante o desenvolvimento, o proxy
do Create React App encaminha as chamadas `/api` para
<http://localhost:8080>.

## API

As rotas usam o prefixo `/api`. As respostas são JSON, exceto a rota de
exclusão, que não retorna conteúdo.

### `GET /api/list`

Lista as tarefas. Devolve um array de objetos com `id`, `title` e `status`.
Quando não há tarefas, devolve `[]`.

```json
[
  {
    "id": 2,
    "title": "Preparar apresentação",
    "status": "inProgress"
  }
]
```

### `POST /api/create`

Cria uma tarefa. Envie `title` e `status`; o `id` é gerado pelo banco. A
resposta contém o objeto criado com `id`, `title` e `status`.

```json
{
  "title": "Preparar apresentação",
  "status": "todo"
}
```

Os valores de status aceitos pela API são `todo`, `inProgress`, `review` e
`done` (a comparação não diferencia maiúsculas de minúsculas). O backend
devolve os status nesses formatos.


### `DELETE /api/delete/{id}`

Exclui a tarefa com o identificador informado. Por exemplo:
`DELETE /api/delete/2`. A resposta não contém corpo.

Atualmente a interface usa as rotas de listagem e criação; a rota de exclusão
está disponível na API, mas não é acionada pela interface.

## MCP do PostgreSQL no VS Code

O MCP permite que um cliente compatível, como o VS Code, acesse ferramentas
para consultar o esquema e os dados do PostgreSQL. Ele é uma integração de
desenvolvimento: não é uma rota da API nem necessário para abrir o quadro.

O arquivo `.mcp.json` deve estar **na raiz da pasta aberta como workspace no
VS Code**. O VS Code procura a configuração na raiz do workspace; não basta
deixá-la dentro de `backend/` ou `frontend/`. Se abrir `spring-kanban` como
workspace, coloque a configuração em `spring-kanban/.mcp.json`. Se abrir a
pasta pai que contém `spring-kanban`, coloque-a nessa pasta pai.

Exemplo de configuração para o servidor MCP do PostgreSQL:

```json
{
  "mcpServers": {
    "postgres-mcp": {
      "command": "npx",
      "args": ["-y", "@microsoft/postgres-mcp", "run"],
      "env": {
        "DATABASE_URL": "postgresql://postgres:<senha>@localhost:5432/db"
      }
    }
  }
}
```

Substitua `<senha>` pela senha configurada para o PostgreSQL local. Com o
Compose deste projeto, a senha de desenvolvimento é `c`. Mantenha credenciais
reais fora de arquivos versionados e reinicie/recarregue o servidor MCP no
VS Code depois de alterar a configuração.