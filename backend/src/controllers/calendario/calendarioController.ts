
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

export { crearItemCalendario };
