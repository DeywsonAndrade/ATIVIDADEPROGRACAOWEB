// script.js

/**
 * ===============================================
 * MÓDULO 1: Configuração Básica, SPA e Templates
 * Gerencia a navegação básica SPA e renderização de dados
 * ===============================================
 */

// Simulação de dados para renderização de Templates
const projetos = [
    { id: 1, titulo: "Inclusão Digital para Idosos", descricao: "Oferecemos aulas de informática básica e uso de smartphones para pessoas da terceira idade, promovendo a inclusão social e digital.", icone: "💻" },
    { id: 2, titulo: "Reforço Escolar Comunitário", descricao: "Apoio pedagógico para crianças e adolescentes de baixa renda, com foco em português e matemática, para reduzir a evasão escolar.", icone: "📚" },
    { id: 3, titulo: "Horta Comunitária Sustentável", descricao: "Criação e manutenção de hortas em espaços ociosos da comunidade, com distribuição dos alimentos colhidos para famílias carentes.", icone: "🌱" },
];

const DOM = {
    main: document.querySelector('main'),
    // Usamos um seletor mais abrangente para pegar os links de navegação.
    navLinks: document.querySelectorAll('header nav ul li a'), 
};

/**
 * Cria o HTML para o bloco de projeto usando Template String.
 * @param {object} projeto - Objeto do projeto.
 * @returns {string} HTML do projeto.
 */
function criarTemplateProjeto(projeto) {
    return `
        <article class="projeto-card">
            <h3>${projeto.icone} ${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <a href="cadastro.html" class="cta-voluntariar">Quero Ajudar!</a>
        </article>
    `;
}

/**
 * Renderiza a lista de projetos na seção 'projetos-atuais'.
 */
function renderizarProjetos() {
    const projetosSection = document.getElementById('projetos-atuais');
    if (projetosSection) {
        let projetosHTML = '';
        projetos.forEach(projeto => {
            projetosHTML += criarTemplateProjeto(projeto);
        });

        // Substitui o conteúdo da seção 'projetos-atuais' com a lista gerada
        projetosSection.innerHTML = `
            <h2>Projetos Sociais Atuais</h2>
            <div class="projetos-grid">
                ${projetosHTML}
            </div>
        `;
    }
}

/**
 * Sistema de SPA Básico: Carrega o conteúdo de outras páginas sem recarregar.
 * @param {string} pageUrl - URL do arquivo HTML a ser carregado (ex: 'projeto.html').
 */
async function loadContent(pageUrl) {
    // Apenas carrega conteúdo se a URL for diferente da atual (para evitar loop)
    if (window.location.pathname.includes(pageUrl.replace('.html', '')) && pageUrl !== 'index.html') {
        return; 
    }

    try {
        const response = await fetch(pageUrl);
        const html = await response.text();

        // Pega apenas o conteúdo dentro da tag <main>
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newMainContent = doc.querySelector('main').innerHTML;

        DOM.main.innerHTML = newMainContent;
        history.pushState(null, null, pageUrl); // Atualiza a URL no navegador

        // Re-executa scripts específicos após carregar o conteúdo (ex: validação do form)
        if (pageUrl === 'cadastro.html') {
            setupFormValidation();
        } else if (pageUrl === 'projeto.html') {
             renderizarProjetos(); // Renderiza os projetos dinâmicos
        }
        
        // Atualiza o estado "active" na navegação
        DOM.navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = Array.from(DOM.navLinks).find(link => link.getAttribute('href') === pageUrl);
        if (activeLink) {
            activeLink.classList.add('active');
        }

    } catch (error) {
        console.error('Erro ao carregar o conteúdo:', error);
        // Em caso de falha, redireciona para a página estática
        window.location.href = pageUrl; 
    }
}

/**
 * ===============================================
 * MÓDULO 2: Validação de Formulário
 * Verifica a consistência de dados no formulário de cadastro.
 * ===============================================
 */

const formSelectors = {
    form: '#volunteenForm',
    nome: '#nome',
    telefone: '#telefone',
    idade: '#idade',
    disponibilidade: '#disponibilidade',
};

/**
 * Exibe uma mensagem de erro abaixo do campo.
 * @param {HTMLElement} inputElement - O campo de formulário.
 * @param {string} message - A mensagem de erro.
 */
function displayError(inputElement, message) {
    let errorDiv = inputElement.nextElementSibling;

    if (!errorDiv || !errorDiv.classList.contains('error-message')) {
        errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
    }
    errorDiv.textContent = message;
    inputElement.classList.add('input-error');
}

/**
 * Limpa a mensagem de erro de um campo.
 * @param {HTMLElement} inputElement - O campo de formulário.
 */
function clearError(inputElement) {
    inputElement.classList.remove('input-error');
    const errorDiv = inputElement.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-message')) {
        errorDiv.remove();
    }
}

/**
 * Valida o nome completo.
 * @param {string} nome - Valor do campo nome.
 * @returns {string|null} Mensagem de erro ou null se válido.
 */
function validateNome(nome) {
    if (nome.trim().length < 5 || !nome.trim().includes(' ')) {
        return 'O nome completo deve ter pelo menos 5 caracteres e incluir sobrenome.';
    }
    return null;
}

