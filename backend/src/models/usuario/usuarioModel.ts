import { Schema, model } from "mongoose";
import Joi from '@hapi/joi';

export interface IUsuarioModel {
    name: string;
    email: string;
    password: string;
}

// Schema de usuario
const UserSchema = new Schema<IUsuarioModel>({
    name: { type: String, required: true, minlength: 6, maxlength: 255 },
    email: { type: String, required: true, unique: true, minlength: 6, maxlength: 255 },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 }
},
{ timestamps: true }
);

// Schema de registro
export const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

// Schema de login
export const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
})

export const UsuarioModel = model<IUsuarioModel>(
    "UsuarioModel",
    UserSchema
);