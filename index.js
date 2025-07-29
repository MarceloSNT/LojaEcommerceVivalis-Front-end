const produto = [
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
  { nome: "", categoria: "", preco: 29.9 },
];

const btn = document.getElementById("botao");

function gerarCards(produto) {
  const cont = document.getElementById("mostrar-produtos");
  cont.innerHTML = produto
    .map(
      (prod) => `
    <div class="card mb-5 col-md-4 col-lg-3 border border-light rounde rounded-3 text-center bg-dark text-light p-0 pb-3">
    <img src=${prod.nome} class="image-fluid rounded rounded-3" style="height:200px">
      ${prod.categoria}</h2>
      Preço: ${prod.preco}<br>
    </div>
  `
    )
    .join("");
}

function listarProdutos() {
  const selectValue = document.getElementById("selectID").value;
  const valor = selectValue.toLowerCase();

  const filtrados = selectValue
    ? arrayProdutos.filter((filtrar) => filtrar.marca.toLowerCase() === valor)
    : arrayProdutos;

  gerarCards(filtrados);
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botaoID").addEventListener("click", listarProdutos);
  listarProdutos(); // exibe todos no carregamento
});
