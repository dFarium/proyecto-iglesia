import { Router } from "express";

import { crearItemCalendario, editarItemCalendario, eliminarItemCalendario, obtenerListaCalendario } from "../../controllers/calendario/calendarioController";



export const calendarioRoutes = Router();

//POST
calendarioRoutes.post("/calendario/create", crearItemCalendario);

//PUT
calendarioRoutes.put("/calendario/edit/:id", editarItemCalendario);

//DELETE
calendarioRoutes.delete("/calendario/delete", eliminarItemCalendario);

//GET
calendarioRoutes.get("/calendario/getall", obtenerListaCalendario);
