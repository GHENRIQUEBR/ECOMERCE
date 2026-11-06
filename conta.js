let usuarioAtual = JSON.parse(localStorage.getItem("usuario")) || null;

/* =========================
   CADASTRO
========================= */

function cadastrar(){

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const status = document.getElementById("status");

    if(!nome || !email || !senha){
        alert("Preencha todos os campos");
        return;
    }

    const usuario = {
        nome,
        email,
        senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    status.innerText = "Cadastro realizado com sucesso!";
}

/* =========================
   LOGIN
========================= */

function login(){

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const status = document.getElementById("status");

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        alert("Nenhum usuário cadastrado");
        return;
    }

    if(email === usuario.email && senha === usuario.senha){

        localStorage.setItem("logado", "true");

        usuarioAtual = usuario;

        status.innerText = "Login realizado! Bem-vindo " + usuario.nome;

        // 🔥 redireciona para loja depois do login
        setTimeout(() => {
            window.location.href = "index.html";
        }, 800);

    } else {
        alert("Email ou senha incorretos");
    }
}

/* =========================
   LOGOUT
========================= */

function logout(){

    localStorage.removeItem("logado");

    alert("Logout realizado");

    window.location.href = "index.html";
}