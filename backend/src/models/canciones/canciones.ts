import { Schema, model } from "mongoose";

export interface IModeloCancion {
    nombre: string;
    key?: string;
    letra?: string;
    genero?: string;
    autor?: string;
    instrumentos?: string;
    id_song?: string;
  }

const cancionSchema = new Schema<IModeloCancion>(
  {
    nombre: { type: String, required: true, minlength: 1, maxlength: 50 },
    key: { type: String },
    letra: { type: String },
    genero: { type: String, },
    autor: { type: String},
    instrumentos: { type: String},
    id_song: {type: String},
  }
)

export const ModeloCancion = model<IModeloCancion>(
  "ModeloCancion",
  cancionSchema
)