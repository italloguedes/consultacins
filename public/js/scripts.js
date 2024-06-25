document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const messageDiv = document.getElementById('message');
  
    // Evento de submit para o formulário de login
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const cpf = document.getElementById('cpf').value;
      const password = document.getElementById('password').value;
  
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ cpf, password })
        });
  
        const data = await response.json();
        if (response.ok) {
          // Login bem-sucedido, armazenar token JWT no localStorage
          localStorage.setItem('token', data.token);
          messageDiv.textContent = 'Login bem-sucedido!';
        } else {
          messageDiv.textContent = data.message;
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        messageDiv.textContent = 'Erro ao fazer login. Verifique o console para mais detalhes.';
      }
    });
  
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
          messageDiv.textContent = 'Usuário registrado com sucesso!';
        } else {
          messageDiv.textContent = data.message;
        }
      } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        messageDiv.textContent = 'Erro ao registrar usuário. Verifique o console para mais detalhes.';
      }
    });
  });
  