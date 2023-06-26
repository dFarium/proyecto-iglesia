import { Router } from "express";
import { isAdmin, isDirectiva } from "../../middlewares/verifyRols"
import { verifyToken } from "../../middlewares/validate-token"

import {
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
} from "../../controllers/usuario/usuarioController";

export const usuarioRoutes = Router();

// post
usuarioRoutes.post("/usuario/login", loginUser);
usuarioRoutes.post("/usuario/register", [verifyToken, isAdmin], registerUser);

// get
usuarioRoutes.get("/usuario/:id", getUser);
usuarioRoutes.get("/usuarios", getUsers);

// put
usuarioRoutes.put("/usuario/update/:id", updateUser);

// delete
usuarioRoutes.delete("/usuario/delete/:id", isAdmin, deleteUser);