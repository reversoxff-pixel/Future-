document.addEventListener("DOMContentLoaded", () => {
  const API = "/api/auth";
  const TOKEN_KEY = "futuroMaisToken";

  async function enviar(rota, dados, mensagemEl) {
    mensagemEl.textContent = "Aguarde...";
    try {
      const resposta = await fetch(`${API}/${rota}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados)
      });
      const resultado = await resposta.json();
      if (!resposta.ok) throw new Error(resultado.mensagem || "Ocorreu um erro.");
      localStorage.setItem(TOKEN_KEY, resultado.token);
      mensagemEl.textContent = resultado.mensagem;
      setTimeout(() => location.href = "painel.html", 600);
    } catch (erro) {
      mensagemEl.textContent = erro.message === "Failed to fetch"
        ? "Não foi possível conectar ao servidor. Confira se o backend está ligado."
        : erro.message;
    }
  }

  const register = document.getElementById("register-form");
  if (register) register.addEventListener("submit", async (e) => {
    e.preventDefault();
    const senha = document.getElementById("reg-password").value;
    const confirmar = document.getElementById("reg-confirm").value;
    const msg = document.getElementById("register-message");
    if (senha !== confirmar) { msg.textContent = "As senhas não coincidem."; return; }
    await enviar("register", {
      nome: document.getElementById("reg-name").value.trim(),
      email: document.getElementById("reg-email").value.trim(), senha
    }, msg);
  });

  const login = document.getElementById("login-form");
  if (login) login.addEventListener("submit", async (e) => {
    e.preventDefault();
    await enviar("login", {
      email: document.getElementById("login-email").value.trim(),
      senha: document.getElementById("login-password").value
    }, document.getElementById("login-message"));
  });

  const name = document.getElementById("user-name");
  if (name) (async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) { location.href = "login.html"; return; }
    try {
      const resposta = await fetch(`${API}/me`, { headers: { Authorization: `Bearer ${token}` } });
      const resultado = await resposta.json();
      if (!resposta.ok) throw new Error(resultado.mensagem);
      name.textContent = resultado.usuario.nome;
      document.getElementById("panel-message").textContent =
        `Conta conectada ao banco de dados. E-mail: ${resultado.usuario.email}`;
    } catch (erro) {
      localStorage.removeItem(TOKEN_KEY);
      location.href = "login.html";
    }
  })();

  const logout = document.getElementById("logout-button");
  if (logout) logout.addEventListener("click", () => {
    localStorage.removeItem(TOKEN_KEY);
    location.href = "login.html";
  });
});
