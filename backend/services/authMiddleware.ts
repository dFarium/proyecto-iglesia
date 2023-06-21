//instalar jsonwebtoken, npm install jsonwebtoken
import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token de autenticación no proporcionado" });
  }

  //instalar npm install --save-dev @types/node
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
    if (err) {
      return res.status(403).json({ message: "Token de autenticación inválido" });
    }
    req.user = user;
    next();
  });
};