/**
 * Valida o telefone (checa o formato de número e tamanho).
 * @param {string} telefone - Valor do campo telefone.
 * @returns {string|null} Mensagem de erro ou null se válido.
 */
function validateTelefone(telefone) {
    const telefoneStr = String(telefone).trim();
    // Regex para checar se tem exatamente 10 (DDD + 8 dígitos) ou 11 (DDD + 9 dígitos) numéricos
    if (!/^\d{10,11}$/.test(telefoneStr)) {
         return 'O telefone deve ser um número válido com DDD (10 ou 11 dígitos, apenas números).';
    }
    return null;
}

/**
 * Valida a idade (checa o limite).
 * @param {number} idade - Valor do campo idade.
 * @returns {string|null} Mensagem de erro ou null se válido.
 */
function validateIdade(idade) {
    if (!Number.isInteger(idade) || idade <= 0) {
        return 'A idade deve ser um número inteiro positivo e válido.';
    }
    if (idade < 18) {
        return 'Você deve ter 18 anos ou mais para se cadastrar como voluntário.';
    }
    if (idade > 80) {
        return 'Idade máxima permitida é 80 anos.';
    }
    return null;
}

/**
 * Valida a disponibilidade (checa se algo foi selecionado).
 * @param {string} disponibilidade - Valor do campo disponibilidade.
 * @returns {string|null} Mensagem de erro ou null se válido.
 */
function validateDisponibilidade(disponibilidade) {
    if (!disponibilidade) {
        return 'Selecione uma opção de disponibilidade.';
    }
    return null;
}

/**
 * Função principal de validação no submit.
 * @param {Event} event - O evento de submit.
 */
function handleFormSubmit(event) {
    event.preventDefault();

    const form = document.querySelector(formSelectors.form);
    const nomeInput = document.querySelector(formSelectors.nome);
    const telefoneInput = document.querySelector(formSelectors.telefone);
    const idadeInput = document.querySelector(formSelectors.idade);
    const disponibilidadeSelect = document.querySelector(formSelectors.disponibilidade);

    let isValid = true;

    // --- Executa todas as validações ---
    
    // Nome
    clearError(nomeInput);
    const nomeError = validateNome(nomeInput.value);
    if (nomeError) {
        displayError(nomeInput, nomeError);
        isValid = false;
    }

    // Telefone
    clearError(telefoneInput);
    const telefoneError = validateTelefone(telefoneInput.value);
    if (telefoneError) {
        displayError(telefoneInput, telefoneError);
        isValid = false;
    }

    // Idade
    clearError(idadeInput);
    const idadeError = validateIdade(Number(idadeInput.value));
    if (idadeError) {
        displayError(idadeInput, idadeError);
        isValid = false;
    }

    // Disponibilidade
    clearError(disponibilidadeSelect);
    const dispError = validateDisponibilidade(disponibilidadeSelect.value);
    if (dispError) {
        displayError(disponibilidadeSelect, dispError);
        isValid = false;
    }

    // Se tudo estiver válido, simula o envio e exibe a mensagem de sucesso
    if (isValid) {
        const successMessage = document.getElementById('sucessMessage');
        
        console.log("Cadastro Válido. Dados para envio:", {
            nome: nomeInput.value,
            telefone: telefoneInput.value,
            idade: Number(idadeInput.value),
            disponibilidade: disponibilidadeSelect.value
        });

        form.reset(); // Limpa o formulário
        if(successMessage) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000); // Esconde a mensagem após 5 segundos
        }
    }
}

/**
 * Configura os listeners de validação e submit.
 */
function setupFormValidation() {
    const form = document.querySelector(formSelectors.form);
    if (form) {
        // Remove listeners prévios para evitar duplicação em ambientes SPA
        form.removeEventListener('submit', handleFormSubmit); 
        
        // Adiciona o novo listener para a validação robusta
        form.addEventListener('submit', handleFormSubmit);

        // Adiciona listeners para feedback em tempo real
        document.querySelectorAll('input, select').forEach(input => {
            if (input.form === form) { // Garante que o input pertence a este formulário
                 input.addEventListener('blur', () => { // Valida ao perder o foco
                    const name = input.name;
                    let error = null;
                    clearError(input);

                    if (name === 'nome') error = validateNome(input.value);
                    if (name === 'telefone') error = validateTelefone(input.value);
                    if (name === 'idade') error = validateIdade(Number(input.value));
                    if (name === 'disponibilidade') error = validateDisponibilidade(input.value);

                    if (error) {
                        displayError(input, error);
                    }
                });
            }
        });
    }
}

/**
 * ===============================================
 * INICIALIZAÇÃO
 * Configura todos os eventos na carga da página.
 * ===============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configurar Validação do Formulário (se estiver na página de cadastro)
    setupFormValidation(); 

    // 2. Configurar o SPA Básico (para navegação entre as páginas)
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.endsWith('.html')) { 
                e.preventDefault();
                loadContent(href);
            }
        });
    });

    // 3. Renderizar Projetos Dinâmicos (se estiver na página de projetos)
    if (window.location.pathname.includes('projeto.html')) {
        renderizarProjetos();
    }
});