import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import {createRoles} from "./libs/initialSetup"

dotenv.config();
const app: Express = express();
const port: string = process.env.PORT;
createRoles();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.options("*", cors());

//routes
import { inventarioRoutes } from "./routes/inventario/inventarioRoutes";
import { tesoreriaRoutes } from "./routes/tesoreria/tesoreriaRoutes";
import { usuarioRoutes } from "./routes/usuario/usuarioRoutes";

app.use("/api", inventarioRoutes);
app.use("/api", tesoreriaRoutes);
app.use("/api", usuarioRoutes);

import { prestamoRoutes } from "./routes/prestamo/prestamoRoutes";
import { archivosRoutes } from "./routes/archivos/archivosRoutes";

app.use("/api", inventarioRoutes);
app.use("/api", prestamoRoutes);
app.use("/api", archivosRoutes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

const options: mongoose.ConnectOptions = {
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  family: 4,
  maxPoolSize: 20,
};

async function run() {
  mongoose.connect(process.env.DB, options);
  console.log("Conectado a la base de datos");
}

run().catch((err) => console.log(err));
