function listarCarrinho() {
  const container = document.getElementById("mostrar-produtos-carrinho");
  container.innerHTML = "";

  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  const mensagem = document.getElementById("mensagem");

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Nenhum produto no carrinho.</p>";
    document.getElementById("total").textContent = "R$ 0,00";
    mensagem.className = "alert alert-warning text-center";
    mensagem.textContent = "Compre 10 produtos para ganhar um brinde!";
    return;
  }


  let total = 0;

  carrinho.forEach((produto, index) => {

    total += produto.preco;
    const col = document.createElement("div");
    col.className = "card mb-3 col-6 d-grid mx-auto cardTema text-dark bg-light card border border-none rounded rounded-3";
    col.innerHTML = `
  <div class="row g-0 ">
    <div class="col-md-4">
      <img src="${produto.imagem}" class="img-fluid col-12 rounded-start" style="height: 200px" alt="${produto.nome}">
    </div>
    <div class=" col-md-6">
      <div class="card-body text-start">
        <h2 class="card-title">${produto.nome}</h2>
        <p class="card-text">${produto.descricao}</p>
        <h2 class="card-text">R$ ${produto.preco}</h2>
      </div>
    </div>
    <div class="col-md-2">
      <button class="btn btn-outline-danger btn-sm excluir-item mt-3" data-index="${index}" title="Remover do carrinho">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
  </button>
    </div>
</div>`;
    container.appendChild(col);
  });

  // Adiciona evento aos botões de excluir
  document.querySelectorAll(".excluir-item").forEach(btn => {
    btn.addEventListener("click", function() {
      const idx = parseInt(this.getAttribute("data-index"));
      const carrinhoAtual = JSON.parse(localStorage.getItem("itens")) || [];
      carrinhoAtual.splice(idx, 1);
      localStorage.setItem("itens", JSON.stringify(carrinhoAtual));
      listarCarrinho();
    });
  });

  document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;

  // Atualiza mensagem de brinde
  if (carrinho.length >=10) {
    mensagem.className = "alert alert-success text-center";
    mensagem.textContent = "Parabéns! Você ganhou um brinde por comprar 10 produtos!";
    //mostra card brinde
    const brindeCard = document.createElement("div");
    brindeCard.className = "card mb-3 col-6 d-grid mx-auto cardTema text-dark bg-light card border border-none rounded rounded-3";
    brindeCard.innerHTML = `
      <div class="row g-0 ">
        <div class="col-md-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9n9FVsV37TKHi6GkEBKd2TLLyTVlMKlFZnQ&s" class="img-fluid col-12 rounded-start" style="height: 200px" alt="Máscara facial">
        </div>
        <div class="col-md-6">
          <div class="card-body text-start">
            <h2 class="card-title">Máscara facial</h2>
            <p class="card-text">Uma máscara facial para cuidados com a pele.</p>
            <h2 class="card-text">R$ 00.00</h2>
          </div>
        </div>
        <div class="col-md-2">
    <svg xmlns="http://www.w3.org/2000/svg" class="mt-3" width="24" height="24" fill="green" class="bi bi-gift-fill" viewBox="0 0 16 16">
  <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z"/>
</svg>
    </div>
      </div>`;
    container.appendChild(brindeCard);
  } else {
    mensagem.className = "alert alert-warning text-center";
    mensagem.textContent = "Compre 10 produtos para ganhar um brinde!";
  }
}

// Limpa o carrinho
document.getElementById("limparCarrinho").addEventListener("click", function() {
  localStorage.removeItem("itens");
  listarCarrinho();
});

document.getElementById("finalizarCompra").addEventListener("click", function() {
  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  if (carrinho.length === 0) {
    alert("O carrinho está vazio!");
    return;
  }
  // Redireciona para a página de pagamento
  window.location.href = "pagamento.html";
});


  
// Inicializa ao carregar a página
window.addEventListener("DOMContentLoaded", listarCarrinho);


window.addEventListener("storage", function(e) {
  if (e.key === "itens") {
    listarCarrinho();
  }
});



