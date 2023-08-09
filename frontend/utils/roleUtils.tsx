import jwt, { JwtPayload } from "jsonwebtoken";

export default function getRole() {
  let decoded;
  let rol;
  const token: string | null = localStorage.getItem("auth-token");
  if (!token) return false;
  try {
    decoded = jwt.decode(token) as JwtPayload;
    rol = decoded.rol[0].name;
  } catch (e) {
    console.error("ERROR AL DECODIFICAR TOKEN", e);
  }
  return rol === "directiva" || rol === "admin";
}

export function getUserName() {
  let decoded;
  let name;
  const token: string | null = localStorage.getItem("auth-token");
  if (!token) return false;
  try {
    decoded = jwt.decode(token) as JwtPayload;
    name = decoded.name;
  } catch (e) {
    console.error("ERROR AL DECODIFICAR TOKEN", e);
  }
  return name;
}
