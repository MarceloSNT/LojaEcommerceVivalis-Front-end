const produtos = [
  {
    nome: "Brisa Serena",
    descricao: " Elegante fragrância feminina de flores e cítricos; ideal para o dia a dia.",
    categoria: "perfume",
    preco: 189.99,
    imagem: "imagens/brisa-serena-perfume.jpg",
  },
  {
    nome: "Noite Intensa",
    descricao: "Aroma unissex amadeirado com especiarias quentes; sofisticado.",
    categoria: "perfume",
    preco: 219.99,
    imagem: "imagens/noite-intensa-perfume.jpg",
  },
  {
    nome: "Alpine Pure",
    descricao: "Sabonete artesanal com aroma fresco de ervas alpinas.",
    categoria: "sabonete",
    preco: 25.0,
    imagem: "imagens/alpine-pure-sabonete.jpg",
  },
  {
    nome: "Jasmim Sublime",
    descricao: "Barra perfumada com essência floral suave e relaxante.",
    categoria: "sabonete",
    preco: 29.97,
    imagem: "imagens/jasmine-sublime-sabonete.jpg",
  },
  {
    nome: "Natural Shine",
    descricao: "Shampoo nutritivo com extrato de bambu para fios brilhantes.",
    categoria: "shampoo",
    preco: 39.98,
    imagem: "imagens/natura-sunshine-shampoo.jpg",
  },
  {
    nome: "Frescor Revitalizante",
    descricao: "Shampoo com mentol e cítricos para limpeza e frescor intenso.",
    categoria: "shampoo",
    preco: 34.99,
    imagem: "imagens/frescor-revitalizante-shampoo.jpg",
  },
  {
    nome: "Amanhecer Leve",
    descricao: "Difusor com vela de soja e fragrância de algodão e ervas matinais.",
    categoria: "difusorAroma",
    preco: 79.99,
    imagem: "imagens/amanhecer-leve-difusorAroma.jpg",
  },
  {
    nome: "Tranquilidade da Floresta",
    descricao: "Difusor elétrico com aroma amadeirado de cedro e pinho.",
    categoria: "difusorAroma",
    preco: 99.9,
    imagem: "imagens/tranquilidade-floresta-difusorAroma.jpg",
  },
];

const produtosComId = produtos.map((p, index) => ({ ...p, id: index }));
const mainTema = document.getElementById("mainTema");
const btnTema = document.getElementById("btnTema");
const inputValue = document.getElementById("inputValue");
const filtros = document.getElementById("filtros");
const mostrarProdutosContainer = document.getElementById("mostrar-produtos");
const chatBtn = document.getElementById("chatBtn");
const chat = document.getElementById("chat");

