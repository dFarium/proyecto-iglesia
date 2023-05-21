import { Schema, model } from "mongoose";

export interface IItemInventario {
  nombre: string; // <=
  categoria?: string; // <=

  cantidad?: number; // cantidad actual
  estado?: string; // estado actual

  fechaSalida?: Date; // fecha de salida - vencimiento
  desc?: string; // descripcion - comentarios

  prestable?: boolean; // si es prestable o no (cuestionable)
  ultMant?: Date; // ultima mantencion (fecha)

  cicloMant?: number; // ciclo de mantencion (problemamente en segundos)
  uploader?: string; // quien subió el item (nombre por ahora quizs id despues)

  ultMod?: string; // ultimo en modificar
  // urlPic?: string; // url de imagen adjunta (no se aun como se hace)
}

const ItemSchema = new Schema<IItemInventario>(
  {
    nombre: { type: String, required: true, minlength: 1, maxlength: 50 },
    categoria: {
      type: String,
      enum: ["Instrumento", "Equipo", "Varios"],
      default: "Varios",
    },
    cantidad: {
      type: Number,
      default: 1,
    },
    estado: {
      type: String,
      enum: ["Activo", "Inactivo", "Prestado"],
      default: "Activo",
    },
    fechaSalida: { type: Date },
    desc: { type: String, maxlength: 200 },
    prestable: { type: Boolean },
    ultMant: { type: Date },
    cicloMant: { type: Number },
    uploader: { type: String },
    ultMod: { type: String },
  },
  { timestamps: true, collection: "inventario" }
);

export const ItemInventario = model<IItemInventario>(
  "ItemInventario",
  ItemSchema
);
