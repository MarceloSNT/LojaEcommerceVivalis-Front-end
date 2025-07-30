const produtos = [
  {
    nome: "Brisa Serena",
    descricao: " Elegante fragrância feminina de flores e cítricos; ideal para o dia a dia.",
    categoria: "perfume",
    preco: 189.90,
    imagem: "imagens/brisa-serena-perfume.jpg"
  },
  {
    nome: "Noite Intensa",
    descricao: "Aroma unissex amadeirado com especiarias quentes; sofisticado.",
    categoria: "perfume",
    preco: 219.90,
    imagem: "imagens/noite-intensa-perfume.jpg"
  },
  {
    nome: "Alpine Pure",
    descricao: "Sabonete artesanal com aroma fresco de ervas alpinas.",
    categoria: "sabonete",
    preco:24.90,
    imagem: "imagens/alpine-pure-sabonete.jpg"
  },
  {
    nome: "Jasmim Sublime",
    descricao: "Barra perfumada com essência floral suave e relaxante.",
    categoria: "sabonete",
    preco:29.90,
    imagem: "imagens/jasmine-sublime-sabonete.jpg"
  },
  {
    nome: "Natural Shine",
    descricao: "Shampoo nutritivo com extrato de bambu para fios brilhantes.",
    categoria: "shampoo",
    preco:39.90,
    imagem: "imagens/natura-sunshine-shampoo.jpg"
  },
  {
    nome: "Frescor Revitalizante",
    descricao: "Shampoo com mentol e cítricos para limpeza e frescor intenso.",
    categoria: "shampoo",
    preco:34.90,
    imagem: "imagens/frescor-revitalizante-shampoo.jpg"
  },
  {
    nome: "Amanhecer Leve",
    descricao: "Difusor com vela de soja e fragrância de algodão e ervas matinais.",
    categoria: "difusorAroma",
    preco:79.90,
    imagem: "imagens/amanhecer-leve-difusorAroma.jpg"
  },
  {
    nome: "Tranquilidade da Floresta",
    descricao: "Difusor elétrico com aroma amadeirado de cedro e pinho.",
    categoria: "difusorAroma",
    preco:99.90,
    imagem: "imagens/tranquilidade-floresta-difusorAroma.jpg"
  },

];

function renderizarProdutos(lista) {
  const container = document.getElementById("mostrar-produtos");
  container.innerHTML = "";
  if (lista.length === 0) {
    container.innerHTML = "<p>Nenhum produto encontrado.</p>";
    return;
  }
  lista.forEach(produto => {
    const col = document.createElement("div");
    col.className = "mb-5 col-md-4 col-lg-3";
    col.innerHTML = `
      <div class="categorias cardTema text-dark bg-light card mb-5 border border-dark rounded rounded-3 text-center  p-0 pb-3 h-100">
        <img src="${produto.imagem}" class="imgCards card-img-top image-fluid" "alt="${produto.nome}">
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
  return produtos.filter(p => p.categoria === categoria);
}

// Eventos dos botões de filtro
document.getElementById("filtros").addEventListener("click", function(e) {
  if (e.target.tagName === "BUTTON") {
    // Troca classe ativa
    Array.from(this.children).forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");
    // Filtra e renderiza
    const categoria = e.target.getAttribute("data-categoria");
    renderizarProdutos(filtrarCategoria(categoria));
  }
});

function filtrarInput(){
  const filtroInput = document.getElementById("inputValue").value.toLowerCase();
  const name = document.querySelectorAll(".card-title");
  const prod = document.querySelectorAll(".categorias");
  prod.forEach(prods => {
    if(prods.textContent.toLowerCase().includes(filtroInput) || prods.textContent.toLowerCase().includes(filtrarInput)){
      prods.style.display = "block";
    }else{
      prods.style.display = "none";
    }
  })
  
  renderizarProdutos(filtrarCategoria(categoria));
}

// Inicialização
renderizarProdutos(produtos);

const btnFiltros = document.getElementById("btnFiltros");
const filtrosDiv = document.getElementById("filtros");

btnFiltros.addEventListener("click", () => {
  filtrosDiv.classList.toggle("d-none");
});
const textTema = document.getElementById("text")
const mainTema = document.getElementById("mainTema");
const cardTema = document.querySelectorAll(".cardTema")

btnTema.addEventListener("click",() => {
  mainTema.classList.toggle("bg-dark");
  cardTema.forEach(cards=>cards.classList.toggle("border-dark"));
  cardTema.forEach(cards=>cards.classList.toggle("bg-dark"));
  cardTema.forEach(cards=>cards.classList.toggle("text-white"));


  if(tema === claro){
      cardTema.forEach(cards=>cards.classList.toggle("border-light"));

  }
});

