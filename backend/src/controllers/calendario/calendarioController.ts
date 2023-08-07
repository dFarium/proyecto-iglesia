import { Request, Response } from "express";
import { ItemCalendario2 } from "../../models/calendario/calendarioModel";


const crearItemCalendario = async (req: Request, res: Response) => {
    let newItem = new ItemCalendario2(req.body);
    await newItem.save().catch((err) => {
        console.log(err);
        return res.status(400).send({ message: "Error al crear el item del calendario" });
    });
    return res.status(201).send(newItem);
};

export { crearItemCalendario }