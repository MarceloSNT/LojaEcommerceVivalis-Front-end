const produtos = [
  {
    nome: "Brisa Serena",
    descricao:
      " Elegante fragrância feminina de flores e cítricos; ideal para o dia a dia.",
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
    descricao:
      "Difusor com vela de soja e fragrância de algodão e ervas matinais.",
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

function renderizarProdutos(lista) {
  const container = document.getElementById("mostrar-produtos");
  container.innerHTML = "";
  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  lista.forEach((produto) => {
    const col = document.createElement("div");
    col.className = "mb-5 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="categorias cardTema text-dark bg-light card mb-5 border border-dark rounded rounded-3 text-center  p-0 pb-3 h-100">
        <img src="${produto.imagem}" class="imgCards image-fluid card-img-top" "alt="${produto.nome}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">Categoria: ${produto.categoria}</p>
          <p class="card-text">${produto.descricao}</p>
          <h3 class="text-center">R$${produto.preco}</h3>
          <a href="#" class="btn btn-success mt-auto">Adicionar ao carrinho</a>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

function filtrarCategoria(categoria) {
  if (!categoria) return produtos;
  return produtos.filter((p) => p.categoria === categoria);
}

// Eventos dos botões de filtro
document.getElementById("filtros").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    // Troca classe ativa
    Array.from(this.children).forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    // Filtra e renderiza
    const categoria = e.target.getAttribute("data-categoria");
    renderizarProdutos(filtrarCategoria(categoria));
  }
});

// Filtro por texto (input)
document.getElementById("inputValue").addEventListener("input", function () {
  const filtroInput = this.value.toLowerCase();
  const listaFiltrada = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(filtroInput) ||
    produto.descricao.toLowerCase().includes(filtroInput)
  );
  renderizarProdutos(listaFiltrada);
  aplicarTemaNosCards();
});

// Inicialização
renderizarProdutos(produtos);

const btnFiltros = document.getElementById("btnFiltros");
const filtrosDiv = document.getElementById("filtros");

btnFiltros.addEventListener("click", () => {
  filtrosDiv.classList.toggle("d-none");
});
function aplicarTemaNosCards() {
  const mainTema = document.getElementById("mainTema");
  const cardTema = document.querySelectorAll(".cardTema");
  if (mainTema.classList.contains("bg-dark")) {
    cardTema.forEach((cards) => {
      cards.classList.add("border-dark");
      cards.classList.add("bg-dark");
      cards.classList.add("text-white");
      cards.classList.remove("bg-light");
      cards.classList.remove("text-dark");
    });
  } else {
    cardTema.forEach((cards) => {
      cards.classList.remove("border-dark");
      cards.classList.remove("bg-dark");
      cards.classList.remove("text-white");
      cards.classList.add("bg-light");
      cards.classList.add("text-dark");
    });
  }
}

// Filtro por categoria (botões)
document.getElementById("filtros").addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON") {
    Array.from(this.children).forEach((btn) => btn.classList.remove("active"));
    e.target.classList.add("active");
    const categoria = e.target.getAttribute("data-categoria");
    renderizarProdutos(filtrarCategoria(categoria));
    aplicarTemaNosCards();
  }
});

// Botão de alternância de tema
btnTema.addEventListener("click", () => {
  mainTema.classList.toggle("bg-dark");
  aplicarTemaNosCards(); 
});

// Função para adicionar produto ao carrinho
function addProdutoCarrinho(produtos) {
  let itens = JSON.parse(localStorage.getItem("itens")) || [];
  itens.push(produtos);
  localStorage.setItem("itens", JSON.stringify(itens));
  alert("Produto adicionado ao carrinho!");
}

// Delegação de evento para os botões de adicionar ao carrinho
document
  .getElementById("mostrar-produtos")
  .addEventListener("click", function (e) {
    if (e.target.classList.contains("btn-success")) {
      const card = e.target.closest(".card");
      const nome = card.querySelector(".card-title").textContent;
      const descricao = card.querySelectorAll(".card-text")[1].textContent;
      const imagem = card.querySelector("img").getAttribute("src");
      const produto = produtos.find(
        (p) =>
          p.nome === nome &&
          p.preco &&
          p.descricao === descricao &&
          p.imagem === imagem
      );
      if (produto) {
        addProdutoCarrinho(produto);
      }
    }
  });

document.getElementById("chatBtn").addEventListener("click", function () {
  const chat = document.getElementById("chat");
  chat.classList.toggle("d-none");
});

function verificarHorario() {
  const data = new Date();
  const hora = data.getHours();
  const chat = document.getElementById("chat");
  const horaInicial = 8;
  const horaFinal = 18;

  if (!chat.classList.contains("d-none")) {
    chat.classList.add("d-none");
    return;
  }
  if (hora >= horaInicial && hora < horaFinal) {
    chat.classList.remove("d-none");
  } else {
    alert("Fora de horário de atendimento");
  }
}
document.getElementById("chatBtn").addEventListener("click", alternarChatHorario);
