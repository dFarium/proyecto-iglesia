import { Schema, model } from "mongoose";
import {UsuarioModel} from "../usuario/usuarioModel";
import {ItemInventario} from "../inventario/item";

export interface IPrestamoInstrumento {
  instrumento: Schema.Types.ObjectId; 
  prestatario: Schema.Types.ObjectId;
  prestamista: Schema.Types.ObjectId;
  devuelto: boolean;
  fechaInicio: Date;
  fechaLimite: Date;
  fechaDevolucion?: Date;
  comentario?: string;
}

const PrestamoSchema = new Schema<IPrestamoInstrumento>(
  {
    instrumento: { type: Schema.Types.ObjectId, required: true, ref: ItemInventario},
    prestatario: { type: Schema.Types.ObjectId, required: true, ref: UsuarioModel },
    prestamista: { type: Schema.Types.ObjectId, required: true, ref: UsuarioModel},
    devuelto: { type: Boolean, default: false },
    fechaInicio: { type: Date, required: true },
    fechaLimite: { type: Date, required: true },
    fechaDevolucion: { type: Date },
    comentario:  {type: String, maxlength:500 }
  },
  { timestamps: true }
);

export const PrestamoInstrumento = model<IPrestamoInstrumento>(
  "PrestamoInstrumento",
  PrestamoSchema
);