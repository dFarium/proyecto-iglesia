import { Schema, model } from "mongoose";

export interface ItemTesoreria {
    nombre: string;
    valorCaja: number;
    fechaGasto?: Date;
    descripcion: string;
    tipo: string;
    boleta: string;
}

const dineroSchema = new Schema<ItemTesoreria>(
    {
        nombre: { type: String, required: true, minlength: 1, maxlength: 50 },
        valorCaja: { type: Number, required: true },
        fechaGasto: { type: Date },
        descripcion: { type: String, maxlength: 250 },
        tipo: {
            type: String,
            enum: ["Ingreso", "Gasto"],
        },

        boleta: { type: String, minlength: 1, maxlength: 50 },
    },
    { timestamps: true, collection: "tesoreria" }
);

export const ItemTesoreria2 = model<ItemTesoreria>(
    "ItemTesoreria",
    dineroSchema
);
