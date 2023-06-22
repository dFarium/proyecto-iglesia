import { Router } from "express";
import {
    crearGastoTesoreria,
    obtenerGastosTesoreria,
    editarGastoTesoreria,
    eliminarGastoTesoreria,
    obtenerTodoGastoTesoreria,
} from "../../controllers/tesoreria/tesoreriaController";

export const tesoreriaRoutes = Router();

//POST
tesoreriaRoutes.post("/tesoreria/create", crearGastoTesoreria);
//put
tesoreriaRoutes.put("/tesoreria/edit/:id", editarGastoTesoreria);

//delete
tesoreriaRoutes.delete("/tesoreria/delete", eliminarGastoTesoreria);

//get
tesoreriaRoutes.get("/tesoreria/getone", obtenerGastosTesoreria);
tesoreriaRoutes.get("/tesoreria/getall", obtenerTodoGastoTesoreria);
