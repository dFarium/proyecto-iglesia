import { ModeloCancion, IModeloCancion } from "../../models/canciones/canciones";
import { Request,Response } from "express";
import { CallbackError } from "mongoose";

const createCancion = async (req: Request, res: Response)=>{
    let newCancion = new ModeloCancion(req.body);
    await newCancion.save().catch((err: CallbackError)=>{
        console.log(err);
        return res.status(400).send({message: "Error al crear espacio para cancion"});
    });
    return res.status(201).send(newCancion);
};

const getCancion =async (req:Request, res: Response) => {
    await ModeloCancion.findOne({name: req.body.name})
    .then((cancion: IModeloCancion)=>{
        return res.status(200).send(cancion);
    })
    .catch((err: CallbackError)=>{
        console.log(err);
        return res.status(400).send({message: "Error al encontrar la cancion"});
    });
};

const editarCancion =async (req:Request, res: Response) => {
    const id: string = req.params.id;
    console.log(req.body);
    await ModeloCancion.findByIdAndUpdate(id, req.body)
    .then((cancion: IModeloCancion)=>{
        if(!cancion){
            return res.status(404).send({message:"Cancion no encontrada"});
        }

        return res.status(200).send({message: "Cancion actualizada"});
    })
    .catch((err: CallbackError)=>{
        console.log(err);
        return res.status(400).send({message: "Error al editar la cancion"});
    });
};

const deleteCancion =async (req:Request, res: Response) => {
    const {id} = req.body;
    await ModeloCancion.findByIdAndDelete(id)
    .then(()=>{
        return res.status(200).send({message: "La cancion fue eliminada correctamente"});
    })
    .catch((err: CallbackError)=>{
        console.log(err);
        return res.status(400).send({message: "Error al eliminar la cancion"});
    });
};

const getAllCancion =async (req:Request, res: Response) => {
    await ModeloCancion.find({}).then((canciones: IModeloCancion[])=>{
        if (canciones.length === 0) {
            return res.status(200).send([]);
        }
        return res.status(200).send(canciones);
    })
    .catch((err: CallbackError)=>{
        console.log(err);
        return res.status(400).send({message: "Error al obtener las canciones"});
    });
};

export {
    createCancion,
    getCancion,
    editarCancion,
    deleteCancion,
    getAllCancion
};