// Função para renderizar os produtos na tela
function renderizarProdutos(lista) {
  mostrarProdutosContainer.innerHTML = "";
  if (lista.length === 0) {
    mostrarProdutosContainer.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  lista.forEach((produto) => {
    const col = document.createElement("div");
    col.className = "mb-5 mt-5 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="card  shadow-sm rounded-3 text-center p-0 pb-3 h-100 cardTema" data-id="${produto.id}">
        <img src="${produto.imagem}" class="img-fluid card-img-top rounded-top" alt="${produto.nome}" style="height: 250px; object-fit: cover;">
        <div class="card-body d-flex flex-column justify-content-between p-3">
          <div class="text-start">
            <h5 class="card-title fs-5 fw-bold mb-2">${produto.nome}</h5>
            <p class="card-text mb-1">${produto.descricao}</p>
            <span class="badge opacity-50 text-white text-bg-secondary mb-3">${produto.categoria}</span>
          </div>
          <div class="mt-auto">
            <h4 class="text-end fs-4 fw-bold mb-3">R$ ${produto.preco.toFixed(2)}</h4>
            <div class="d-flex align-items-center justify-content-center gap-2">
              <div class="btn-group">
                <button class="btn btn-outline-success btn-sm diminuir-qtd rounded-start-3" type="button">-</button>
                <span class="px-3 py-1  border-top border-bottom quantidade-display">1</span>
                <button class="btn btn-outline-success btn-sm aumentar-qtd rounded-end-3" type="button">+</button>
              </div>
              <button class="btn btn-success btn-sm adicionar-carrinho flex-grow-1">Adicionar</button>
            </div>
          </div>
        </div>
      </div>
    `;
    mostrarProdutosContainer.appendChild(col);
  });
  aplicarTemaNosCards();
}

function filtrarCategoria(categoria) {
  if (!categoria) return produtosComId;
  return produtosComId.filter((p) => p.categoria === categoria);
}

function atualizarContadorCarrinho() {
  const itens = JSON.parse(localStorage.getItem("itens")) || [];
  const contadorElement = document.getElementById("contadorCarrinho");
  if (contadorElement) {
    const totalProdutos = itens.reduce((total, item) => total + item.quantidade, 0);
    contadorElement.textContent = totalProdutos;
  }
}

function addProdutoCarrinho(produto, quantidade) {
  let itens = JSON.parse(localStorage.getItem("itens")) || [];
  const produtoExistente = itens.find(item => item.id === produto.id);

  if (produtoExistente) {
    produtoExistente.quantidade += quantidade;
  } else {
    const novoProduto = { ...produto, quantidade: quantidade };
    itens.push(novoProduto);
  }

  localStorage.setItem("itens", JSON.stringify(itens));
  alert(`${quantidade} ${quantidade > 1 ? 'produtos adicionados' : 'produto adicionado'} ao carrinho!`);
  atualizarContadorCarrinho();
}

function aplicarTemaNosCards() {
  const cardTema = document.querySelectorAll(".cardTema");
  if (mainTema.classList.contains("bg-dark")) {
    cardTema.forEach((cards) => {
      cards.classList.remove("bg-white", "text-dark");
      cards.classList.add("bg-dark", "text-white" , "border-light");
      
    });
  } else {
    cardTema.forEach((cards) => {
      cards.classList.remove("bg-dark", "text-white");
      cards.classList.add("bg-white", "text-dark");
    });
  }
}

function alternarChatHorario() {
  const data = new Date();
  const hora = data.getHours();
  const horaInicial = 8;
  const horaFinal = 18;

  if (!chat.classList.contains("d-none")) {
    chat.classList.add("d-none");
    return;
  }

  if (hora >= horaInicial && hora < horaFinal) {
    chat.classList.remove("d-none");
  } else {
    alert("Fora de horário de atendimento.");
  }
}

// --- Event Listeners ---

filtros.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    Array.from(this.children).forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    const categoria = e.target.getAttribute("data-categoria");
    renderizarProdutos(filtrarCategoria(categoria));
  }
});

inputValue.addEventListener("input", function () {
  const filtroInput = this.value.toLowerCase();
  const listaFiltrada = produtosComId.filter(produto =>
    produto.nome.toLowerCase().includes(filtroInput) ||
    produto.descricao.toLowerCase().includes(filtroInput)
  );
  renderizarProdutos(listaFiltrada);
});

btnTema.addEventListener("click", () => {
  mainTema.classList.toggle("bg-dark");
  aplicarTemaNosCards();
});

mostrarProdutosContainer.addEventListener("click", function (e) {
  const card = e.target.closest(".card");
  if (!card) return;

  const display = card.querySelector(".quantidade-display");
  let quantidade = parseInt(display.textContent);

  if (e.target.classList.contains("diminuir-qtd")) {
    if (quantidade > 1) {
      quantidade--;
      display.textContent = quantidade;
    }
  }
  
  if (e.target.classList.contains("aumentar-qtd")) {
    if (quantidade < 99) {
      quantidade++;
      display.textContent = quantidade;
    }
  }
  
  if (e.target.classList.contains("adicionar-carrinho")) {
    const produtoId = parseInt(card.getAttribute("data-id"));
    const produto = produtosComId.find(p => p.id === produtoId);
    if (produto) {
      addProdutoCarrinho(produto, quantidade);
      display.textContent = "1";
    }
  }
});

chatBtn.addEventListener("click", alternarChatHorario);

document.addEventListener("DOMContentLoaded", () => {
  renderizarProdutos(produtosComId);
  atualizarContadorCarrinho();
});