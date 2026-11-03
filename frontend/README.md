# My tasks

Frontend React com Tailwind CSS para visualizar tarefas em um quadro Kanban. A interface não mantém tarefas de exemplo nem usa arquivos JSON locais como banco de dados: os dados são carregados pela API.

## Executar

```bash
npm install
npm start
```

No desenvolvimento, as requisições para `/api` são encaminhadas para `http://localhost:8080`. Para outra URL, crie um arquivo `.env` com:

```text
REACT_APP_API_URL=http://localhost:8080/api
```

Reinicie o servidor de desenvolvimento depois de alterar essa variável. Os endpoints usados são `GET {REACT_APP_API_URL}/list` e `POST {REACT_APP_API_URL}/create` (por padrão, `GET /api/list` e `POST /api/create`).

O botão **New task** abre um formulário com título e status. O frontend envia `title` e `status` no corpo JSON do `POST /api/create`; o ID é gerado pelo backend. A resposta criada é mostrada no quadro sem recarregar a página.

## Contrato esperado da API

A API deve responder com HTTP `2xx` e um array JSON de tarefas. Cada tarefa deve incluir `id`, `title` e `status`; `description`, `priority`, `category`, `assignee` e `dueDate` são opcionais.

```json
[
  {
    "id": 1,
    "title": "Review API integration",
    "description": "Check the tasks endpoint.",
    "status": "IN_PROGRESS",
    "priority": "HIGH",
    "category": "Development",
    "assignee": "Jordan Davis",
    "dueDate": "2026-11-02"
  }
]
```

Os status aceitos são `TODO`, `IN_PROGRESS`, `REVIEW`, `IN_REVIEW` e `DONE`. O frontend mostra estados de carregamento, erro com opção para tentar novamente, lista vazia e pesquisa local nas tarefas recebidas. Criação e leitura são persistidas pela API do backend.

## Estrutura

```text
src/
  components/                 # Componentes compartilhados
  features/
    board/
      components/             # Colunas e cartões
      hooks/                  # Carregamento e pesquisa
      services/               # Comunicação HTTP com a API de tarefas
      BoardPage.js            # Tela My tasks
      constants.js            # Colunas e estilos
  index.js                    # Inicializa a aplicação
  index.css                   # Estilos base e diretivas Tailwind
```

Tailwind CSS 3 está configurado em `tailwind.config.js`, com PostCSS e Autoprefixer em `postcss.config.js`.

## Testes e build
