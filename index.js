const produtos = [
  {
    nome: "Prouto 1",
    descricao: "Uma maçã fresca e suculenta, perfeita para um lanche saudável.",
    categoria: "perfume",
    imagem: "https://www.infomoney.com.br/wp-content/uploads/2019/06/macas.jpg?fit=900%2C567&quality=50&strip=all"
  },
  {
    nome: "Banana",
    descricao: "Bananas maduras e doces, ótimas para um lanche rápido.",
    categoria: "shampoo",
    imagem: "https://png.pngtree.com/thumb_back/fh260/background/20241107/pngtree-a-bunch-of-ripe-yellow-bananas-image_16511040.jpg"
  },
  {
    nome: "Cenoura",
    descricao: "Cenouras crocantes e nutritivas, ótimas para saladas ou cozidos.",
    categoria: "sabonete",
    imagem: "https://static.vecteezy.com/ti/fotos-gratis/t2/23803107-saudavel-1-natural-cenoura-com-branco-fundo-foto.jpeg"
  },
  {
    nome: "Brócolis",
    descricao: "Brócolis frescos e crocantes, ótimos para saladas ou refogados.",
    categoria: "perfume",
    imagem: "https://tempodecozimento.com.br/wp-content/uploads/2023/12/Brocolis.png"
  },
  {
    nome: "Leite",
    descricao: "Leite fresco e cremoso, ideal para o café da manhã ou receitas.",
    categoria: "sabonete",
    imagem: "https://hubconteudo.dasa.com.br/wp-content/uploads/2022/12/leite-300x200.jpg"
  },
  {
    nome: "Frango",
    descricao: "Peito de frango suculento, perfeito para grelhar ou assar.",
    categoria: "shampoo",
    imagem: "https://static.itdg.com.br/images/auto-auto/3abf8db1abc0a92dea1a15eaa67cc08e/frango-frito-300x200.jpg"
  },
  {
    nome: "Bife",
    descricao: "Bife macio e saboroso, ideal para um jantar especial.",
    categoria: "sabonete",
    imagem: "https://static.vecteezy.com/ti/fotos-gratis/t2/54323187-grelhado-carne-bife-com-assado-cebolas-e-alecrim-em-branco-prato-foto.jpg"
  },
  {
    nome: "Queijo",
    descricao: "Queijo curado, perfeito para tábuas de frios ou sanduíches.",
    categoria: "perfume",
    imagem: "https://static.vecteezy.com/ti/fotos-gratis/t2/28643036-de-madeira-borda-com-diferente-tipos-do-delicioso-queijo-em-mesa-foto.jpg"
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
    col.className = "row";
    col.innerHTML = `
      <div class="card mb-5 col-md-4 col-lg-3 border border-light rounde rounded-3 text-center bg-dark text-light p-0 pb-3">
        <img src="${produto.imagem}" class="card-img-top" " alt="${produto.nome}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${produto.nome}</h5>
          <p class="card-text">${produto.descricao}</p>
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

// Inicialização
renderizarProdutos(produtos);