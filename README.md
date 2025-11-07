# 💙 Projeto ONG de Voluntariado (Trabalho Acadêmico)

![Status: Concluído](https://img.shields.io/badge/status-concluído-brightgreen)

Projeto acadêmico para a disciplina de ** Desenvolvimento Front-End Para Web** com o objetivo de criar uma plataforma web para uma ONG de voluntariado. O projeto implementa padrões profissionais de desenvolvimento, acessibilidade WCAG 2.1 AA e otimização para produção.

## ✨ Funcionalidades Principais

* **Navegação SPA (Single Page Application):** Carregamento de páginas (Início, Projetos, Cadastro) sem recarregar o navegador, utilizando JavaScript para buscar e injetar o conteúdo.
* **Renderização Dinâmica:** A página "Projetos" é renderizada dinamicamente via JavaScript.
* **Formulário de Cadastro Acessível:** Validação robusta de formulário (Nome, Telefone, Idade) com feedback em tempo real e uso de atributos ARIA (`aria-invalid`, `aria-describedby`) para leitores de tela.
* **Acessibilidade (WCAG 2.1 Nível AA):**
    * **Contraste de Cores:** Paleta de cores ajustada para garantir um contraste mínimo de 4.5:1.
    * **Navegação por Teclado:** Funcionalidade completa de navegação usando apenas o teclado.
    * **Gestão de Foco:** O foco é gerenciado programaticamente durante a navegação SPA para guiar leitores de tela.
    * **Modo Escuro:** Suporte automático ao tema escuro do sistema operacional (`prefers-color-scheme`).

## 🛠️ Tecnologias Utilizadas

* **HTML5 Semântico:** Estrutura de página otimizada para acessibilidade.
* **CSS3:** Flexbox, Grid, Variáveis CSS e Media Queries (Mobile-First).
* **JavaScript (ES6+):** Manipulação do DOM, `fetch` API, Validação de Formulários e SPA.
* **Git & GitHub:**
    * **GitFlow:** Estratégia de *branching* (`main`, `develop`, `feature/*`).
    * **Commits Semânticos:** Histórico de commits claro e organizado.
    * **Issues & Pull Requests:** Gerenciamento de tarefas e revisão de código.

## 🚀 Como Executar o Projeto

1.  Clone este repositório:
    ```bash
    git clone https://github.com/DeywsonAndrade/ATIVIDADEPROGRACAOWEB
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd ATIVIDADEPROGRACAOWEB
    ```
3.  Abra o arquivo `index.html` no seu navegador de preferência.

## 🧑‍💻 Autor

* **[Deywson Andrade]**
* **GitHub:** `@DeywsonAndrade`
