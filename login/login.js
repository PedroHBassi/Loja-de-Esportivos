function validarFormulario() {
    const senha = document.getElementById("senha").value;
    const confirmaSenha = document.getElementById("confirma-senha").value;
    const mensagemErro = document.getElementById("mensagem-erro");

    if (senha !== confirmaSenha) {
        mensagemErro.textContent = "As senhas não correspondem.";
        return false;
    }

    if (senha.length < 6) {
        mensagemErro.textContent = "A senha deve ter pelo menos 6 caracteres.";
        return false;
    }

    mensagemErro.textContent = "";
    alert("Cadastro realizado com sucesso!");
    return true;
}
