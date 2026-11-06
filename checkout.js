const container = document.getElementById("checkout-produtos");
const totalElemento = document.getElementById("checkout-total");
const botaoFinalizar = document.getElementById("finalizar-pagamento");

/* =========================
   DADOS DO CHECKOUT
========================= */

const checkoutItem =
    JSON.parse(localStorage.getItem("checkoutItem"));

const checkoutCarrinho =
    JSON.parse(localStorage.getItem("checkoutCarrinho"));

const carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];

/* =========================
   FORMATAR PREÇO
========================= */

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/* =========================
   RENDER CHECKOUT
========================= */

function renderCheckout() {

    container.innerHTML = "";

    let total = 0;

    /* =========================
       1. COMPRA DIRETA
    ========================= */
    if (checkoutItem) {

        total = checkoutItem.preco * checkoutItem.quantidade;

        container.innerHTML = `
            <div style="
                display:flex;
                justify-content:space-between;
                padding:15px 0;
                border-bottom:1px solid #eee;
            ">
                <span>${checkoutItem.nome} x${checkoutItem.quantidade}</span>
                <strong>${formatarPreco(checkoutItem.preco)}</strong>
            </div>
        `;
    }

    /* =========================
       2. CARRINHO FINALIZAR COMPRA
    ========================= */
    else if (checkoutCarrinho) {

        checkoutCarrinho.forEach(item => {

            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const div = document.createElement("div");

            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.padding = "15px 0";
            div.style.borderBottom = "1px solid #eee";

            div.innerHTML = `
                <span>${item.nome} x${item.quantidade}</span>
                <strong>${formatarPreco(item.preco)}</strong>
            `;

            container.appendChild(div);
        });
    }

    /* =========================
       3. CARRINHO PADRÃO (fallback)
    ========================= */
    else if (carrinho.length > 0) {

        carrinho.forEach(item => {

            const subtotal = item.preco * item.quantidade;
            total += subtotal;

            const div = document.createElement("div");

            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.padding = "15px 0";
            div.style.borderBottom = "1px solid #eee";

            div.innerHTML = `
                <span>${item.nome} x${item.quantidade}</span>
                <strong>${formatarPreco(item.preco)}</strong>
            `;

            container.appendChild(div);
        });
    }

    /* =========================
       4. VAZIO
    ========================= */
    else {
        container.innerHTML = `
            <p style="text-align:center; padding:20px;">
                Nenhum item no checkout
            </p>
        `;
    }

    totalElemento.innerText = formatarPreco(total);
}

/* =========================
   FINALIZAR COMPRA
========================= */

botaoFinalizar.addEventListener("click", () => {

    const metodo = document.querySelector(
        'input[name="pagamento"]:checked'
    )?.value;

    if (!metodo) {
        alert("Selecione um método de pagamento");
        return;
    }

    botaoFinalizar.innerText = "Processando pagamento...";
    botaoFinalizar.disabled = true;

    /* =========================
       SIMULAÇÃO DE PAGAMENTO
    ========================= */

    setTimeout(() => {

        // limpa tudo
        localStorage.removeItem("checkoutItem");
        localStorage.removeItem("checkoutCarrinho");
        localStorage.removeItem("carrinho");

        // redireciona
        window.location.href = "sucesso.html";

    }, 2500);
});

/* =========================
   INIT
========================= */

renderCheckout();