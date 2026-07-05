Sistema de Gestão Pessoal (SGP)
Autor: Jean Padilha
Curso: Análise e Desenvolvimento de Sistemas
Instituição: Senac Joinville

Observação

Este projeto foi desenvolvido como atividade prática das disciplinas de
Backend e Frontend, utilizando arquitetura baseada em API REST e
integração entre frontend React e backend Node.js.

O sistema permite realizar o gerenciamento de despesas pessoais,
possibilitando o cadastro, edição, exclusão, consulta e filtragem de
despesas e categorias.

Tecnologias Utilizadas

Frontend

-   React
-   React Router DOM
-   Axios
-   Context API
-   Bootstrap 5

Backend

-   Node.js
-   Express
-   Sequelize
-   MySQL
-   JWT
-   bcrypt

Funcionalidades

-   Login
-   Persistência da sessão
-   Logout
-   Dashboard
-   CRUD de Categorias
-   CRUD de Despesas
-   Filtros por Categoria, Status, Data e Valor
-   Loading nas telas
-   Validação de formulários
-   Interface responsiva

Estrutura

    src/
    ├── components/
    ├── contexts/
    ├── hooks/
    ├── layouts/
    ├── pages/
    ├── routes/
    ├── services/
    └── styles/

Execução

Backend

    npm install
    npm start

Servidor: http://localhost:3000

Frontend

    npm install
    npm run dev

Aplicação: http://localhost:5173