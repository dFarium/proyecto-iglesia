import multer from "multer";
import * as fs from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    console.log(req.params.folderName);
    const route = "./upload/" + req.params.folderName;
    if (!fs.existsSync(route)) {
      fs.mkdirSync(route, { recursive: true });
    }
    cb(null, route);
  },

  filename: function (req: Request, file, cb) {
    console.log(req.params.name);
    let tipo: string;
    if (file.mimetype == "application/pdf") {
      tipo = ".pdf";
    } else {
      if (file.mimetype == "application/msword") {
        tipo = ".doc";
      } else {
        if (
          file.mimetype ==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          tipo = ".docx";
        } else {
          if (file.mimetype == "image/jpeg") {
            tipo = ".jpg";
          }
        }
      }
    }

    // let indice = file.originalname.indexOf(tipo);
    // let nombre = file.originalname.substring(0, indice);

    // const nameFile =  + " " + nombre + tipo;
    const nameFile = req.params.name;
    cb(null, nameFile);
  },
});

const upload = multer({
  storage: storage,
  // fileFilter: (req,file,cb) => {
  //     // if(file.mimetype == 'application/pdf' || file.mimetype == 'application/msword' || file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
  //     //     //console.log("El archivo es .doc, .docx o .pdf")
  //     //     req.params.fileValido = true
  //     // } else {
  //     //     //console.log("El archivo tiene otra extension")
  //     //     req.params.fileValido = true
  //     // }
  //     // console.log("entra fileFilter"),
  //     // cb(null, req.params.fileValido)
  //     cb(null, true)
  // },
  limits: {
    fileSize: 1024 * 1024 * 15,
  },
});

export { upload };
