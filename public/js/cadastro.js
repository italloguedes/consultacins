const form = document.getElementById('formUsuario');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;

    const response = await fetch('/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, cpf })
    });

    const data = await response.json();
    document.getElementById('resultado').innerText = `Usuário cadastrado: ${data.nome} (${data.cpf})`;
});
