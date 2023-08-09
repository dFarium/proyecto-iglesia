import { Schema, model } from "mongoose";

export interface IArchivos {
  originalName:string;
  fileName: string;
  userName: string;
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
    originalName: { type: String, required: false }, //cambio
    fileName: { type: String, required: false }, //cambio
    userName: { type: String, required: false}, //cambio
    tagCategoria: { type: String, required: false }, //cambio
    mimetype: { type: String, required: false }, //cambio
    url: { type: String, required: false }, //cambio
    userSubida: { type: String, default: "" }, //cambio
    userModifica: { type: String, default: "" },
    publico: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Archivos = model<IArchivos>("Archivos", ArchivoSchema);
