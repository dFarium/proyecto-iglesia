import express, { Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app: Express = express();
const port: string = process.env.PORT;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.options("*", cors());

//routes
import { inventarioRoutes } from "./routes/inventario/inventarioRoutes";
import { usuarioRoutes } from "./routes/usuario/usuarioRoutes";
const validaToken = require('./controllers/usuario/validate-token')
const admin = require('./controllers/usuario/admin')


app.use("/api", inventarioRoutes);
app.use("/api", usuarioRoutes);
app.use("/api/admin", validaToken, admin);

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
