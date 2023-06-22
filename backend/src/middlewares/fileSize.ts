const maxSizeFile = require('../middlewares/fileSize')

const fileSizeError = (err, req, res, next)=> {
    if(err){
        return res.status(413).send({message: "El archivo es demasiado grande"})
    } else {
        next()
    }
}

export { fileSizeError }