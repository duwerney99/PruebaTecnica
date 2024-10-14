const jwt = require('jsonwebtoken');

function verificaToken(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.username = payload.nombre;  
    next(); 
  } catch (error) {
    return res.status(403).json({ message: "Token no válido" });
  }
}

module.exports = verificaToken;
