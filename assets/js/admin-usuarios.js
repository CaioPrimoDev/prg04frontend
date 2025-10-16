document.addEventListener('DOMContentLoaded', async () => {
  const tabelaBody = document.querySelector('#tabelaUsuarios tbody');
  const arquivoUsuarios = '/dados-temp/usuarios.txt';

  try {
    const response = await fetch(arquivoUsuarios, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Erro ao carregar usuários (${response.status})`);

    const texto = await response.text();
    const linhas = texto.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);

    linhas.forEach(linha => {
      const [email, senha] = linha.split(';').map(p => p.trim());
      if (!email || !senha) return;

      // cria elementos da tabela
      const tr = document.createElement('tr');

      const tdEmail = document.createElement('td');
      tdEmail.textContent = email;

      const tdSenha = document.createElement('td');
      tdSenha.textContent = senha;

      const tdAcoes = document.createElement('td');

      // botão editar
      const btnEditar = document.createElement('button');
      btnEditar.textContent = 'Editar';
      btnEditar.classList.add('editar');
      btnEditar.addEventListener('click', () => {
        window.location.href = '/pages/admin/editar-usuario.html';
      });

      // botão excluir
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.classList.add('excluir');
      btnExcluir.addEventListener('click', () => {
        window.location.href = '/pages/admin/excluir-usuario.html';
      });

      tdAcoes.appendChild(btnEditar);
      tdAcoes.appendChild(btnExcluir);

      tr.appendChild(tdEmail);
      tr.appendChild(tdSenha);
      tr.appendChild(tdAcoes);

      tabelaBody.appendChild(tr);
    });
  } catch (err) {
    console.error('Erro:', err);
    tabelaBody.innerHTML = `<tr><td colspan="3">Erro ao carregar usuários.</td></tr>`;
  }
});
