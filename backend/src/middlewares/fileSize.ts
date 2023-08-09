const maxSizeFile = require("../middlewares/fileSize");
import { Response } from "express";

const fileSizeError = (err, req, res: Response, next) => {
  if (err) {

    return res.status(413).send({ message: "El archivo es muy grande" });
  } else {
    next()
  }
};

export { fileSizeError };
