window.addEventListener("DOMContentLoaded", function() {
  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  const mensagem = document.getElementById("mensagem");
  if (carrinho.length === 0) {
    mensagem.innerHTML = "<div class='alert alert-warning text-center'>Seu carrinho está vazio!</div>";
    return;
  }

  let totalProdutos = carrinho.reduce((soma, item) => soma + item.preco, 0);
  let frete = totalProdutos >= 199.90 ? 0 : 29.90;
  let totalComFrete = totalProdutos + frete;

  let resumo = `
    <div class="container mt-5">
      <h3>Resumo do Carrinho</h3>
      <ul class="list-group mb-3">
        ${carrinho.map(item => `<li class="list-group-item d-flex justify-content-between align-items-center">
          ${item.nome} <span>R$ ${item.preco.toFixed(2)}</span>
        </li>`).join('')}
      </ul>
      <h5 class="text-end">Subtotal: <span>R$ ${totalProdutos.toFixed(2)}</span></h5>
      <h5 class="text-end">Frete: <span id="frete">${frete === 0 ? "Grátis" : "R$ 29,90"}</span></h5>
      <h4 class="text-end">Total: <span id="resumo-total">R$ ${totalComFrete.toFixed(2)}</span></h4>
      <hr>
      <h5>Escolha a forma de pagamento:</h5>
      <div class="row mb-3 mx-auto">
        <div class="card col-3 p-2">
          <div class="form-check col-12">
            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoPix" value="pix" checked>
            <label class="form-check-label" for="pagamentoPix">Pix (10% de desconto)</label>
          </div>
        </div>
        <div class="card col-3 p-2 ms-5 me-5">
          <div class="form-check col-12">
            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoCredito" value="credito">
            <label class="form-check-label" for="pagamentoCartao">Cartão de Crédito</label>
          </div>
        </div>
        <div class="card col-3 p-2">
          <div class="form-check mb-3 col-12">
            <input class="form-check-input" type="radio" name="pagamento" id="pagamenDebito" value="debito">
            <label class="form-check-label" for="pagamentoBoleto">Cartão de Débito</label>
          </div>
        </div>
      </div>
      <div id="descontoPix" class="alert alert-success p-2" style="display:block;">
        Pagando com Pix você ganha 10% de desconto! Novo total: <strong id="novo-total">R$ ${(totalComFrete*0.9).toFixed(2)}</strong>
      </div>
      <hr>
      <h5>Endereço de Entrega</h5>
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
        <button type="submit" class="btn btn-success mt-2">Confirmar Pedido</button>
      </form>
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
        novoTotal.textContent = `R$ ${(totalComFrete*0.9).toFixed(2)}`;
        resumoTotal.textContent = `R$ ${(totalComFrete*0.9).toFixed(2)}`;
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
    localStorage.removeItem("itens");
    window.location.href = "principal.html";
  });
});