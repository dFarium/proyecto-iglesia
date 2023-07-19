import { Router } from "express";
import {
    createPrestamoInstrumento,
    getIPrestamoInstrumento,
    editPrestamoInstrumento,
    deleteIPrestamoInventario,
    getAllPrestamosInstrumento,
    notificarPrestamosPendientes,
} from "../../controllers/prestamo/prestamoController";

export const prestamoRoutes = Router();

// post
prestamoRoutes.post("/prestamo/create", createPrestamoInstrumento);
//prestamoRoutes.post("/prestamo/pending", notificarPrestamosPendientes);

//put
prestamoRoutes.put("/prestamo/edit/:id", editPrestamoInstrumento);

//delete
prestamoRoutes.delete("/prestamo/delete", deleteIPrestamoInventario);

//get
prestamoRoutes.get("/prestamo/getone", getIPrestamoInstrumento);
prestamoRoutes.get("/prestamo/getall", getAllPrestamosInstrumento);
