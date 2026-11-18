const mysql = require("mysql2/promise");

// Railway fornece MYSQLHOST, MYSQLPORT, MYSQLUSER, MYSQLPASSWORD e MYSQLDATABASE.
// Para desenvolvimento local, use as variáveis DB_* no arquivo .env.
const pool = mysql.createPool({
  host: process.env.DB_HOST || process.env.MYSQLHOST || "localhost",
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
  user: process.env.DB_USER || process.env.MYSQLUSER || "root",
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || "",
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || "futuro_mais",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
