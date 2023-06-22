import { ItemTesoreria2, ItemTesoreria } from "../../models/tesoreria/dinero";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";



const crearGastoTesoreria = async (req: Request, res: Response) => {
    let newItem = new ItemTesoreria2(req.body);

    await newItem.save().catch((err: CallbackError) => {
        console.log(err);
        return res.status(400).send({ message: "Error al crear Gasto" });
    });
    return res.status(201).send(newItem);
};

const obtenerGastosTesoreria = async (req: Request, res: Response) => {
    await ItemTesoreria2.findOne({ name: req.body.name })
        .then((item: ItemTesoreria) => {
            return res.status(200).send(item);
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res
                .status(400)
                .send({ message: "Error al encontrar el gasto de Tesoreria" });
        });
};

const editarGastoTesoreria = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await ItemTesoreria2.findByIdAndUpdate(id, req.body.newItem)
        .then((item: ItemTesoreria) => {
            if (!item) {
                return res.status(404).send({ message: "Gasto no encontrado" });
            }
            return res.status(200).send({ message: "Gasto actualizado" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al editar Gasto" });
        });
};

const eliminarGastoTesoreria = async (req: Request, res: Response) => {
    const { id } = req.body;
    await ItemTesoreria2.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).send({ message: "Gasto eliminado correctamente" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al eliminar el Gasto" });
        });
};

const obtenerTodoGastoTesoreria = async (req: Request, res: Response) => {
    await ItemTesoreria2.find({})
        .sort({ createdAt: "desc" })
        .then((items: ItemTesoreria[]) => {
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

export {
    crearGastoTesoreria,
    obtenerGastosTesoreria,
    editarGastoTesoreria,
    eliminarGastoTesoreria,
    obtenerTodoGastoTesoreria,
};