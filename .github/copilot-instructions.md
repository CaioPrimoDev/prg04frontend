## Visão rápida do repositório

- Projeto: frontend estático de uma aplicação de cinema (HTML/CSS/JS). Não há build system (nenhum `package.json`, `webpack`, etc.).
- Estrutura principal: `pages/` (rotas/HTML), `assets/` (css, js, images, icons), `components/` (partials), `dados-temp/` (dados em texto plano usados para demonstração).

## Objetivo para a assistente de código

- Fazer mudanças locais em HTML/CSS/JS voltadas ao frontend estático. Evitar assumir backend inexistente; o repositório usa arquivos estáticos em `dados-temp/` para simular dados.

## Padrões e convenções importantes (use estes ao editar/gerar código)

- Dados de usuário (simulação): `dados-temp/usuarios.txt` — linhas no formato `email;senha[;tipo]`. Ex.: `admin@thegolden.com;12345`.
  - JS do login (`assets/js/login.js`) faz fetch nesse arquivo e compara `email` e `senha` em texto plano. Alterações nesse fluxo devem manter o formato `email;senha` ou atualizar ambos JS+arquivo.

- Paths inconsistentes: alguns arquivos usam caminhos relativos (`../../assets/...`) e outros usam caminhos a partir da raiz do site (`/assets/...`). Exemplo:
  - `pages/home/index.html` referencia `../../assets/js/login.js` (relativo).
  - `pages/payment/ResumoDaCompra.html` referencia `/assets/css/style-ResumoDaCompra.css` (raiz).
  - Ao modificar ou adicionar assets, prefira o mesmo padrão do arquivo que será servido (usar caminhos absolutos `/assets/...` é mais robusto quando o site é servido a partir da raiz).

- Seletores e estrutura HTML usados por scripts:
  - Login: `#login form` existe em `pages/home/index.html`; `assets/js/login.js` usa esse seletor e, em caso de sucesso, redireciona para `/pages/admin/admin-usuarios.html`.
  - Admin usuários: `assets/js/admin-usuarios.js` popula `#tabelaUsuarios tbody` lendo `/dados-temp/usuarios.txt`.
  - Ao renomear IDs/classes, atualize os scripts correspondentes.

## Fluxos e decisões de implementação

- Autenticação demo: armazenamento de credenciais em `dados-temp/usuarios.txt` (texto plano) — mantido para demonstração. Se implementar autenticação real, atualize todos os arquivos que fazem fetch direto desse caminho.
- Redirecionamentos são hard-coded (ex.: `window.location.href = '/pages/admin/admin-usuarios.html'`); mudar rotas requer alteração nos scripts.

## Como rodar localmente (recomendado)

1. O site é estático — não funciona via `file://` para fetch em `/dados-temp/` (fetch falhará por CORS/arquivo local). Execute um servidor HTTP simples a partir da raiz do repositório. Exemplo (PowerShell):

```powershell
python -m http.server 8000
```

Ou (Node.js) instalar `live-server` e rodar:

```powershell
npm i -g live-server
live-server --port=8000
```

## Pontos de atenção ao editar

- Não remova nem exponha `dados-temp/usuarios.txt` em produção — contém senhas em texto plano.
- Ao alterar caminhos de assets, verifique as referências em todas as páginas (`pages/`) — trate `../../` vs `/` com cuidado.
- Não assuma um bundler; mudanças em JS/CSS devem ser escritas como arquivos estáticos colocados em `assets/`.

## Arquivos-chave (exemplos a consultar antes de editar)

- `pages/home/index.html` — modal de login (`#login form`) e exemplo de uso de `assets/js/login.js`.
- `assets/js/login.js` — fluxo de login (fetch `dados-temp/usuarios.txt`, validação, redirect).
- `assets/js/admin-usuarios.js` — popula tabela de usuários lendo `/dados-temp/usuarios.txt`.
- `dados-temp/usuarios.txt` — fonte de verdade para demos.

## Quando pedir esclarecimento ao humano

- Se seu patch alterar o formato do arquivo de dados (por exemplo, adicionar campos separados por `;`), peça confirmação para atualizar todos os scripts que dependem do formato.
- Se for necessária uma API/backend, peça instruções sobre endpoints e contratos (métodos, URLs, formato JSON esperado).

---
Por favor revise este arquivo e diga se você quer que eu incorpore regras extras (por exemplo, convenções de commit, lint, ou exemplos de PR). Se algo aqui está impreciso, me diga qual arquivo devo reler e eu ajusto o texto.
