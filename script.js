const produtosDB = {
    "pc-gamer": {
        nome: "PC Gamer RGB",
        preco: 5999,
        descricao: "PC gamer potente com placa de vídeo dedicada e RGB.",
        imagens: [
            "img/pc.webp",
            "img/pc2.webp",
            "img/pc3.webp"
        ]
    },

    "notebook": {
        nome: "Notebook Gamer",
        preco: 4500,
        descricao: "Notebook ideal para jogos e trabalho pesado.",
        imagens: [
            "img/not.webp",
            "img/not2.webp"
        ]
    },

    "smartphone": {
        nome: "Smartphone Pro",
        preco: 2199,
        descricao: "Celular rápido com câmera profissional.",
        imagens: [
            "img/cel.webp"
        ]
    },

    "fone": {
        nome: "Fone Bluetooth",
        preco: 299,
        descricao: "Fone com alta qualidade de som e bateria longa.",
        imagens: [
            "img/fone.webp"
        ]
    }
};

/* =========================
   CARRINHO GLOBAL
========================= */

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
const botaoFinalizarCompra =
    document.getElementById("finalizar-compra");

if (botaoFinalizarCompra) {

    botaoFinalizarCompra.addEventListener("click", () => {

        // pega carrinho atual
        const carrinho =
            JSON.parse(localStorage.getItem("carrinho")) || [];

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }

        // 🔥 salva como checkout completo
        localStorage.setItem(
            "checkoutCarrinho",
            JSON.stringify(carrinho)
        );

        // remove compra individual (evita conflito)
        localStorage.removeItem("checkoutItem");

        // vai para checkout
        window.location.href = "checkout.html";
    });
}

/* =========================
   ELEMENTOS
========================= */

const botoesComprar = document.querySelectorAll(".comprar");
const botoesComprarAgora = document.querySelectorAll(".comprar-agora");

const contadorElemento = document.getElementById("contador");
const listaCarrinho = document.getElementById("lista-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");

const carrinhoBox = document.getElementById("mini-carrinho");
const botaoCarrinho = document.getElementById("abrir-carrinho");
const botaoFechar = document.getElementById("fechar-carrinho");

const campoBusca = document.getElementById("campo-busca");
const produtos = document.querySelectorAll(".produto");

const containerCarrinhoPagina =
    document.getElementById("cart-items-container");

const totalFinalPagina =
    document.getElementById("total-final");

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
   SALVAR CARRINHO
========================= */

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

/* =========================
   ADICIONAR AO CARRINHO
========================= */

function adicionarCarrinho(nome, preco, imagem) {

    const itemExistente = carrinho.find(item => item.nome === nome);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            nome,
            preco,
            imagem,
            quantidade: 1
        });
    }

    salvarCarrinho();
    atualizarCarrinho();
    renderCarrinhoPagina();
    mostrarToast(nome);
}

/* =========================
   ATUALIZAR MINI CARRINHO
========================= */

function atualizarCarrinho() {

    if (!contadorElemento) return;

    const totalItens = carrinho.reduce(
        (acc, item) => acc + item.quantidade,
        0
    );

    contadorElemento.innerText = totalItens;

    if (!listaCarrinho) return;

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, index) => {

        total += item.preco * item.quantidade;

        const div = document.createElement("div");
        div.classList.add("item");

        div.innerHTML = `
            <p>${item.nome}</p>
            <strong>${formatarPreco(item.preco)}</strong>
            <span>Qtd: ${item.quantidade}</span>
            <button class="remover" data-index="${index}">Remover</button>
        `;

        listaCarrinho.appendChild(div);
    });

    if (totalCarrinho) {
        totalCarrinho.innerText = "Total: " + formatarPreco(total);
    }

    document.querySelectorAll(".remover").forEach(btn => {
        btn.addEventListener("click", () => {
            removerItem(btn.dataset.index);
        });
    });

    salvarCarrinho();
}

/* =========================
   RENDER CARRINHO PÁGINA
========================= */

