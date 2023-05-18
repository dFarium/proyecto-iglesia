import { Schema, model } from "mongoose";

export interface IItemInventario {
  name: string;
  categoria?: string;
  cantidad: number;
  state: string;
  outDate?: Date;
  desc?: string;
}

const ItemSchema = new Schema<IItemInventario>(
  {
    name: { type: String, required: true, minlength: 1, maxlength: 50 },
    categoria: { type: String, maxlength: 50 },
    cantidad: { type: Number, required: true },
    state: { type: String, required: true },
    outDate: { type: Date },
    desc: { type: String, maxlength: 200 },
  },
  { timestamps: true }
);

export const ItemInventario = model<IItemInventario>(
  "ItemInventario",
  ItemSchema
);
