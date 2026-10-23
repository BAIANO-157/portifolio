/* ==========================================================================
   PORTFÓLIO DEV - LUCCAS PAULO MONGE JUSTO
   JavaScript Vanilla (Didático para 1º Ano Técnico em Informática)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ------------------------------------------------------------------------
     1. TEMA ESCURO E CLARO (DARK / LIGHT MODE)
     ------------------------------------------------------------------------ */
  const botaoTema = document.getElementById('botao-tema');
  const elementoHtml = document.documentElement;

  // Busca o tema preferido salvo no navegador
  const temaSalvo = localStorage.getItem('tema_portfolio') || 'escuro';
  elementoHtml.setAttribute('data-tema', temaSalvo);

  function alternarTema() {
    const temaAtual = elementoHtml.getAttribute('data-tema');
    const novoTema = temaAtual === 'escuro' ? 'claro' : 'escuro';
    
    elementoHtml.setAttribute('data-tema', novoTema);
    localStorage.setItem('tema_portfolio', novoTema);
  }

  if (botaoTema) {
    botaoTema.addEventListener('click', alternarTema);
  }


  /* ------------------------------------------------------------------------
     2. MENU HAMBÚRGUER RESPONSIVO (MOBILE)
     ------------------------------------------------------------------------ */
  const botaoMenuMobile = document.getElementById('botao-menu-mobile');
  const menuNavegacao = document.getElementById('menu-navegacao');
  const linksNavegacao = document.querySelectorAll('.link-navegacao');

  if (botaoMenuMobile && menuNavegacao) {
    botaoMenuMobile.addEventListener('click', () => {
      menuNavegacao.classList.toggle('aberto');
    });

    linksNavegacao.forEach(link => {
      link.addEventListener('click', () => {
        menuNavegacao.classList.remove('aberto');
      });
    });
  }


  /* ------------------------------------------------------------------------
     3. EFEITO MÁQUINA DE ESCREVER (TYPING EFFECT)
     ------------------------------------------------------------------------ */
  const elementoMaquina = document.getElementById('texto-maquina-escrever');
  const frases = [
    'Estudante Full Stack',
    'Especialista Front-end em Formação',
    'HTML5, CSS3 & JavaScript Vanilla',
    'SESC ESCOLA & SENAC (2026)'
  ];

  let indiceFrase = 0;
  let indiceCaractere = 0;
  let estaApagando = false;

  function executarEfeitoMaquina() {
    if (!elementoMaquina) return;

    const fraseAtual = frases[indiceFrase];

    if (estaApagando) {
      elementoMaquina.textContent = fraseAtual.substring(0, indiceCaractere - 1);
      indiceCaractere--;
    } else {
      elementoMaquina.textContent = fraseAtual.substring(0, indiceCaractere + 1);
      indiceCaractere++;
    }

    let tempoEspera = estaApagando ? 50 : 100;

    if (!estaApagando && indiceCaractere === fraseAtual.length) {
      tempoEspera = 2000; // Tempo de pausa com o texto completo
      estaApagando = true;
    } else if (estaApagando && indiceCaractere === 0) {
      estaApagando = false;
      indiceFrase = (indiceFrase + 1) % frases.length;
      tempoEspera = 500;
    }

    setTimeout(executarEfeitoMaquina, tempoEspera);
  }

  executarEfeitoMaquina();


  /* ------------------------------------------------------------------------
     4. BOTÃO VOLTAR AO TOPO & ANO AUTOMÁTICO
     ------------------------------------------------------------------------ */
  const botaoVoltarTopo = document.getElementById('botao-voltar-topo');
  const elementoAnoAtual = document.getElementById('ano-atual');

  if (elementoAnoAtual) {
    elementoAnoAtual.textContent = new Date().getFullYear();
  }

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      botaoVoltarTopo.classList.add('visivel');
    } else {
      botaoVoltarTopo.classList.remove('visivel');
    }
  });

  if (botaoVoltarTopo) {
    botaoVoltarTopo.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }


  /* ------------------------------------------------------------------------
     5. ANIMAÇÃO DE ENTRADA AO ROLAR A PÁGINA
     ------------------------------------------------------------------------ */
  const elementosRevelacao = document.querySelectorAll('.revelacao');

  const observadorScroll = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('ativo');
      }
    });
  }, {
    threshold: 0.1
  });

  elementosRevelacao.forEach(elemento => {
    observadorScroll.observe(elemento);
  });

});