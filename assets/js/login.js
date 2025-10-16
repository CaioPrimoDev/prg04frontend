document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#login form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = form.querySelector('input[type="email"]').value.trim();
    const senha = form.querySelector('input[type="password"]').value.trim();

    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }

    try {
      const response = await fetch('../../dados-temp/usuarios.txt');
      if (!response.ok) throw new Error('Arquivo de usuários não encontrado!');
      const data = await response.text();

      const linhas = data.split('\n').map(l => l.trim()).filter(Boolean);

      let usuarioValido = false;
      let tipoUsuario = null;

      for (const linha of linhas) {
        const [emailArq, senhaArq, tipoArq] = linha.split(';');
        if (emailArq === email && senhaArq === senha) {
          usuarioValido = true;
          tipoUsuario = tipoArq;
          break;
        }
      }

      if (usuarioValido) {
        alert('Login bem-sucedido!');
        window.location.href = '/pages/admin/admin-usuarios.html';  
      } else {
        alert('E-mail ou senha incorretos!');
      }

    } catch (erro) {
      console.error('Erro ao ler arquivo:', erro);
      alert('Erro ao acessar os dados de login.');
    }
  });
});
