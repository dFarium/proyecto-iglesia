import { Archivos, IArchivos } from "../../models/archivos/archivos";
import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import * as fs from "fs";
import path from "path";

interface MulterRequest extends Request {
    file: any;
}

const uploadNewFile = async(req: Request, res: Response) => {

    const file = req.files[0]
    //console.log("FILE", file)
    const newFile = new Archivos({
        originalName: file.originalname,
        fileName: file.filename,
        mimetype: file.mimetype,
        url: file.destination ,
        tagCategoria: req.params.tag,
        publico: req.params.acceso
    })
    //console.log("newFile:", newFile)
    await newFile
        .save()
        .catch((err: CallbackError) => {
            //console.log("NO save ",err);
            return res.status(400).send({ message: "Error al subir el archivo" });
        }).then(() => {
            //console.log("Subido");
            return res.status(201).send(newFile);
        })
}

// const getFiles = async (req: Request, res: Response) => {
//     await Archivos.find({tagCategoria: "-random"})
//         .sort({ createdAt: "desc" })
//         .then((items: IArchivos[]) => {
//             if (items.length === 0) {
//                 //console.log("Vacio");
//                 return res.status(200).send([]);
//             }
//             return res.status(200).send(items);
//         })
//         .catch((err: CallbackError) => {
//             return res
//                 .status(400)
//                 .send({ message: "Error al obtener los archivos completos" });
//         });
// };

const getFiles = async (req: Request, res: Response) => {
    await Archivos.find({tagCategoria: {$nin: ["Fotos Inventario","Random","Boletas","Canciones"]}})
        .sort({ createdAt: "desc" })
        .then((items: IArchivos[]) => {
            if (items.length === 0) {
                //console.log("Vacio");
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
            //console.log(item.url + "/" + item.fileName)
            return res.download(item.url + "/" + item.fileName, item.originalName);
        })
        .catch((err: CallbackError) => {
            return res.status(400).send({ message: "Error al encontrar el archivo" });
        });
};

const deleteFile = async (req: Request, res: Response) => {
    await Archivos.findByIdAndDelete(req.params.id)
        .then((item) => {
            let fileUrl = item.url + "/" + item.fileName;
            fs.unlink(fileUrl, (err) => {
                if (err) {
                    return res
                        .status(400)
                        .send({ message: "Error al obtener el archivo" });
                }
                return res.status(200).send({ message: "Archivo Eliminado" });
            });
        })
        .catch((err: CallbackError) => {
            return res.status(400).send({ message: "Error al borrar el archivo" });
        });
};

const viewFile = async (req: Request, res: Response) => {
    await Archivos.findById(req.params.id)
        .then((item) => {
            return res.status(200).send(item);
        })
        .catch((err: CallbackError) => {
            return res.status(400).send({ message: "Error al encontrar el archivo" });
        });
};

const sendImg = async (req: Request, res: Response) => {
    const folderName = req.params.folderName;
    const imgName = req.params.name;
    const imgPath = path.join(process.cwd(), "upload", folderName, imgName);
    console.log(imgPath);
    console.log("path:", imgPath);

    res.sendFile(imgPath);
};

const uploadNewFileData = async (req: Request, res: Response) => {
    const newFile = new Archivos(req.params.originalName);
    Archivos.findOne({ originalName: req.params.originalName }).then(
        async (file: IArchivos) => {
        await newFile
            .save()
            .catch((err: CallbackError) => {
            console.log(err);
            return res.status(400).send({ message: "Error al subir archivo" });
        })
        .then(() => {
            return res.status(201).send(newFile);
        });
    });
};

const viewFavorite = async (req: Request, res: Response) => {
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

export { uploadNewFile, uploadNewFileData, getFiles, downloadFile, deleteFile, viewFile, sendImg };

