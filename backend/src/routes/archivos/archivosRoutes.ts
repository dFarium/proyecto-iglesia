import { Router } from "express";
import { upload } from "../../middlewares/handleMulter";
import { fileSizeError } from "../../middlewares/fileSize";
import {
  uploadNewFile,
  getFiles,
  downloadFile,
  deleteFile,
  viewFile,
  sendImg,
} from "../../controllers/archivos/archivosController";

export const archivosRoutes = Router();

// post
archivosRoutes.post("/file/data", uploadNewFile);
archivosRoutes.post(
  "/file/upload/:folderName/:name",
  upload.array("archivos"),
  fileSizeError
);

//put
// archivosRoutes.put("/inventario/edit/:id", editItemInventario);

//delete
archivosRoutes.delete("/file/delete/:id", deleteFile);

//get
archivosRoutes.get("/files/", getFiles);
archivosRoutes.get("/file/download/:id", downloadFile);
archivosRoutes.get("/file/specific/:id", viewFile);
archivosRoutes.get("/file/:folderName/:name", sendImg);
 