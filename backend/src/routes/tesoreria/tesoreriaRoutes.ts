import { Router } from "express";
import {
    crearGastoIngresoTesoreria,
    ObtenerGastoIngresoTesoreria,
    editarGastoIngresoTesoreria,
    eliminarGastoIngresoTesoreria,
    obtenerTodoTesoreria,
    obtenerIngresoTesoreria,
    obtenerGastoTesoreria,
    obtenerGastosTesoreriaPorFecha,
    obtenerIngresoTesoreriaPorFecha
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
tesoreriaRoutes.get("/tesoreria/getgasfecha/:fechaInicio/:fechaFin", async (req, res) => {
    const fechaInicio = new Date(req.params.fechaInicio);
    const fechaFin = new Date(req.params.fechaFin);
    obtenerGastosTesoreriaPorFecha(req, res, fechaInicio, fechaFin);
});
tesoreriaRoutes.get("/tesoreria/getinfecha/:fechaInicio/:fechaFin", async (req, res) => {
    const fechaInicio = new Date(req.params.fechaInicio);
    const fechaFin = new Date(req.params.fechaFin);
    obtenerIngresoTesoreriaPorFecha(req, res, fechaInicio, fechaFin);
});

