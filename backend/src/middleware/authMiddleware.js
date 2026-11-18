const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ mensagem: "Faça login para acessar esta área." });
  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (erro) {
    return res.status(401).json({ mensagem: "Sessão inválida ou expirada. Entre novamente." });
  }
}

module.exports = authMiddleware;
