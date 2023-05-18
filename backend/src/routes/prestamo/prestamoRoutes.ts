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
prestamoRoutes.post("/inventario/create", createPrestamoInstrumento);

//put
prestamoRoutes.put("/inventario/edit/:id", editPrestamoInstrumento);

//delete
prestamoRoutes.delete("/inventario/delete", deleteIPrestamoInventario);

//get
prestamoRoutes.get("/inventario/getone", getIPrestamoInstrumento);
prestamoRoutes.get("/inventario/getall", getAllPrestamosInstrumento);
