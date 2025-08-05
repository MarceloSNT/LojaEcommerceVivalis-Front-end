// Função para listar os produtos no carrinho
function listarCarrinho() {
  const container = document.getElementById("mostrar-produtos-carrinho");
  container.innerHTML = "";

  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  const mensagem = document.getElementById("mensagem");
  const comprasFinalizadas = parseInt(localStorage.getItem("comprasFinalizadas")) || 0;

  atualizarContadorCarrinho();

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Nenhum produto no carrinho.</p>";
    document.getElementById("total").textContent = "R$ 0,00";
    mensagem.className = "alert alert-warning text-center";
    mensagem.textContent = "Finalize 10 compras para ganhar um brinde! Faltam " + (10 - comprasFinalizadas) + " compras.";
    return;
  }

  let total = 0;

  carrinho.forEach((produto, index) => {
    const subtotal = produto.preco * produto.quantidade;
    total += subtotal;

    const col = document.createElement("div");
    col.className = "col-8 my-3 mx-auto"; // Usa a coluna inteira para o card
    col.innerHTML = `
      <div class="cardTema card shadow-sm rounded-3 bg-white text-dark">
        <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center">
            <img src="${produto.imagem}" class="img-fluid rounded-start w-100" style="height: 200px; object-fit: cover;" alt="${produto.nome}">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column h-100">
              <div class="d-flex justify-content-between align-items-start">
                <div class="text-start">
                  <h2 class="card-title fs-5 fw-bold">${produto.nome}</h2>
                  <p class="card-text">${produto.descricao}</p>
                </div>
                <button class="btn btn-outline-danger btn-sm excluir-item" data-index="${index}" title="Remover item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                  </svg>
                </button>
              </div>
              <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                <p class="mb-0 fw-bold">Quantidade: ${produto.quantidade}</p>
                <h4 class="mb-0 text-success fw-bold">R$ ${subtotal.toFixed(2)}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  document.getElementById("total").textContent = `R$ ${total.toFixed(2)}`;

  if (comprasFinalizadas >= 10) {
    mensagem.className = "alert alert-success text-center";
    mensagem.textContent = "Parabéns! Você ganhou um brinde por finalizar 10 compras!";
    
    // CORREÇÃO: Cria e adiciona o card do brinde como um novo elemento
    const brindeCol = document.createElement("div");
    brindeCol.className = "col-8 my-3 mx-auto"; 
    brindeCol.innerHTML = `
      <div class="card shadow-sm rounded-3">
        <div class="row g-0">
          <div class="col-md-4 d-flex align-items-center">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9n9FVsV37TKHi6GkEBKd2TLLyTVlMKlFZnQ&s" class="img-fluid rounded-start w-100" style="height: 200px; object-fit: cover;" alt="Máscara Facial - Brinde">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column h-100">
              <div class="d-flex justify-content-between align-items-start">
                <div class="text-start">
                  <h2 class="card-title fs-5 fw-bold">Máscara Facial - Brinde</h2>
                  <p class="card-text">Uma máscara facial hidratante para cuidar da sua pele.</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="Green" class="bi bi-gift-fill" viewBox="0 0 16 16">
                  <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A3 3 0 0 1 3 2.506zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43zM9 3h2.932l.023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9z"/>
                </svg>
                
              </div>
              <div class="mt-auto d-flex justify-content-between align-items-center pt-2">
                <p class="mb-0 fw-bold">Quantidade: 1</p>
                <h4 class="mb-0 text-success fw-bold">R$ 00.00</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(brindeCol);
    
  } else {
    mensagem.className = "alert alert-warning text-center";
    mensagem.textContent = "Finalize 10 compras para ganhar um brinde! Faltam " + (10 - comprasFinalizadas) + " compras.";
  }
}

// Função para atualizar o contador de produtos
function atualizarContadorCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem("itens")) || [];
  const contadorElement = document.querySelector("p");

  if (contadorElement) {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    contadorElement.textContent = `Produtos no Carrinho: ${totalItens}`;
  }
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
  window.location.href = "pagamento.html";
});

// Delegação de evento para os botões de excluir
document.getElementById("mostrar-produtos-carrinho").addEventListener("click", function (e) {
  if (e.target.closest(".excluir-item")) {
    const btn = e.target.closest(".excluir-item");
    const idx = parseInt(btn.getAttribute("data-index"));
    
    const carrinhoAtual = JSON.parse(localStorage.getItem("itens")) || [];
    
    if (carrinhoAtual[idx].quantidade > 1) {
      carrinhoAtual[idx].quantidade--;
    } else {
      carrinhoAtual.splice(idx, 1);
    }
    
    localStorage.setItem("itens", JSON.stringify(carrinhoAtual));
    listarCarrinho();
  }
});

// Inicializa a página ao carregar
window.addEventListener("DOMContentLoaded", listarCarrinho);

// Monitora mudanças no localStorage para atualizar a página em tempo real
window.addEventListener("storage", function(e) {
  if (e.key === "itens") {
    listarCarrinho();
  }
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