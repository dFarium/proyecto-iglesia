import { Schema, model } from "mongoose";

export interface IArchivos {
  fileName: string;
  tagCategoria: string;
  mimetype: string;
  url: string;
  userSubida: string; //cambio
  userModifica?: Schema.Types.ObjectId;
  publico: boolean;
  createdAt?: Date;
}

const ArchivoSchema = new Schema<IArchivos>(
  {
    fileName: { type: String, required: false }, //cambio
    tagCategoria: { type: String, required: false }, //cambio
    mimetype: { type: String, required: false }, //cambio
    url: { type: String, required: false }, //cambio
    userSubida: { type: String, default: "" }, //cambio
    userModifica: { type: Schema.Types.ObjectId, default: null },
    publico: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Archivos = model<IArchivos>("Archivos", ArchivoSchema);
