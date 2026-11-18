const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const nome = String(req.body.nome || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const senha = String(req.body.senha || "");
    if (nome.length < 2 || nome.length > 100)
      return res.status(400).json({ mensagem: "Informe um nome entre 2 e 100 caracteres." });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 150)
      return res.status(400).json({ mensagem: "Informe um e-mail válido." });
    if (senha.length < 8)
      return res.status(400).json({ mensagem: "A senha precisa ter pelo menos 8 caracteres." });

    const [existentes] = await pool.execute("SELECT id FROM usuarios WHERE email = ? LIMIT 1", [email]);
    if (existentes.length) return res.status(409).json({ mensagem: "Este e-mail já está cadastrado." });

    const senhaHash = await bcrypt.hash(senha, 12);
    const [resultado] = await pool.execute(
      "INSERT INTO usuarios (nome, email, senha_hash) VALUES (?, ?, ?)",
      [nome, email, senhaHash]
    );
    const token = jwt.sign({ id: resultado.insertId }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.status(201).json({ mensagem: "Conta criada com sucesso!", token });
  } catch (erro) {
    console.error("Erro no cadastro:", erro);
    return res.status(500).json({ mensagem: "Não foi possível criar a conta. Confira o servidor e o banco." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const senha = String(req.body.senha || "");
    const [usuarios] = await pool.execute(
      "SELECT id, senha_hash FROM usuarios WHERE email = ? LIMIT 1", [email]
    );
    if (!usuarios.length || !(await bcrypt.compare(senha, usuarios[0].senha_hash)))
      return res.status(401).json({ mensagem: "E-mail ou senha incorretos." });
    const token = jwt.sign({ id: usuarios[0].id }, process.env.JWT_SECRET, { expiresIn: "2h" });
    return res.json({ mensagem: "Login realizado com sucesso!", token });
  } catch (erro) {
    console.error("Erro no login:", erro);
    return res.status(500).json({ mensagem: "Não foi possível entrar. Tente novamente." });
  }
});

// GET /api/auth/me — rota protegida
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const [usuarios] = await pool.execute(
      "SELECT id, nome, email, criado_em FROM usuarios WHERE id = ? LIMIT 1", [req.usuario.id]
    );
    if (!usuarios.length) return res.status(404).json({ mensagem: "Usuário não encontrado." });
    return res.json({ usuario: usuarios[0] });
  } catch (erro) {
    console.error("Erro ao carregar perfil:", erro);
    return res.status(500).json({ mensagem: "Não foi possível carregar seu perfil." });
  }
});

module.exports = router;
