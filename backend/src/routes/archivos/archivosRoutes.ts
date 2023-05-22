import { Router } from "express";
import{
    upload
}from "../../middlewares/handleMulter"
import{
    fileSizeError
}from "../../middlewares/fileSize"
import {
    uploadNewFile,
    getFiles,
    downloadFile,
} from "../../controllers/archivos/archivosController";

export const archivosRoutes = Router();

// post
archivosRoutes.post("/file/:archivo/", upload.array('archivos'), fileSizeError, uploadNewFile);

// //put
// archivosRoutes.put("/inventario/edit/:id", editItemInventario);

// //delete
// archivosRoutes.delete("/inventario/delete", deleteItemInventario);

//get
archivosRoutes.get("/files/", getFiles)
archivosRoutes.get('/file/download/:id', downloadFile)

