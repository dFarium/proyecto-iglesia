import { Router } from "express";
import {
  createItemInventario,
  deleteItemInventario,
  editItemInventario,
  getAllItemsInventario,
  getItemInventario,
  getItemsInventarioCategoria,
} from "../../controllers/inventario/itemController";

export const inventarioRoutes = Router();

// post
inventarioRoutes.post("/inventario/create", createItemInventario);

//put
inventarioRoutes.put("/inventario/edit/:id", editItemInventario);

//delete
inventarioRoutes.delete("/inventario/delete", deleteItemInventario);

//get
inventarioRoutes.get("/inventario/getone/:id", getItemInventario);
inventarioRoutes.get("/inventario/getall", getAllItemsInventario);
inventarioRoutes.get(
  "/inventario/getcategoria/:categoria",
  getItemsInventarioCategoria
);
