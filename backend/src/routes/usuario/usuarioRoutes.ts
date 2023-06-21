import { Router } from "express";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
  logoutUser,
} from "../../controllers/usuario/usuarioController";

export const usuarioRoutes = Router();

// post
usuarioRoutes.post("/usuario/login", loginUser);
usuarioRoutes.post("/usuario/register", registerUser);

// get
usuarioRoutes.get("/usuario/:id", getUser);
usuarioRoutes.get("/usuarios", getUsers);
usuarioRoutes.get("/usuario/logout", logoutUser);

// put
usuarioRoutes.put("/usuario/update/:id", updateUser);

// delete
usuarioRoutes.delete("/usuario/delete/:id", deleteUser);