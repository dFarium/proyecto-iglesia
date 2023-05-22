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
    console.log("AAAAAAAAAAAA", file);
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
        console.log("save");
        console.log(err);
        return res.status(400).send({ message: "Error al subir el archivo" });
    });
    console.log("Final save");
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
            console.log(err);
            return res
                .status(400)
                .send({ message: "Error al obtener los archivos completos" });
        });
};

const downloadFile = async (req: Request, res: Response) => {
    await Archivos.findById(req.params.id)
        .then((item) => {
            console.log("ya no");
            console.log(item.url);
            let fechaArchivo = item.createdAt.getFullYear() + '_' + (item.createdAt.getMonth() + 1) + '_' + item.createdAt.getDate() + '_' + item.createdAt.getHours() + '_' + item.createdAt.getMinutes() + '_' + item.createdAt.getSeconds()
            return res.download(item.url+'/'+fechaArchivo+' '+item.fileName);
            //return res.status(200).send(item);
        })
        .catch((err: CallbackError) => {
            //console.log(err);
            return res
            .status(400)
            .send({ message: "Error al encontrar el archivo" });
        });
};

// const deleteFile = (req, res) => {
//     const id = req.params.id
//     const archivo = req.params.archivo
//     Asamblea.findById(id).then((asamblea)=>{
//         if(!asamblea){
//             return res.status(404).send({ message: 'No se ha encontrado la asamblea'})
//         }
//         //CREAR VECTOR
//         let vector1 = asamblea.archivos
//         const vector2 = vector1.filter(criterio => criterio!= req.params.archivo)
//         Asamblea.findByIdAndUpdate(id, {archivos: vector2} , (error) => {
//             if(error){
//                 return res.status(400).send({ message: 'Error al eliminar el archivo'})
//             }else{
//                 fileModel.findByIdAndDelete(archivo, async (err, file)=>{
//                     if(err){
//                         return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
//                     }
//                     if(!file){
//                         return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
//                     }
//                     await fs.unlink(file.url,(err)=>{
//                         if (err){
//                             return res.status(400).send({ message: "Error al obtener el archivo" })
//                         }
//                         return res.status(200).send({ message: "Archivo Eliminado" })
//                     })
//                 })
//             }
//         })
//     })
// }

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


// const eliminarArchivosAsociados = (req, res)=>{

//     Asamblea.findByIdAndUpdate(req.params.id, {archivos: []} , (error, asamblea) => {
//         if(error){
//             return res.status(404).send({ message: 'No se ha encontrado la asamblea'})
//         }
//         if (!asamblea) {
//             return res.status(404).send({ message: "La asamblea no existe" })
//         }
//         fileModel.find({asamblea: req.params.id}, (error,files)=>{
//             if(error){
//                 return res.status(400).send({ message: 'Error al obtener los archivos'})
//             }
//             if(files.length === 0){
//                 return res.status(200).send({ message: 'No existen archivos que eliminar'})
//             }
//             let largo= files.length
//             let flag=0
//             files.map(files =>{
//                 fileModel.findByIdAndDelete(files._id, async (err, file)=>{
//                     if(err && flag!=-1){
//                         flag=-1
//                         return res.status(400).send({ message: 'No se ha podido eliminar el archivo'})
//                     }
//                     if(!file && flag!=-1){
//                         flag=-1
//                         return res.status(404).send({ message: 'No se ha podido encontrar el archivo'})
//                     }
//                     await fs.unlink(file.url,(err)=>{
//                         if (err && flag!=-1){
//                             flag=-1
//                             return res.status(400).send({ message: "Error al obtener el archivo" })
//                         }
//                         if(flag!=-1){
//                             flag= flag+1
//                         }
//                         if(flag==largo){
//                             return res.status(200).send({ message: "Archivos Eliminados" })
//                         }
//                     })
//                 })
//             })
//         })
//     })
// }

export{
    uploadNewFile,
    getFiles,
    downloadFile,
    // deleteFile,
    viewFile
    // eliminarArchivosAsociados
}