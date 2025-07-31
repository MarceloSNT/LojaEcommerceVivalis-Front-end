function listarCarrinho() {
  const container = document.getElementById("mostrar-produtos-carrinho");
  container.innerHTML = "";

  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Nenhum produto no carrinho.</p>";
    document.getElementById("total").textContent = "R$ 0,00";
    return;
  }

  let total = 0;

  carrinho.forEach((produto) => {

    total += produto.preco;
    const col = document.createElement("div");
    col.className = "card mb-3";
    col.innerHTML = `
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${produto.imagem}" class="img-fluid col-12 rounded-start" style="height: 200px" alt="${produto.nome}">
    </div>
    <div class="col-md-8">
      <div class="card-body text-start">
        <h2 class="card-title">${produto.nome}</h2>
        <p class="card-text">${produto.descricao}</p>
        <h2 class="card-text">R$ ${produto.preco}</h2>
      </div>
    </div>
</div>`;
    container.appendChild(col);
  });

  document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;
}

// Limpa o carrinho
document.getElementById("limparCarrinho").addEventListener("click", function() {
  localStorage.removeItem("itens");
  listarCarrinho();
});

// Finaliza a compra
document.getElementById("finalizarCompra").addEventListener("click", function() {
  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  if (carrinho.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }
  alert("Compra finalizada com sucesso!");
  localStorage.removeItem("itens");
});
// Inicializa ao carregar a página
window.addEventListener("DOMContentLoaded", listarCarrinho);
