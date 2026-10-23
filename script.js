/* ==========================================
   VARIÁVEIS E SELETORES DO DOM
   ================================---------- */
const botaoAlternarTema = document.getElementById('botao-alternar-tema');
const iconeTema = document.getElementById('icone-tema');
const htmlDocumento = document.documentElement;

const botaoHamburguer = document.getElementById('botao-hamburguer');
const menuNavegacao = document.getElementById('menu-navegacao');
const linksMenu = document.querySelectorAll('.link-menu');

const elementoMaquina = document.getElementById('elemento-maquina');
const botaoTopo = document.getElementById('botao-topo');
const spanAnoAtual = document.getElementById('ano-atual');

/* ==========================================
   1. SISTEMA DE TEMA (CLARO / ESCURO) COM LOCALSTORAGE
   ================================---------- */
// Verificar preferência salva no navegador ao carregar a página
const temaSalvo = localStorage.getItem('tema_portfolio');
if (temaSalvo) {
    htmlDocumento.setAttribute('data-tema', temaSalvo);
    atualizarIconeTema(temaSalvo);
}

// Evento de clique para alternar o tema
botaoAlternarTema.addEventListener('click', () => {
    const temaAtual = htmlDocumento.getAttribute('data-tema');
    const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';

    htmlDocumento.setAttribute('data-tema', novoTema);
    localStorage.setItem('tema_portfolio', novoTema);
    atualizarIconeTema(novoTema);
});

// Função auxiliar para trocar o ícone do botão de tema
function atualizarIconeTema(tema) {
    if (tema === 'claro') {
        iconeTema.className = 'bi bi-sun-fill';
    } else {
        iconeTema.className = 'bi bi-moon-fill';
    }
}

/* ==========================================
   2. MENU HAMBÚRGUER (MOBILE)
   ================================---------- */
botaoHamburguer.addEventListener('click', () => {
    menuNavegacao.classList.toggle('ativo');
    const iconeMenu = botaoHamburguer.querySelector('i');
    
    if (menuNavegacao.classList.contains('ativo')) {
        iconeMenu.className = 'bi bi-x-lg';
    } else {
        iconeMenu.className = 'bi bi-list';
    }
});

// Fechar menu ao clicar em qualquer link de navegação
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuNavegacao.classList.remove('ativo');
        botaoHamburguer.querySelector('i').className = 'bi bi-list';
    });
});

/* ==========================================
   3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
   ================================---------- */
const palavrasTexto = [
    'Estudante de Desenvolvimento Full Stack',
    'Desenvolvedor Front-end',
    'Entusiasta de Tecnologia e Inovação'
];

let indicePalavraAtual = 0;
let indiceCaractereAtual = 0;
let estaApagando = false;
let velocidadeDigitacao = 100;

function executarMaquinaDeEscrever() {
    const palavraCompleta = palavrasTexto[indicePalavraAtual];

    if (estaApagando) {
        elementoMaquina.textContent = palavraCompleta.substring(0, indiceCaractereAtual - 1);
        indiceCaractereAtual--;
        velocidadeDigitacao = 50;
    } else {
        elementoMaquina.textContent = palavraCompleta.substring(0, indiceCaractereAtual + 1);
        indiceCaractereAtual++;
        velocidadeDigitacao = 100;
    }

    // Quando terminar de digitar a palavra inteira
    if (!estaApagando && indiceCaractereAtual === palavraCompleta.length) {
        estaApagando = true;
        velocidadeDigitacao = 2000; // Pausa antes de começar a apagar
    } 
    // Quando terminar de apagar a palavra
    else if (estaApagando && indiceCaractereAtual === 0) {
        estaApagando = false;
        indicePalavraAtual = (indicePalavraAtual + 1) % palavrasTexto.length;
        velocidadeDigitacao = 500;
    }

    setTimeout(executarMaquinaDeEscrever, velocidadeDigitacao);
}

// Iniciar efeito ao carregar a página
document.addEventListener('DOMContentLoaded', executarMaquinaDeEscrever);

/* ==========================================
   4. BOTÃO "VOLTAR AO TOPO" & SCROLL SUAVE
   ================================---------- */
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        botaoTopo.classList.add('visivel');
    } else {
        botaoTopo.classList.remove('visivel');
    }
});

botaoTopo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* ==========================================
   5. ANO DINÂMICO NO RODAPÉ
   ================================---------- */
spanAnoAtual.textContent = new Date().getFullYear();