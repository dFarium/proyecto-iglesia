import Role from '../models/usuario/Role'
const bcrypt = require('bcrypt');
import { UsuarioModel } from '../models/usuario/usuarioModel';

export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount()

        if (count > 0) return;
        const values = await Promise.all([
            new Role({name: 'miembro'}).save(),
            new Role({name: 'admin'}).save(),
            new Role({name: 'directiva'}).save()
        ]);
        console.log(values);
    } catch (error) {
        console.error(error);
    }
}

export const createAdminUserIfNotExist = async () => {
    const userFound = await UsuarioModel.findOne({ email: "admin@gmail.com" });
    // Si no existe el usuario, lo creamos
    if (!userFound) {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash("admin", salt);
        const adminRole = await Role.findOne({name: "admin"});
        const newUser = new UsuarioModel({
            name: 'Admin User',
            rut: '11.111.111-1',
            email: 'admin@gmail.com',
            password: password,
            rol: [adminRole._id]
        });
        try {
            const savedUser = await newUser.save();
            console.log('Usuario admin creado:', savedUser);
        } catch (error) {
            console.log('No se puede crear el usuario admin: ', error);
        }
    }
}