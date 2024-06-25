document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('searchForm');
    const searchResultDiv = document.getElementById('searchResult');
  
    // Evento de submit para o formulário de consulta
    searchForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const searchQuery = document.getElementById('searchQuery').value;
  
      try {
        const response = await fetch(`/api/users?query=${searchQuery}`);
        const data = await response.json();
  
        if (response.ok) {
          if (data.length > 0) {
            searchResultDiv.textContent = 'Sua CIN está pronta para retirada.';
          } else {
            searchResultDiv.textContent = 'Que a CIN ainda não ficou Pronta.';
          }
        } else {
          searchResultDiv.textContent = 'Erro ao consultar usuário. Verifique o console para mais detalhes.';
        }
      } catch (error) {
        console.error('Erro ao consultar usuário:', error);
        searchResultDiv.textContent = 'Erro ao consultar usuário. Verifique o console para mais detalhes.';
      }
    });
  });
  