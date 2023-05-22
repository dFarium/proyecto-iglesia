const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({

    destination: function(req,file, cb){
        console.log("entra destination ");
        const route = './upload/' + req.params.archivo
        if(!fs.existsSync(route)){
            fs.mkdirSync(route, {recursive: true})
        }
        cb(null, route)
    },

    filename: function (req, file, cb) {
        console.log("entra filename");
        let fecha = new Date();
        let tipo
        if(file.mimetype == 'application/pdf'){
            tipo=".pdf"
        }else{
            if(file.mimetype == 'application/msword'){
                tipo=".doc"
            }else{
                if(file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
                    tipo=".docx"
                }
            }
        }

        let indice = file.originalname.indexOf(tipo)
        let nombre = file.originalname.substring(0, indice);
        let fechaArchivo = fecha.getFullYear() + '_' + (fecha.getMonth() + 1) + '_' + fecha.getDate() + '_' + fecha.getHours() + '_' + fecha.getMinutes() + '_' + fecha.getSeconds()
        const nameFile = nombre + ' '  + fechaArchivo + tipo
        cb(null, nameFile)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: (req,file,cb) => {
        if(file.mimetype == 'application/pdf' || file.mimetype == 'application/msword' || file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
            //console.log("El archivo es .doc, .docx o .pdf")
            req.params.fileValido = true
        } else {
            //console.log("El archivo tiene otra extension")
            req.params.fileValido = true
        }
        console.log("entra fileFilter"),
        cb(null, req.params.fileValido)
    },
    limits:{
        fileSize: 1024 * 1024 * 15
    }
})

export {upload}