function renderCarrinhoPagina() {

    if (!containerCarrinhoPagina) return;

    containerCarrinhoPagina.innerHTML = "";

    let total = 0;

    if (carrinho.length === 0) {

        containerCarrinhoPagina.innerHTML = `
            <p style="text-align:center; padding:20px;">
                Seu carrinho está vazio
            </p>
        `;

        if (totalFinalPagina) {
            totalFinalPagina.innerText = "R$ 0,00";
        }

        return;
    }

    carrinho.forEach((item, index) => {

        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const div = document.createElement("div");

        div.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center; padding:15px 0; border-bottom:1px solid #eee;">
                <img src="${item.imagem}" style="width:80px; border-radius:10px;">

                <div style="flex:1;">
                    <h3>${item.nome}</h3>
                    <p style="color:#ff6600; font-weight:700;">
                        ${formatarPreco(item.preco)}
                    </p>

                    <div style="display:flex; gap:10px; align-items:center; margin-top:8px;">
                        <button onclick="diminuirQtd(${index})">-</button>
                        <span>${item.quantidade}</span>
                        <button onclick="aumentarQtd(${index})">+</button>
                    </div>
                </div>

                <button onclick="removerItemPagina(${index})"
                    style="background:#ef4444;color:white;border:none;padding:8px 12px;border-radius:8px;">
                    Remover
                </button>
            </div>
        `;

        containerCarrinhoPagina.appendChild(div);
    });

    if (totalFinalPagina) {
        totalFinalPagina.innerText = formatarPreco(total);
    }
}

/* =========================
   BOTÃO ADICIONAR AO CARRINHO
========================= */

botoesComprar.forEach(botao => {

    botao.addEventListener("click", (e) => {

        e.stopPropagation();

        const produto = botao.closest(".produto");

        const nome = produto.querySelector("h3").innerText;
        const precoTexto = produto.querySelector(".preco").innerText;
        const imagem = produto.querySelector("img").src;

        const preco = Number(
            precoTexto
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
        );

        adicionarCarrinho(nome, preco, imagem);
    });
});

/* =========================
   BOTÃO COMPRAR AGORA → CHECKOUT
========================= */

botoesComprarAgora.forEach(botao => {

    botao.addEventListener("click", (e) => {

        e.stopPropagation();

        const produto = botao.closest(".produto");

        const nome = produto.querySelector("h3").innerText;
        const precoTexto = produto.querySelector(".preco").innerText;
        const imagem = produto.querySelector("img").src;

        const preco = Number(
            precoTexto
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
        );

        const checkoutItem = {
            nome,
            preco,
            imagem,
            quantidade: 1
        };

        localStorage.setItem(
            "checkoutItem",
            JSON.stringify(checkoutItem)
        );

        window.location.href = "checkout.html";
    });
});

/* =========================
   REMOVER / QUANTIDADE
========================= */

function removerItem(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
    renderCarrinhoPagina();
}

function removerItemPagina(index) {
    carrinho.splice(index, 1);
    salvarCarrinho();
    atualizarCarrinho();
    renderCarrinhoPagina();
}

function aumentarQtd(index) {
    carrinho[index].quantidade++;
    salvarCarrinho();
    atualizarCarrinho();
    renderCarrinhoPagina();
}

function diminuirQtd(index) {
    carrinho[index].quantidade--;

    if (carrinho[index].quantidade <= 0) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();
    atualizarCarrinho();
    renderCarrinhoPagina();
}

/* =========================
   MINI CARRINHO UI
========================= */

if (botaoCarrinho) {
    botaoCarrinho.addEventListener("click", () => {
        carrinhoBox.classList.toggle("ativo");
    });
}

if (botaoFechar) {
    botaoFechar.addEventListener("click", () => {
        carrinhoBox.classList.remove("ativo");
    });
}

/* =========================
   FECHAR FORA
========================= */

document.addEventListener("click", (e) => {

    if (
        carrinhoBox &&
        !carrinhoBox.contains(e.target) &&
        botaoCarrinho &&
        !botaoCarrinho.contains(e.target)
    ) {
        carrinhoBox.classList.remove("ativo");
    }
});

/* =========================
   BUSCA
========================= */

if (campoBusca) {

    campoBusca.addEventListener("input", () => {

        const valor = campoBusca.value.toLowerCase();

        produtos.forEach(produto => {

            const nome = produto.querySelector("h3").innerText.toLowerCase();

            produto.style.display =
                nome.includes(valor) ? "block" : "none";
        });
    });
}

/* =========================
   TOAST
========================= */

function mostrarToast(nome) {

    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = `${nome} adicionado ao carrinho`;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("mostrar"), 100);

    setTimeout(() => {
        toast.classList.remove("mostrar");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/* =========================
   INIT
========================= */

atualizarCarrinho();
renderCarrinhoPagina();