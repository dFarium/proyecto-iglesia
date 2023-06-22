import { PrestamoInstrumento , IPrestamoInstrumento } from "../../models/prestamo/prestamo";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";

const nodeCron = require("node-cron");

const createPrestamoInstrumento = async (req: Request, res: Response) => {
  let newPrestamo = new PrestamoInstrumento(req.body);

  await newPrestamo.save().catch((err: CallbackError) => {
    console.log(err);
    return res.status(400).send({ message: "Error al generar prestamo" });
  });
  return res.status(201).send(newPrestamo);
};

const getIPrestamoInstrumento = async (req: Request, res: Response) => {
  await PrestamoInstrumento.findOne({ name: req.body.name })
    .then((item: IPrestamoInstrumento) => {
      return res.status(200).send(item);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Error al encontrar el prestamo" });
    });
};

const editPrestamoInstrumento = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  await PrestamoInstrumento.findByIdAndUpdate(id, req.body.newItem)
    .then((item: IPrestamoInstrumento) => {
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

const deleteIPrestamoInventario = async (req: Request, res: Response) => {
  const { id } = req.body;
  await PrestamoInstrumento.findByIdAndDelete(id)
    .then(() => {
      return res.status(200).send({ message: "Prestamo eliminado correctamente" });
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res.status(400).send({ message: "Error al eliminar el prstamo" });
    });
};

const getAllPrestamosInstrumento = async (req: Request, res: Response) => {
  await PrestamoInstrumento.find({})
    .sort({ createdAt: "desc" })
    .then((items: IPrestamoInstrumento[]) => {
      if (items.length === 0) {
        return res.status(200).send([]);
      }
      return res.status(200).send(items);
    })
    .catch((err: CallbackError) => {
      console.log(err);
      return res
        .status(400)
        .send({ message: "Error al obtener los prestamos de instrumentos" });
    });
};

//Revisa a las 9 si hay personas que necesitan ser avisadas
nodeCron.schedule('* 9 * * *',() =>{
  console.log("FUNCIONA");
});

export {
  createPrestamoInstrumento,
  getIPrestamoInstrumento,
  editPrestamoInstrumento,
  deleteIPrestamoInventario,
  getAllPrestamosInstrumento,
};
