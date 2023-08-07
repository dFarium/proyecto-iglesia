import { ItemTesoreria2, ItemTesoreria } from "../../models/tesoreria/dinero";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";


const crearGastoIngresoTesoreria = async (req: Request, res: Response) => {
    let newItem = new ItemTesoreria2(req.body);

    ItemTesoreria2.findOne({ nombre: req.body.nombre }).then(
        async (item: ItemTesoreria) => {
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



const ObtenerGastoIngresoTesoreria = async (req: Request, res: Response) => {
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

const editarGastoIngresoTesoreria = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    await ItemTesoreria2.findByIdAndUpdate(id, req.body.newItem)
        .then((item: ItemTesoreria) => {
            if (!item) {
                return res.status(404).send({ message: "No encontrado" });
            }
            return res.status(200).send({ message: "Actualizado" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al editar" });
        });
};

const eliminarGastoIngresoTesoreria = async (req: Request, res: Response) => {
    const { id } = req.body;
    await ItemTesoreria2.findByIdAndDelete(id)
        .then(() => {
            return res.status(200).send({ message: "Eliminado correctamente" });
        })
        .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al eliminar" });
        });
};

const obtenerTodoTesoreria = async (req: Request, res: Response) => {
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
                .send({ message: "Error al obtener los Items de tesoreria" });
        });
};


const obtenerIngresoTesoreria = async (req: Request, res: Response) => {
    const tipoIngreso = "Ingreso";

    await ItemTesoreria2.find({ tipo: tipoIngreso })
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
                .send({ message: "Error al obtener los ingresos de tesoreria" });
        });
};

const obtenerGastoTesoreria = async (req: Request, res: Response) => {
    const tipoIngreso = "Gasto";

    await ItemTesoreria2.find({ tipo: tipoIngreso })
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
                .send({ message: "Error al obtener los gastos de tesoreria" });
        });
};

const obtenerGastosTesoreriaPorFecha = async (req: Request, res: Response, fechaInicio: Date, fechaFin: Date) => {
    await ItemTesoreria2.find({ tipo: "Gasto", fechaGasto: { $gte: fechaInicio, $lte: fechaFin } })
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
                .send({ message: "Error al obtener los Items de tesoreria" });
        });
};

const obtenerIngresoTesoreriaPorFecha = async (req: Request, res: Response, fechaInicio: Date, fechaFin: Date) => {
    await ItemTesoreria2.find({ tipo: "Ingreso", fechaGasto: { $gte: fechaInicio, $lte: fechaFin } })
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
                .send({ message: "Error al obtener los Items de tesoreria" });
        });
};


export {
    crearGastoIngresoTesoreria,
    ObtenerGastoIngresoTesoreria,
    editarGastoIngresoTesoreria,
    eliminarGastoIngresoTesoreria,
    obtenerTodoTesoreria,
    obtenerIngresoTesoreria,
    obtenerGastoTesoreria,
    obtenerGastosTesoreriaPorFecha,
    obtenerIngresoTesoreriaPorFecha
};