require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./config/database");
const authRoutes = require("./routes/authRoutes");

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  console.error("Configure JWT_SECRET com pelo menos 32 caracteres nas variáveis do serviço.");
  process.exit(1);
}

const app = express();
const port = Number(process.env.PORT || 3000);
const sitePath = path.join(__dirname, "../../");
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ api: "ok", banco: "conectado" });
  } catch (erro) {
    console.error("Falha ao consultar MySQL:", erro.message);
    res.status(500).json({ api: "ok", banco: "desconectado" });
  }
});

app.use("/api/auth", authRoutes);
// O próprio backend entrega HTML, CSS e JavaScript: site e API usam o mesmo domínio.
app.use(express.static(sitePath));
app.get("/", (req, res) => res.sendFile(path.join(sitePath, "index.html")));

app.listen(port, "0.0.0.0", () => {
  console.log(`FUTURO+ disponível na porta ${port}`);
});
