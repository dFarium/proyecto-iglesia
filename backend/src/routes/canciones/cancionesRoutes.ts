import {Router} from "express";
import {createCancion,getCancion,editarCancion,deleteCancion,getAllCancion} from "../../controllers/canciones/cancionesController";

export const cancionesRoutes = Router();

cancionesRoutes.post("/canciones/create",createCancion);
cancionesRoutes.put("/canciones/edit/:id",editarCancion);
cancionesRoutes.delete("/canciones/delete", deleteCancion);
cancionesRoutes.get("/canciones/getone", getCancion);
cancionesRoutes.get("/canciones/getall",getAllCancion);