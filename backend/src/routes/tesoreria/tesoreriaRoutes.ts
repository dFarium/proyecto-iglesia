import { Router } from "express";
import {
    crearGastoIngresoTesoreria,
    ObtenerGastoIngresoTesoreria,
    editarGastoIngresoTesoreria,
    eliminarGastoIngresoTesoreria,
    obtenerTodoTesoreria,
    obtenerIngresoTesoreria,
    obtenerGastoTesoreria,
} from "../../controllers/tesoreria/tesoreriaController";

export const tesoreriaRoutes = Router();

//POST
tesoreriaRoutes.post("/tesoreria/create", crearGastoIngresoTesoreria);
//put
tesoreriaRoutes.put("/tesoreria/edit/:id", editarGastoIngresoTesoreria);

//delete
tesoreriaRoutes.delete("/tesoreria/delete", eliminarGastoIngresoTesoreria);

//get
tesoreriaRoutes.get("/tesoreria/getone", ObtenerGastoIngresoTesoreria);//Obtiene 1 solo
tesoreriaRoutes.get("/tesoreria/getall", obtenerTodoTesoreria);
tesoreriaRoutes.get("/tesoreria/geting", obtenerIngresoTesoreria);
tesoreriaRoutes.get("/tesoreria/getgas", obtenerGastoTesoreria);
