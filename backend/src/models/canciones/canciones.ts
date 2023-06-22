import { Schema, model } from "mongoose";

export interface IModeloCancion {
    name: string;
    key?: string;
    letra?: string;
    genero: string;
    autor?: string;
    instrumentos: string;
  }

const cancionSchema = new Schema<IModeloCancion>(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    key: { type: String, minlength:1, maxlength: 10 },
    letra: { type: String },
    genero: { type: String, required: true },
    autor: { type: String},
    instrumentos: { type: String}
  }
)

export const ModeloCancion = model<IModeloCancion>(
  "ModeloCancion",
  cancionSchema
)