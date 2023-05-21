import { Schema, model } from "mongoose";

export interface IArchivos {
    fileName: string;
    tagCategoria: string;
    mimetype: string;
    url: string;
    userSubida: Schema.Types.ObjectId;
    userModifica?: Schema.Types.ObjectId;
    publico: boolean;
    fechaSubida: Date;
}

const ArchivoSchema = new Schema<IArchivos>(
    {
        fileName: { type: String, required: true  },
        tagCategoria: { type: String, required: true },
        mimetype:{ type: String, required: true },
        url: { type: String, required: true },
        userSubida: { type: Schema.Types.ObjectId, required: true },
        userModifica: { type: Schema.Types.ObjectId},
        publico: { type: Boolean, default: false },
        fechaSubida:  { type: Date, default: Date.now }

    },
    { timestamps: true }
);

export const Archivos = model<IArchivos>(
    "Archivos",
    ArchivoSchema
);