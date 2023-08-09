import { Request, Response } from "express";
import { ItemCalendario2 } from "../../models/calendario/calendarioModel";
import { CallbackError } from "mongoose";


const crearItemCalendario = async (req: Request, res: Response) => {
    let newItem = new ItemCalendario2(req.body);
    await newItem.save().catch((err) => {
        console.log(err);
        return res.status(400).send({ message: "Error al crear el item del calendario" });
    });
    return res.status(201).send(newItem);
};
/*  */
/* const editarItemCalendario = async (req: Request, res: Response) => {
    const { id } = req.body;
    await ItemCalendario2.findByIdAndUpdate(id, req.body)
        .then(() => {
            return res.status(200).send({ message: "Editado correctamente" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al editar" });
        });
}; */

const editarItemCalendario = async (req: Request, res: Response) => {
    const id = req.params.id; // Obtén el ID del parámetro de la URL
    const updatedData = req.body; // Datos actualizados desde el cuerpo de la solicitud

    try {
        const updatedItem = await ItemCalendario2.findByIdAndUpdate(id, updatedData, { new: true });

        if (updatedItem) {
            return res.status(200).json({ message: "Editado correctamente", item: updatedItem });
        } else {
            return res.status(404).json({ message: "Elemento no encontrado" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al editar" });
    }
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
