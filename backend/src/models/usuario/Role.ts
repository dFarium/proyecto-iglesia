import { Schema, model } from "mongoose";

const roleSchema = new Schema(
    {name: String,},
    {versionKey: false,} // Para no mostrar el id
)

export default model("Role", roleSchema);