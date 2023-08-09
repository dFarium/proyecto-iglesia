import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { ItemCalendario, ItemCalendario2 } from "../../models/calendario/calendarioModel";

const crearItemCalendario = async (req: Request, res: Response) => {
    let newItem = new ItemCalendario2(req.body);

    ItemCalendario2.findOne({ nombreAct: req.body.nombreAct }).then(
        async (item: ItemCalendario) => {
            if (item) {
                return res.status(400).send({ message: "Ya existe" });
            }
            await newItem
                .save()
                .catch((err: CallbackError) => {
                    console.log(err);
                    return res.status(400).send({ message: "Error al crear" });
                })
                .then(() => {
                    return res.status(201).send(newItem);
                });
        }
    );
};

const editarItemCalendario = async (req: Request, res: Response) => {
    const { id } = req.body;
    await ItemCalendario2.findByIdAndUpdate(id, req.body)
        .then(() => {
            return res.status(200).send({ message: "Editado correctamente" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al editar" });
        });
};

const eliminarItemCalendario = async (req: Request, res: Response) => {
    const { id } = req.body;
    await ItemCalendario2.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).send({ message: "Eliminado correctamente" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al eliminar" });
        });
};

const obtenerListaCalendario = async (req: Request, res: Response) => {
    await ItemCalendario2.find({})
        .then((data) => {
            return res.status(200).send(data);
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al obtener la lista" });
        });
};

export {
    crearItemCalendario,
    eliminarItemCalendario,
    editarItemCalendario,
    obtenerListaCalendario
};
