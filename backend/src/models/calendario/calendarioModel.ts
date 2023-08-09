import { Schema, model } from "mongoose";

export interface ItemCalendario {
    nombreAct: string;
    fechaInicio?: Date;
    fechaTermino?: Date;

    estadoActividad?: "Activo" | "Inactivo";

    descripcion: string;
}

const calendarioSchema = new Schema<ItemCalendario>(
    {
        nombreAct: { type: String, required: true, minlength: 1, maxlength: 50 },
        fechaInicio: { type: Date },
        fechaTermino: { type: Date },

        estadoActividad: { type: String, enum: ["Activo", "Inactivo"] },

        descripcion: { type: String, maxlength: 250 },
    },
    { timestamps: true, collection: "calendario" }
);

export const ItemCalendario2 = model<ItemCalendario>(
    "ItemCalendario",
    calendarioSchema
);

