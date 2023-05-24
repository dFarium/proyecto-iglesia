import { Schema, model } from "mongoose";

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
    instrumento: { type: Schema.Types.ObjectId, required: true },
    prestatario: { type: Schema.Types.ObjectId, required: true },
    prestamista: { type: Schema.Types.ObjectId, required: true },
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