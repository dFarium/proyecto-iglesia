import multer from "multer";
import * as fs from "fs";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    console.log("CL en multer destination",req.params.folderName);
    const route = "./upload/" + req.params.folderName;
    if (!fs.existsSync(route)) {
      fs.mkdirSync(route, { recursive: true });
    }
    cb(null, route);
  },

  filename: function (req: Request, file, cb) {
    // const nameFile = req.params.name;
    // cb(null, nameFile);
    
    cb(null, Date.now() + file.originalname)
  },
});

const filter = (req, file, cb) => {


  const allowedTypes = [
    "image/jpg", "image/jpeg", "image/png"
  ]
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  }
  else {
    cb(null, true)
    //cb(new Error("Invalid file type"))
  }

}

const upload = multer({
  storage: storage,
  fileFilter: filter,
  limits: {
    fileSize: 1024 * 1024 * 10
  }
})



export { upload };
