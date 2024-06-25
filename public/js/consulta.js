const form = document.getElementById('formConsulta');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;

    const response = await fetch(`/usuarios/${cpf}`);
    const data = await response.json();

    const resultado = document.getElementById('resultado');
    if (response.ok) {
        resultado.innerText = `Usuário encontrado: ${data.nome} (${data.cpf})`;
    } else {
        resultado.innerText = 'Usuário não encontrado';
    }
});
