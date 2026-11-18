FUTURO+ — PUBLICAÇÃO NA INTERNET (RAILWAY)
================================================

Esta versão foi ajustada para publicar site e API no mesmo serviço.
O arquivo js/auth.js usa /api/auth (mesmo domínio), e o backend entrega os
arquivos HTML/CSS/JS. A conexão MySQL aceita as variáveis MYSQL* do Railway.

ESTRUTURA
- database/futuro_mais.sql: cria o banco e a tabela usuarios.
- backend/: API Node.js/Express e conexão MySQL.
- js/auth.js: cadastro/login conectados à API no mesmo domínio.

PUBLICAÇÃO (VISÃO GERAL)
1. Extraia este ZIP e envie a pasta FUTURO_MAIS para um repositório GitHub.
2. No Railway, crie um projeto e adicione um banco MySQL.
3. Adicione um serviço a partir do repositório GitHub. Configure Root Directory = /backend.
4. Build Command: npm install. Start Command: npm start.
5. No serviço da aplicação, crie a variável JWT_SECRET com uma chave aleatória longa (32+ caracteres).
6. O serviço deve receber as variáveis MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD e MYSQLDATABASE do serviço MySQL.
   No Railway, faça a referência/conexão das variáveis do banco para o serviço da aplicação.
7. Importe database/futuro_mais.sql no MySQL hospedado (por cliente MySQL usando os dados de conexão do Railway).
8. Gere um domínio público para o serviço da aplicação nas configurações de Networking/Domains.
9. Abra https://SEU-DOMINIO/api/health. O esperado é {"api":"ok","banco":"conectado"}.
10. Teste cadastro e login com uma conta de teste.

IMPORTANTE
- O Railway pode cobrar pelo uso; confira preços e limites antes de ativar recursos.
- Não publique .env, senhas ou tokens no GitHub. Use variáveis de ambiente no painel.
- Não compartilhe credenciais MySQL publicamente.
- Faça backup do banco e configure política de privacidade antes de usar com público real.
- As vagas e cursos deste protótipo continuam sendo conteúdos demonstrativos.
