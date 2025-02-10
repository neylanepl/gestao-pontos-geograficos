# Gestão de Pontos Geográficos

Um sistema de gestão de pontos geográficos, onde os usuários podem adicionar, editar e visualizar pontos em um mapa.

## Ferramentas Utilizadas

### Frontend
- **Linguagem**: TypeScript
- **Framework**: React (versão 18.3.1)
- **Gerenciamento de rotas**: React Router DOM (versão 7.1.5)
- **Mapa**: Leaflet (versão 1.9.4) e React Leaflet (versão 4.2.1)
- **Estilização**: Tailwind CSS (versão 4.0.3)
- **Notificações**: React Hot Toast (versão 2.5.1)
- **Ícones**: Heroicons (versão 2.2.0)
- **Alertas**: SweetAlert2 (versão 11.15.10)
- **Roteamento**: React Router DOM (versão 7.1.5)
- **Geração de dados fictícios**: Faker.js (versão 9.4.0)

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

## Execução

A execução do projeto pode ser realizada utilizando npm ou yarn.

### Como executar a aplicação (Frontend)
1. Após clonar o repositório, entre na pasta do projeto:
    ```bash
    cd gestao-pontos-geograficos
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```
    ou, se estiver usando yarn:
    ```bash
    yarn install
    ```

    Caso precise instalar as dependências separadamente, use os comandos:
    ```bash
    yarn add react-hot-toast
    yarn add @heroicons/react
    yarn add sweetalert2
    yarn add react-router-dom
    ```

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    ou, se estiver usando yarn:
    ```bash
    yarn dev
    ```

A aplicação estará disponível em [http://localhost:5173/](http://localhost:5173/).

## Funcionalidades

O sistema permite o gerenciamento de pontos geográficos, oferecendo ferramentas para visualizar, registrar e editar informações no mapa.

### Funcionalidades Implementadas
- Adicionar pontos geográficos, com a opção de incluí-los ao clicar no mapa;
- Editar informações de um ponto cadastrado;
- Listar todos os pontos registrados;
- Visualizar pontos em um mapa interativo;
- Destacar um ponto específico no mapa ao selecioná-lo na lista;
- Remover pontos do sistema;
- Exibir detalhes dos pontos registrados.

