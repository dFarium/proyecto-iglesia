const maxSizeFile = require("../middlewares/fileSize");
import { Response } from "express";

const fileSizeError = (err, res: Response) => {
  console.log("atrapado")
  // return res.status(201).send({ message: "Archivo subido correctamente" });
  // // if (err) {
  // //   console.log(err.code)
  // //   return res.status(413).send({ message: "El archivo es un grande" });
  // // } else {
  // //   return res.status(201).send({ message: "Archivo subido correctamente" });
  // // }
};

export { fileSizeError };
