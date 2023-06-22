import { Router } from "express";
import { 
    createPrestamoInstrumento,
    getIPrestamoInstrumento,
    editPrestamoInstrumento,
    deleteIPrestamoInventario,
    getAllPrestamosInstrumento,
} from "../../controllers/prestamo/prestamoController";

export const prestamoRoutes = Router();

// post
prestamoRoutes.post("/prestamo/create", createPrestamoInstrumento);

//put
prestamoRoutes.put("/prestamo/edit/:id", editPrestamoInstrumento);

//delete
prestamoRoutes.delete("/prestamo/delete", deleteIPrestamoInventario);

//get
prestamoRoutes.get("/prestamo/getone", getIPrestamoInstrumento);
prestamoRoutes.get("/prestamo/getall", getAllPrestamosInstrumento);
