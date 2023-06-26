import { Schema, model } from "mongoose";
import Joi from '@hapi/joi';

export interface IUsuarioModel {
    name: string;
    rut: string,
    email: string;
    password: string;
    rol: Schema.Types.ObjectId[],
    telefono: string,
    direccion: string,
    fecha_nacimiento: Date,
    num_emergencia: string,
    estado: Schema.Types.ObjectId,
    canciones: string,
    archivos: Schema.Types.ObjectId,
    RRSS: string,
    foto: string
}

// Schema de usuario
const UserSchema = new Schema<IUsuarioModel>({
    name: { type: String, required: true, minlength: 5, maxlength: 255 },
    rut:{ type: String, required: true, minlength: 9, maxlength: 12},
    email: { type: String, required: true, unique: true, minlength: 6, maxlength: 255 },
    password: { type: String, required: true, minlength: 4, maxlength: 1024 },
    rol: [{ref: 'Role', type: Schema.Types.ObjectId}],
    telefono: {type: String, default: null},
    direccion: {type: String, require: true, default: null},
    fecha_nacimiento: {type: Date, require: true, default: null},
    num_emergencia: {type: String, default: null},
    estado: { type: Schema.Types.ObjectId, ref: 'ItemInventario', default: null},
    canciones: {},
    archivos: { type:Schema.Types.ObjectId, ref: 'Archivos', default: null},
    RRSS: {type: String , default: null},
    foto: {type: String , default: null}
},
{ timestamps: true }
);

// Schema de registro
export const schemaRegister = Joi.object({
    name: Joi.string().min(4).max(255).required(),
    rut: Joi.string().min(9).max(12).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required(),
    rol: Joi.array().items(Joi.string()),
    telefono: Joi.string(),
    direccion: Joi.string(),
    fecha_nacimiento: Joi.date(),
    num_emergencia: Joi.string(),
    estado: Joi.string(),
    canciones: Joi.string(),
    archivos: Joi.string(),
    RRSS: Joi.string(),
    foto: Joi.string()
});

// Schema de login
export const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required()
})

export const UsuarioModel = model<IUsuarioModel>(
    "UsuarioModel",
    UserSchema
);