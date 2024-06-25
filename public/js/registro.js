document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');
  
    // Evento de submit para o formulário de registro
    registerForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const fullName = document.getElementById('fullName').value;
      const cpf = document.getElementById('registerCpf').value;
      const password = document.getElementById('registerPassword').value;
  
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fullName, cpf, password })
        });
  
        const data = await response.json();
        if (response.ok) {
          messageDiv.textContent = 'Usuário cadastrado com sucesso!';
        } else {
          messageDiv.textContent = data.message;
        }
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        messageDiv.textContent = 'Erro ao registrar usuário. Verifique o console para mais detalhes.';
      }
    });
  });
  