const arrayProduto = [
  { nome: "perfume", categoria: "perfume", preco: 29.9 },
  { nome: "shampoo", categoria: "shampoo", preco: 29.9 },
  { nome: "sabonete", categoria: "sabonete", preco: 29.9 },
  { nome: "difusor aromatico", categoria: "difusorAroma", preco: 29.9 },
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
    <h2>${prod.nome}</h2>
      Categoria: ${prod.categoria}<br>
      Preço: ${prod.preco}<br>
    </div>
  `
    )
    .join("");
}

function listarProdutos() {
  const selectValue = document.getElementById("selectID").value;
  const valor = selectValue.toLowerCase();

  const filtrado = selectValue
    ? arrayProduto.filter((filtrar) => filtrar.categoria.toLowerCase() === valor)
    : arrayProduto;

  gerarCards(filtrado);
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("botaoID").addEventListener("click", listarProdutos);
  listarProdutos();
});
