const API = "http://localhost:8080/loja/api/v1";

async function validarFormulario() {
    const nome = document.getElementById("nome")?.value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirma = document.getElementById("confirma-senha")?.value;
    const mensagem = document.getElementById("mensagem-erro");

    if (confirma !== undefined) {
        if (senha !== confirma) {
            mensagem.textContent = "As senhas não correspondem.";
            return false;
        }

        if (senha.length < 6) {
            mensagem.textContent = "A senha deve ter pelo menos 6 caracteres.";
            return false;
        }

        try {
            const response = await fetch(API + "/usuarios", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nome, email, senha})
            });

            if (!response.ok) throw new Error();

            alert("Cadastro realizado com sucesso!");
            window.location.href = "cadastro.html";
        } catch {
            mensagem.textContent = "Não foi possível realizar o cadastro.";
        }

        return false;
    }

    try {
        const response = await fetch(API + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, senha})
        });

        if (!response.ok) {
            mensagem.textContent = "E-mail ou senha inválidos.";
            return false;
        }

        const usuario = await response.json();
        localStorage.setItem("powerplay_usuario", JSON.stringify(usuario));

        alert("Login realizado com sucesso!");
        window.location.href = "../index.html";
    } catch {
        mensagem.textContent = "Não foi possível conectar à API.";
    }

    return false;
}
