window.addEventListener("DOMContentLoaded", function() {
  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  const mensagem = document.getElementById("mensagem");

  if (carrinho.length === 0) {
    mensagem.innerHTML = "<div class='alert alert-warning text-center'>Seu carrinho está vazio!</div>";
    return;
  }

  // Novo cálculo do total: preço * quantidade de cada item
  let totalProdutos = carrinho.reduce((soma, item) => soma + (item.preco * item.quantidade), 0);
  let frete = totalProdutos >= 199.90 ? 0 : 29.90;
  let totalComFrete = totalProdutos + frete;

  let resumo = `
    <div class="container ">
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="card cardTema shadow-sm h-100">
            <div class="card-body">
              <h3 class="card-title mb-4">Resumo do Pedido</h3>
              <ul class="list-group list-group-flush">
                ${carrinho.map(item => `
                  <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      ${item.nome} <span class="badge bg-secondary rounded-pill">${item.quantidade}</span>
                    </div>
                    <span>R$ ${(item.preco * item.quantidade).toFixed(2)}</span>
                  </li>
                `).join('')}
              </ul>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <h5 class="fw-bold">Subtotal:</h5>
                <span>R$ ${totalProdutos.toFixed(2)}</span>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="fw-bold">Frete:</h5>
                <span id="frete">${frete === 0 ? "Grátis" : "R$ " + frete.toFixed(2)}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between align-items-center">
                <h4 class="fw-bold">Total:</h4>
                <h4 id="resumo-total">R$ ${totalComFrete.toFixed(2)}</h4>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card cardTema shadow-sm h-100">
            <div class="card-body">
              <h5 class="mb-3">Escolha a forma de pagamento:</h5>
              <div class="d-flex flex-column gap-3 mb-4">
                <div class="card p-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="pagamento" id="pagamentoPix" value="pix" >
                    <label class="form-check-label fw-bold" for="pagamentoPix">Pix (10% de desconto)</label>
                  </div>
                </div>
                <div class="card p-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="pagamento" id="pagamentoCredito" value="credito">
                    <label class="form-check-label fw-bold" for="pagamentoCredito">Cartão de Crédito</label>
                  </div>
                </div>
                <div class="card p-3">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="pagamento" id="pagamenDebito" value="debito" checked>
                    <label class="form-check-label fw-bold" for="pagamenDebito">Cartão de Débito</label>
                  </div>
                </div>
              </div>

              <div id="descontoPix" class="alert alert-success p-3" style="display:block;">
                Pagando com Pix você ganha 10% de desconto! Novo total: <strong id="novo-total">R$ ${(totalComFrete * 0.9).toFixed(2)}</strong>
              </div>

              <hr>

              <h5 class="mb-3">Endereço de Entrega</h5>
              <form id="formEndereco">
                <div class="mb-2">
                  <input type="text" class="form-control" name="nome" placeholder="Nome completo" required>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control" name="endereco" placeholder="Endereço" required>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control" name="cidade" placeholder="Cidade" required>
                </div>
                <div class="mb-2">
                  <input type="text" class="form-control" name="cep" placeholder="CEP" required>
                </div>
                <button type="submit" class="btn btn-success w-100 mt-3">Confirmar Pedido</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  mensagem.innerHTML = resumo;

  // Atualiza desconto ao trocar forma de pagamento
  document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
    radio.addEventListener('change', function() {
      const descontoPix = document.getElementById("descontoPix");
      const novoTotal = document.getElementById("novo-total");
      const resumoTotal = document.getElementById("resumo-total");
      if (this.value === "pix") {
        descontoPix.style.display = "block";
        resumoTotal.textContent = `R$ ${(totalComFrete * 0.9).toFixed(2)}`;
      } else {
        descontoPix.style.display = "none";
        resumoTotal.textContent = `R$ ${totalComFrete.toFixed(2)}`;
      }
    });
  });

  // Submete o formulário de endereço
  document.getElementById("formEndereco").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Pedido confirmado! Obrigado pela compra.");

    let comprasFinalizadas = parseInt(localStorage.getItem("comprasFinalizadas")) || 0;
    comprasFinalizadas++;
    
    // Se a pessoa ganhou o brinde, a contagem é resetada
    if (comprasFinalizadas >= 10) {
      alert("Parabéns! Você finalizou 10 compras e ganhou um brinde! O contador foi zerado.");
      comprasFinalizadas = 0;
    }

    localStorage.setItem("comprasFinalizadas", comprasFinalizadas);
    localStorage.removeItem("itens");
    window.location.href = "principal.html";
  });
});

const mainTema = document.getElementById("mainTema");
const btnTema = document.getElementById("btnTema");

function aplicarTemaNosCards() {
  const cardTema = document.querySelectorAll(".cardTema");
  if (mainTema.classList.contains("bg-dark")) {
    cardTema.forEach((cards) => {
      cards.classList.remove("bg-white", "text-dark");
      cards.classList.add("bg-dark", "text-white" , "border-light");
      mainTema.classList.add("text-white", "bg-dark");
    });
  } else {
    cardTema.forEach((cards) => {
      cards.classList.remove("bg-dark", "text-white");
      cards.classList.add("bg-white", "text-dark");
      mainTema.classList.remove("text-white", "bg-dark");
    });
  }
}

btnTema.addEventListener("click", () => {
  mainTema.classList.toggle("bg-dark");
  aplicarTemaNosCards();
});