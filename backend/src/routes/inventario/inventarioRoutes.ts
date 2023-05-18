import { Router } from "express";
import {
  createItemInventario,
  deleteItemInventario,
  editItemInventario,
  getAllItemsInventario,
  getItemInventario,
} from "../../controllers/inventario/itemController";

export const inventarioRoutes = Router();

// post
inventarioRoutes.post("/inventario/create", createItemInventario);

//put
inventarioRoutes.put("/inventario/edit/:id", editItemInventario);

//delete
inventarioRoutes.delete("/inventario/delete", deleteItemInventario);

//get
inventarioRoutes.get("/inventario/getone", getItemInventario);
inventarioRoutes.get("/inventario/getall", getAllItemsInventario);
