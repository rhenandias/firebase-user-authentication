# Firebase User Authentication

Projeto desenvolvido em React para demonstrar uma aplicação com criação e login de usuário, utilizando os serviços de backend do Firebase.

React + Material UI no frontend e Google Firebase como BaaS (Backend as a Service), hospedado na plataforma de hosting do Firebase.

**Confira e teste o projeto em: [Firebase User Authentication](https://simple-user-authentication.web.app/)**

<div align="center">
<img src="/media/tela.png">
</div>

## Características

- Criação/Login de usuário
- Alteração de senha
- Recuperação de senha via email
- Apagar conta de usuário
- Tratativa de erros nos formulários e ações
- Rotas protegidas
- Design responsivo com Material UI

## Tecnologias

- [NodeJS](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [Firebase](https://firebase.google.com/?hl=pt-br)
- [Material UI](https://material-ui.com/)

---

# Instalação e Execução

## Pré-requisitos

- [NodeJS](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/) ou [YARN](https://yarnpkg.com/)
- Uma conta no [Google Firebase](https://firebase.google.com/?hl=pt-br)

## Criando um projeto Firebase

As chamadas de autenticação de usuário na [demonstração do projeto](https://simple-user-authentication.web.app/) são enviadas ao **meu projeto pessoal** no Firebase.

Por segurança, não é possível realizar chamadas de autenticação de usuário fora do domínio do Firebase Hosting para o meu projeto, portanto, caso deseje criar novas funcionalidades em cima deste projeto **é necessário criar e configurar um projeto no seu próprio Console do Firebase**.

Para criar e adicionar um projeto Firebase ao seu código, consulte a documentação oficial sobre [como adicionar o Firebase ao seu projeto JavaScript](https://firebase.google.com/docs/web/setup).

Após criar e configurar um projeto, altere as credenciais em `src/services/Firebase` para indicar o seu projeto como alvo da aplicação.

## Ativando módulo de Autenticação no Firebase

Após criar um projeto no Firebase, é preciso ativar o módulo de autenticação de usuário no console do seu projeto.

Configure o módulo de autenticação por email e senha, [conforme a documentação](https://firebase.google.com/docs/auth/web/email-link-auth).

## Instalando pacotes

Depois de clonar o repositório, navegue para a pasta raíz do projeto e utilize os comandos

NPM:

```
cd frontend
npm install
```

YARN:

```
cd frontend
yarn
```

## Iniciando a aplicação

Após instalar os pacotes e dependências do projeto, utilize o script `start` para iniciar a aplicação

NPM:

```
cd frontend
npm start
```

YARN:

```
cd frontend
yarn start
```

# Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito por [Rhenan Dias](https://www.linkedin.com/in/rhenandiasmorais/).
