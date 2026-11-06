
const produtosDB = {
    "pc-gamer": {
        nome: "PC Gamer RGB",
        preco: 5999,

        descricao: `
<h3>⚙️ Informações Técnicas</h3>

<ul>
<li><b>Processador:</b> AMD Ryzen 5 5500X3D</li>
<li><b>Placa-mãe:</b> A520M</li>
<li><b>Placa de vídeo:</b> RX 6600 8GB</li>
<li><b>Memória RAM:</b> 16GB DDR4 3200MHz</li>
<li><b>Armazenamento:</b> SSD 480GB M.2</li>
<li><b>Sistema:</b> Windows 11 (30 dias grátis)</li>
</ul>

<hr>

<h3>🛡️ Garantia</h3>
<p>12 meses com o fornecedor</p>

<h3>📦 Itens Inclusos</h3>
<p>Cabo de energia, gabinete montado, manual e certificado</p>

<hr>

<h3>🔥 Descrição</h3>
<p>
O PC Gamer com Ryzen 5 e RX 6600 foi projetado para alto desempenho em jogos AAA e competitivos, garantindo fluidez e estabilidade.
</p>

<h3>🎮 Benefícios</h3>
<ul>
<li>Alta taxa de FPS</li>
<li>Carregamento rápido</li>
<li>Jogabilidade estável</li>
<li>RGB e design moderno</li>
</ul>
`,

        imagens: [
            "img/pc.webp",
            "img/pc2.webp",
            "img/pc3.webp"
        ]
    },

    "notebook": {
        nome: "Notebook Gamer",
        preco: 4500,
        descricao:  `
<h3>🧾 Informações Técnicas</h3>

<p><b>Marca:</b> Acer</p>
<p><b>Modelo:</b> Nitro V15</p>

<hr>

<h3>⚙️ Processador</h3>
<ul>
<li>AMD Ryzen 7 7735HS</li>
<li>8 núcleos / 16 threads</li>
<li>Até 4.75 GHz</li>
</ul>

<h3>🎮 Placa de vídeo</h3>
<ul>
<li>NVIDIA RTX 4050 6GB GDDR6</li>
<li>Ray Tracing / DLSS</li>
</ul>

<h3>🧠 Memória</h3>
<ul>
<li>16GB DDR5 (expansível)</li>
</ul>

<h3>💾 Armazenamento</h3>
<ul>
<li>SSD 512GB NVMe</li>
</ul>

<h3>🖥️ Tela</h3>
<ul>
<li>15.6" Full HD IPS</li>
<li>165Hz</li>
</ul>

<h3>📦 Descrição completa</h3>
<p>
Notebook gamer de alto desempenho com RTX 4050, ideal para jogos atuais, edição e multitarefa pesada.
</p>
`,
        imagens: ["img/not.webp", "img/not2.webp", "img/not3.webp", "img/not4.webp"]
    },

    "smartphone": {
        nome: "Smartphone Pro",
        preco: 2199,
        descricao: "Celular rápido com câmera profissional.",
        imagens: ["img/cel.webp"]
    },

    "fone": {
        nome: "Fone Bluetooth",
        preco: 299,
        descricao: "Fone com alta qualidade de som e bateria longa.",
        imagens: ["img/fone.webp"]
    }
};

/* =========================
   PEGAR ID DA URL
========================= */

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const produto = produtosDB[id];

/* =========================
   ELEMENTOS
========================= */

const nomeEl = document.getElementById("nome-produto");
const precoEl = document.getElementById("preco-produto");
const descEl = document.getElementById("descricao-produto");
const imgPrincipal = document.getElementById("img-principal");
const miniaturas = document.getElementById("miniaturas");

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
   RENDER PRODUTO
========================= */

function renderProduto() {

    if (!produto) {
        nomeEl.innerText = "Produto não encontrado";
        return;
    }

    nomeEl.innerText = produto.nome;
    precoEl.innerText = formatarPreco(produto.preco);

    // 🔥 IMPORTANTE: HTML agora funciona
    descEl.innerHTML = produto.descricao;

    imgPrincipal.src = produto.imagens[0];

    miniaturas.innerHTML = "";

    produto.imagens.forEach((img) => {

        const mini = document.createElement("img");
        mini.src = img;

        mini.onclick = () => {
            imgPrincipal.src = img;
        };

        miniaturas.appendChild(mini);
    });
    
}

/* =========================
   BOTÃO COMPRAR AGORA
========================= */

const btnComprarAgora =
    document.getElementById("btn-comprar-agora");

if (btnComprarAgora) {

    btnComprarAgora.onclick = () => {

        if (!produto) return;

        const produtoCheckout = {
            nome: produto.nome,
            preco: produto.preco,
            imagem: produto.imagens[0],
            quantidade: 1
        };

        localStorage.setItem(
            "checkoutItem",
            JSON.stringify(produtoCheckout)
        );

        window.location.href = "checkout.html";
    };
}

/* =========================
   INIT
========================= */

renderProduto();