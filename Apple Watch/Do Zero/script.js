// script.js (versão com verificação e logs)

// Mapeamento das cores — verifique se os nomes das pastas batem com a sua estrutura de arquivos
const opcoesCores = [
  { nome: "Verde-cipreste", pasta: "verde-cipreste" },
  { nome: "Azul-inverno", pasta: "azul-inverno" },
  { nome: "Meia-noite", pasta: "meia-noite" },
  { nome: "Estelar", pasta: "estelar" },
  { nome: "Rosa-claro", pasta: "rosa-claro" },
];

// Função utilitária para logar erros amigáveis
function logErro(contexto, erro) {
  console.error(`[script.js] Erro em ${contexto}:`, erro);
}

// Atualiza o nome da cor, miniaturas e imagem principal
function atualizarCorSelecionada() {
  try {
    const corSelecionada = document.querySelector('input[name="opcao-cor"]:checked');
    if (!corSelecionada) {
      console.warn("[script.js] Nenhuma opção de cor marcada.");
      return;
    }

    const indice = parseInt(corSelecionada.id.split("-")[0], 10);
    if (Number.isNaN(indice) || indice < 0 || indice >= opcoesCores.length) {
      console.warn("[script.js] Índice da cor inválido:", corSelecionada.id);
      return;
    }

    const cor = opcoesCores[indice];
    const nomeCorEl = document.getElementById("nome-cor-selecionada");
    const imagemVisualizacao = document.getElementById("imagem-visualizacao");

    if (!nomeCorEl || !imagemVisualizacao) {
      console.warn("[script.js] Elementos #nome-cor-selecionada ou #imagem-visualizacao não encontrados.");
      return;
    }

    // Atualiza texto
    nomeCorEl.textContent = `Cor - ${cor.nome}`;

    // Atualiza miniaturas (assume 3 miniaturas: 0,1,2)
    for (let i = 0; i < 3; i++) {
      const miniId = `${i}-imagem-miniatura`;
      const miniEl = document.getElementById(miniId);
      if (!miniEl) {
        console.warn(`[script.js] Miniatura ${miniId} não encontrada no DOM.`);
        continue;
      }
      const novoSrc = `./imagens/opcoes-cores/imagens-${cor.pasta}/imagem-${i}.jpeg`;
      miniEl.src = novoSrc;
      miniEl.dataset.src = novoSrc; // guarda referência caso precise
    }

    // Atualiza imagem principal para a imagem "1" por padrão
    const principalSrc = `./imagens/opcoes-cores/imagens-${cor.pasta}/imagem-1.jpeg`;
    imagemVisualizacao.src = principalSrc;

    // garante que o rádio da imagem 1 fique marcado (se existir)
    const radioImg1 = document.getElementById("1-imagem");
    if (radioImg1) radioImg1.checked = true;

    console.log(`[script.js] Cor atualizada para "${cor.nome}" (pasta: ${cor.pasta})`);
  } catch (e) {
    logErro("atualizarCorSelecionada", e);
  }
}

// Atualiza o tamanho da visualização (classe caixa-pequena)
function atualizarTamanho() {
  try {
    const tamanhoSelecionado = document.querySelector('input[name="opcao-tamanho"]:checked');
    const containerVisualizacao = document.getElementById("visualizacao");

    if (!containerVisualizacao) {
      console.warn("[script.js] #visualizacao não encontrado.");
      return;
    }

    if (!tamanhoSelecionado) {
      console.warn("[script.js] Nenhuma opção de tamanho marcada.");
      return;
    }

    if (tamanhoSelecionado.id.startsWith("0")) {
      // 41 mm → aplica classe que reduz escala
      containerVisualizacao.classList.add("caixa-pequena");
      console.log("[script.js] Tamanho: 41 mm (caixa-pequena adicionada)");
    } else {
      containerVisualizacao.classList.remove("caixa-pequena");
      console.log("[script.js] Tamanho: 45 mm (caixa-pequena removida)");
    }
  } catch (e) {
    logErro("atualizarTamanho", e);
  }
}

// Atualiza a imagem principal quando uma miniatura é selecionada
function atualizarImagemSelecionada() {
  try {
    const corSelecionada = document.querySelector('input[name="opcao-cor"]:checked');
    if (!corSelecionada) {
      console.warn("[script.js] atualizarImagemSelecionada: cor não selecionada.");
      return;
    }

    const idCor = parseInt(corSelecionada.id.split("-")[0], 10);
    if (Number.isNaN(idCor) || idCor < 0 || idCor >= opcoesCores.length) {
      console.warn("[script.js] atualizarImagemSelecionada: idCor inválido:", corSelecionada.id);
      return;
    }
    const cor = opcoesCores[idCor];

    const imagemSelecionadaRadio = document.querySelector('input[name="opcao-imagem"]:checked');
    if (!imagemSelecionadaRadio) {
      console.warn("[script.js] Nenhuma miniatura marcada.");
      return;
    }
    const idImagem = parseInt(imagemSelecionadaRadio.id.split("-")[0], 10);
    if (Number.isNaN(idImagem)) {
      console.warn("[script.js] idImagem inválido:", imagemSelecionadaRadio.id);
      return;
    }

    const imagemVisualizacao = document.getElementById("imagem-visualizacao");
    if (!imagemVisualizacao) {
      console.warn("[script.js] #imagem-visualizacao não encontrado.");
      return;
    }

    // tenta usar miniatura (dataset) se disponível, senão monta caminho
    const miniThumb = document.getElementById(`${idImagem}-imagem-miniatura`);
    const novoSrc = (miniThumb && miniThumb.dataset && miniThumb.dataset.src)
      ? miniThumb.dataset.src
      : `./imagens/opcoes-cores/imagens-${cor.pasta}/imagem-${idImagem}.jpeg`;

    imagemVisualizacao.src = novoSrc;
    console.log(`[script.js] Imagem principal trocada para imagem-${idImagem} da cor ${cor.nome}`);
  } catch (e) {
    logErro("atualizarImagemSelecionada", e);
  }
}

// Adiciona listeners aos inputs (torna o script independente dos onclick inline)
function conectarEventListeners() {
  try {
    // cores
    const radiosCor = document.querySelectorAll('input[name="opcao-cor"]');
    radiosCor.forEach(r => r.addEventListener("change", atualizarCorSelecionada));

    // tamanhos
    const radiosTamanho = document.querySelectorAll('input[name="opcao-tamanho"]');
    radiosTamanho.forEach(r => r.addEventListener("change", atualizarTamanho));

    // imagens
    const radiosImagem = document.querySelectorAll('input[name="opcao-imagem"]');
    radiosImagem.forEach(r => r.addEventListener("change", atualizarImagemSelecionada));

    // clique nas miniaturas (opcional: marca o radio correspondente se o usuário clicar na imagem)
    for (let i = 0; i < 3; i++) {
      const mini = document.getElementById(`${i}-imagem-miniatura`);
      const radio = document.getElementById(`${i}-imagem`);
      if (mini && radio) {
        mini.addEventListener("click", () => {
          radio.checked = true;
          // Trigger manualmente a troca
          atualizarImagemSelecionada();
        });
      }
    }

    console.log("[script.js] Event listeners conectados.");
  } catch (e) {
    logErro("conectarEventListeners", e);
  }
}

// Inicialização
window.addEventListener("DOMContentLoaded", () => {
  try {
    conectarEventListeners();
    // chama as rotinas de setup - se os elementos não existirem, as funções avisarão no console
    atualizarCorSelecionada();
    atualizarTamanho();
  } catch (e) {
    logErro("DOMContentLoaded", e);
  }
});
