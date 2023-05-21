import { ItemInventario, IItemInventario } from "../../models/inventario/item";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";

const createItemInventario = async (req: Request, res: Response) => {
  let newItem = new ItemInventario(req.body);

  ItemInventario.findOne({ nombre: req.body.nombre }).then(
    async (item: IItemInventario) => {
      if (item) {
        return res.status(400).send({ message: "El Item ya existe" });
      }
      await newItem
        .save()
        .catch((err: CallbackError) => {
          console.log(err);
          return res.status(400).send({ message: "Error al crear item" });
        })
        .then(() => {
          return res.status(201).send(newItem);
        });
    }
  );
};

const getItemInventario = async (req: Request, res: Response) => {
  await ItemInventario.findOne({ nombre: req.body.nombre })
    .then((item: IItemInventario) => {
      return res.status(200).send(item);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Error al encontrar el item del inventario" });
    });
};

const editItemInventario = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await ItemInventario.findByIdAndUpdate(id, req.body.newItem)
    .then((item: IItemInventario) => {
      if (!item) {
        return res.status(404).send({ message: "Item no encontrado" });
      }
      return res.status(200).send({ message: "Item actualizado" });
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res.status(400).send({ message: "Error al editar Item" });
    });
};

const deleteItemInventario = async (req: Request, res: Response) => {
  const { id } = req.body;
  await ItemInventario.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).send({ message: "Item eliminado correctamente" });
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res.status(400).send({ message: "Error al eliminar el Item" });
    });
};

const getAllItemsInventario = async (req: Request, res: Response) => {
  await ItemInventario.find({})
    .sort({ createdAt: "desc" })
    .then((items: IItemInventario[]) => {
      if (items.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(items);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Error al obtener los Items del inventario" });
    });
};

const getItemsInventarioCategoria = async (req: Request, res: Response) => {
  const categoria: string = req.params.categoria;
  await ItemInventario.find({ categoria: categoria })
    .sort({ createdAt: "desc" })
    .then((items: IItemInventario[]) => {
      if (items.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(items);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res.status(400).send({ message: "Error al encontrar los items" });
    });
};

export {
  createItemInventario,
  getItemInventario,
  editItemInventario,
  deleteItemInventario,
  getAllItemsInventario,
  getItemsInventarioCategoria,
};
