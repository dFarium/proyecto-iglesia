import { UsuarioModel } from "../models/usuario/usuarioModel";
import Role from "../models/usuario/Role"
const User = UsuarioModel

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: "No se encontró al usuario" });
  }
  console.log("Usuario: ")
  console.log(user)

  // Comprueba si el rol de user es null
  if (!user.rol) {
    return res.status(400).json({ message: "El rol del usuario es nulo" });
  }

  const roles = await Role.find({_id: {$in: user.rol}})
  console.log(roles)
  for(const element of roles){
    if(element.name === "admin"){
      next();
      return;
    }
  }
  return res.status(403).json({message: "Requiere ser administrador"})
};

export const isDirectiva = async (req, res, next) => {
  const user = await User.findById(req.user.id)

  if (!user) {
    return res.status(404).json({ message: "No se encontró al usuario" });
  }
  console.log("Usuario: ")
  console.log(user)

  // Comprueba si el rol de user es null
  if (!user.rol) {
    return res.status(400).json({ message: "El rol del usuario es nulo" });
  }

  const roles = await Role.find({_id: {$in: user.rol}})
  console.log(roles)
  for(const element of roles){
    if(element.name === "directiva"){
      next();
      return;
    }
  }
  return res.status(403).json({message: "Requiere ser de la directiva"})
};