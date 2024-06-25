const form = document.getElementById('formConsulta');
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const cpf = document.getElementById('cpf').value;

    const response = await fetch(`/usuarios/${cpf}`);
    const data = await response.json();

    const resultado = document.getElementById('resultado');
    if (response.ok) {
        resultado.innerText = `Sua CIN está pronta  Sala Sensorial / Alece: ${data.nome} (${data.cpf})
        A retirada será feita na Asselmbleia, anexo III, 3º andar.
        A entrega da CIN sera feita para o requerente ou responsavel legal, portando documento comprobatorio.`;
    } else {
        resultado.innerText = 'A sua CIN nao ficou pronta ainda!';
    }
});
