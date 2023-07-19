import { Router } from "express";
import { sendMail } from "../../controllers/correoPrestamo/mailController";


export const mailRoutes = Router();
//post
mailRoutes.post("/mail",sendMail);