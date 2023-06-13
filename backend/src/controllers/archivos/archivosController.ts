import { Archivos, IArchivos } from "../../models/archivos/archivos";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import * as fs from 'fs'
interface MulterRequest extends Request {
    file: any;
}

const uploadNewFile = async(req: Request, res: Response) => {
    const file = req.files[0]
    // if (req.params.fileValido === false){
    //     return res.status(415).send({ message: 'Solo se aceptan archivos con extensión .pdf, .doc y .docx' })
    // }
    // if (file.length === 0) {
    //     return res.status(404).send({ message: 'No se ha seleccionado ningun archivo' })
    // }
    const newFile = new Archivos({
        fileName:file.originalname,
        tagCategoria: "random",
        mimetype:file.mimetype,
        url: file.destination,
        userSubida: null,
        userModifica: null,
        publico: false
    })

    await newFile.save().catch((err: CallbackError) => {
        return res.status(400).send({ message: "Error al subir el archivo" });
    });
    return res.status(201).send(newFile);
}

const getFiles = async (req: Request, res: Response) => {
    await Archivos.find({})
        .sort({ createdAt: "desc" })
        .then((items: IArchivos[]) => {
            if (items.length === 0) {
                console.log("Vacio")
                return res.status(200).send([]);
            }
            return res.status(200).send(items);
        })
        .catch((err: CallbackError) => {
            return res
                .status(400)
                .send({ message: "Error al obtener los archivos completos" });
        });
};

const downloadFile = async (req: Request, res: Response) => {
    await Archivos.findById(req.params.id)
        .then((item) => {
            let fechaArchivo = item.createdAt.getFullYear() + '_' + (item.createdAt.getMonth() + 1) + '_' + item.createdAt.getDate() + '_' + item.createdAt.getHours() + '_' + item.createdAt.getMinutes() + '_' + item.createdAt.getSeconds()
            return res.download(item.url+'/'+fechaArchivo+' '+item.fileName);
        })
        .catch((err: CallbackError) => {
            return res
            .status(400)
            .send({ message: "Error al encontrar el archivo" });
        });
};

const deleteFile = async (req: Request, res: Response) => {
    await Archivos.findByIdAndDelete(req.params.id)
        .then((item) => {
            let fechaArchivo = item.createdAt.getFullYear() + '_' + (item.createdAt.getMonth() + 1) + '_' + item.createdAt.getDate() + '_' + item.createdAt.getHours() + '_' + item.createdAt.getMinutes() + '_' + item.createdAt.getSeconds()
            let fileUrl= item.url+'/'+fechaArchivo+' '+item.fileName
            fs.unlink(fileUrl,(err)=>{
                if (err){
                    return res.status(400).send({ message: "Error al obtener el archivo" })
                }
                return res.status(200).send({ message: "Archivo Eliminado" })
            })
        })
        .catch((err: CallbackError) => {
            return res
            .status(400)
            .send({ message: "Error al borrar el archivo" });
        });
};

const viewFile = async (req: Request, res: Response) => {
    await Archivos.findById(req.params.id)
        .then((item) => {
            return res.status(200).send(item);
        })
        .catch((err: CallbackError) => {
            return res
            .status(400)
            .send({ message: "Error al encontrar el archivo" });
        });
};

// const viewFavorite = async (req: Request, res: Response) => {
//     await Archivos.findById(req.params.id)
//         .then((item) => {
//             return res.status(200).send(item);
//         })
//         .catch((err: CallbackError) => {
//             return res
//             .status(400)
//             .send({ message: "Error al encontrar el archivo" });
//         });
// };

// const viewAsambleaFiles = (req, res)=>{

//     Asamblea.findById(req.params.id, (error, asamblea) => {
//         if (error) {
//             return res.status(400).send({ message: "Error al obtener los archivo" })
//         }
//         if (!asamblea) {
//             return res.status(404).send({ message: "La asamblea no existe" })
//         }

//         fileModel.find({asamblea: req.params.id},(error,files)=>{
//             if(error){
//                 return res.status(400).send({ message: 'Error al obtener los archivo'})
//             }
//             if(files.length === 0){
//                 return res.status(404).send({ message: 'No existen archivos'})
//             }else{
//                 return res.status(201).send(files)
//             }
//         })
//     })
// }


export{
    uploadNewFile,
    getFiles,
    downloadFile,
    deleteFile,
    viewFile
}