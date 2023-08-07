import { Router } from "express";
import { crearItemCalendario } from "../../controllers/calendario/calendarioController";



export const calendarioRoutes = Router();

//POST
calendarioRoutes.post("/calendario/create", crearItemCalendario);

