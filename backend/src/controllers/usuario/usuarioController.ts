import { UsuarioModel} from "../../models/usuario/usuarioModel";
import { Request, Response} from "express";
// Instalar npm i @hapi/joi ---> Para validación de usuario
// Instalar npm i bcrypt ---> Para encriptar la contraseña
// instalar npm i jsonwebtoken ---> Para creación del token de inicio de sesión

const {schemaRegister, schemaLogin} = require('../../models/usuario/usuarioModel');

const bcrypt = require('bcrypt'); // Constante usada para encriptar y comparar constraseña
const jwt = require('jsonwebtoken'); // Constante usada para crear el token

// Registro de usuario
const registerUser = async (req: Request, res: Response) => {

    // Validación de usuario
    const { error } = schemaRegister.validate(req.body);
    if (error){
        return res.status(400).json({error: error.details[0].message})
    }
    console.log("AQUI")
    // Validación de email único
    const isEmailExist = await UsuarioModel.findOne({ email: req.body.email })
    if (isEmailExist) return res.status(400).json({error: true, message: 'Email ya registrado'})

    // Encriptación de clave
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Registro usuario
    const newUser = new UsuarioModel({
        name: req.body.name,
        rut: req.body.rut,
        email: req.body.email,
        password: password
    })
    try {
        const userDB = await newUser.save();
        res.json({ error: null, data: userDB})
    } catch (error) {
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

// Iniciar sesión
const loginUser = async (req: Request, res: Response) => {

    // Validación
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    // Busqueda del usuario
    const user = await UsuarioModel.findOne({ email: req.body.email })
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })

    // Válida la contraseña
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    // Creación de token
    const token = jwt.sign({name: user.name, id: user._id}, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({error: null, message: 'Bienvenido!', data: {token}})
    
}

// Cerrar sesión
const logoutUser = async (req: Request, res: Response) => {
    res.clearCookie("token");
    return res.json({ message: 'Cierre de sesión exitoso' });
}

// Obtener usuario
const getUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const user = await UsuarioModel.findById(id);
        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }
        return res.status(200).send(user);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send({ message: "Error al obtener el usuario" });
    }
}

// Obtener usuarios
const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await UsuarioModel.find({});
        if (!users) {
            return res.status(404).send({ message: "Usuarios no encontrados" });
        }
        return res.json(users);
    } catch (err: any) {
        console.log(err);
        return res.status(500).send({ message: "Error al obtener los usuarios" });
    }
}

// Actualizar usuario
const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    let updates = req.body;

    try {
        const user = await UsuarioModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        // Si se incluye 'password' en la actualización, no se actualiza la contraseña, todo lo demás sí.
        if (updates.password) {
            delete updates.password;
        }
        await UsuarioModel.updateOne({ _id: id }, updates);
        const updatedUser = await UsuarioModel.findById(id);
        res.status(200).json(updatedUser);

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
}

// Borrar usuario
const deleteUser = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
        const user = await UsuarioModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await UsuarioModel.deleteOne({ _id: id });
        res.status(200).json({ message: "Usuario eliminado con éxito" });

    } catch (err: any) {
        console.log(err);
        res.status(500).json({ message: "Error al eliminar el usuario" });
    }
}

export {
    getUser,
    getUsers,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
    logoutUser,
};