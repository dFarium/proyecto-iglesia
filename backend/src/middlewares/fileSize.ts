const maxSizeFile = require("../middlewares/fileSize");
import { Response } from "express";

const fileSizeError = (err, res: Response) => {
  if (err) {
    return res.status(413).send({ message: "El archivo es demasiado grande" });
  } else {
    return res.status(201).send({ message: "Archivo subido correctamente" });
  }
};

export { fileSizeError };
